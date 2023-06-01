import { useRouter } from "next/router"
import Image from "next/image"
import Link from "next/link"
import { MainLayout, ProgressBar, Spinner } from "../../components"
import {
    space_grotesk_light,
    space_grotesk_medium,
    space_grotesk_regular,
    space_grotesk_semibold,
} from "../../utils/customFont"
import { useSelector } from "react-redux"
import { useContractRead, useAccount, useContractWrite, usePrepareContractWrite } from "wagmi"
import campapaignsContract from "../../constants/CAMPAIGN_ABI.json"
import { useState, useEffect, useMemo } from "react"
import { AuthRequest, TwitterIdRequest } from "../../utils/apiRequests"
import Cookies from "js-cookie"
import tweetValueContract from "../../constants/TWEET_VALUE.json"
import { SubmitHandler } from "react-hook-form"
import { TwitterIdType } from "../../utils/types"
import { Alert, AlertType } from "../../components/"

const img = "https://icodrops.com/wp-content/uploads/2021/06/dopex_logo.png"
const CampaignDetails = () => {
    const router = useRouter()
    const state = useSelector((state: any) => state)
    const { campaign } = state.campaignsReducer
    const { isConnected, address } = useAccount()
    const [isRequesting, setIsRequesting] = useState<boolean>(false)
    const [twitterURL, setTwitterURL] = useState<string>("")
    const [tweetId, setTweetId] = useState<string>("")
    const [userTwitterId, setUserTwitterId] = useState<string>("0")
    const [participationIDcountInString, setparticipationIDcountInString] = useState<string>("")
    const [forecastedCampaignBalanceInString, setForecastedCampaignBalanceInString] =
        useState<number>(0)

    // contract write function
    const { config } = usePrepareContractWrite({
        address: "0xE3F45Fa54B4dBD43D02145ff69A854080Ae112bF",
        abi: campapaignsContract.abi,
        functionName: "postTweet",
        args: [userTwitterId, tweetId],
    })

    const { write: sendContractInteraction } = useContractWrite(config)

    // const read function
    const { data: forecastedCampaignBalance } = useContractRead({
        address: "0xE3F45Fa54B4dBD43D02145ff69A854080Ae112bF",
        abi: campapaignsContract.abi,
        functionName: "forecastedCampaignBalance",
        chainId: 11155111,
        watch: true,
    })

    const { data: participationIDcount } = useContractRead({
        address: "0xE3F45Fa54B4dBD43D02145ff69A854080Ae112bF",
        abi: campapaignsContract.abi,
        functionName: "participationIDcount",
        chainId: 11155111,
        watch: true,
    })
    const getTwitterId: SubmitHandler<TwitterIdType> = async (data) => {
        try {
            const response = await TwitterIdRequest.post("/users/get_twitter_id/", data)
            if (response) {
                console.log(response)
                if (response.message == "found") {
                    setUserTwitterId(response.twitter_user_id)
                }
            }
        } catch (error) {}
    }

    const setPostData = (address: string) => {
        if (address != "") {
            // prepare post data
            const postData: TwitterIdType = {
                walletAddress: address,
            }
            // invoke the submission with the data to post
            getTwitterId(postData)
        }
    }

    const handleSendingTwitterURL = async () => {
        // the following are just place holders
        try {
            setIsRequesting(true)
            if (sendContractInteraction && userTwitterId) {
                sendContractInteraction()
            } else {
                Alert(AlertType.error, "You need to log in!")
            }
        } catch (error) {
            // console.log(error)
        } finally {
            setTimeout(() => {
                setIsRequesting(false)
            }, 2000)
        }
    }

    useEffect(() => {
        if (address && isConnected) {
            setPostData(address)
        }
    }, [address])

    useEffect(() => {
        const splitURL = twitterURL.split("/")
        setTweetId(splitURL[splitURL.length - 1])
    }, [twitterURL])

    useEffect(() => {
        const splitURL = twitterURL.split("/")
        setTweetId(splitURL[splitURL.length - 1])
    }, [twitterURL])

    useEffect(() => {
        if (forecastedCampaignBalance) {
            setForecastedCampaignBalanceInString(
                parseInt(forecastedCampaignBalance.toString()) / 10 ** 18
            )
        }
        if (participationIDcount) {
            setparticipationIDcountInString(participationIDcount.toString())
        }
    }, [forecastedCampaignBalance, participationIDcount])

    return (
        <MainLayout>
            <section className="h-screen bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
                <div className="py-10 h-full px-48">
                    <div className="flex overflow-hidden items-center space-x-6">
                        <div
                            onClick={() => router.back()}
                            className="bg-shillStreetGrey w-6 h-6 flex justify-center items-center rounded-md cursor-pointer hover:bg-gray-600"
                        >
                            <Image
                                src="/images/chevron-left.svg"
                                alt="chevron-left"
                                width={18}
                                height={18}
                                unoptimized={true}
                            />
                        </div>
                        <div className="flex items-center">
                            <div className="w-20 h-20 rounded-full mr-5 mt-3">
                                <Image
                                    src={campaign?.campaign}
                                    alt="avatar"
                                    width={150}
                                    height={150}
                                    unoptimized={true}
                                    className="rounded-full"
                                />
                            </div>
                            <h4
                                className={`${space_grotesk_semibold.className} text-3xl text-white mt-3`}
                            >
                                {campaign?.title}
                            </h4>
                        </div>
                    </div>

                    <div className="h-auto mt-5 ml-20">
                        <div className="bg-shillStreetGrey w-full p-2 px-14 h-16 text-white">
                            <p className={`${space_grotesk_semibold.className} font-bold text-lg`}>
                                ${campaign?.vaultSize}
                            </p>
                            <p
                                className={`${space_grotesk_light.className}text-gray-200 text-xs -mt-3`}
                            >
                                Total Value Locked
                            </p>
                        </div>
                        <div className="mt-5 flex h-auto">
                            {/* left */}
                            <div className="w-2/3 mb-20 mx-20 text-white space-y-3">
                                {/* section 1 */}
                                <div>
                                    <h3
                                        className={`${space_grotesk_semibold.className} font-semibold text-2xl`}
                                    >
                                        About {campaign?.title}
                                    </h3>
                                    <div
                                        className={`${space_grotesk_semibold.className} text-sm flex`}
                                    >
                                        <p className="w-67">Campaign Size</p>
                                        <p className="flex justify-start">
                                            ${campaign?.vaultSize}
                                        </p>
                                    </div>
                                    <div
                                        className={`${space_grotesk_semibold.className} text-sm flex`}
                                    >
                                        <p className="w-1/2">Target Reach</p>
                                        <p className="w-1/2 flex justify-end">
                                            {campaign?.impressions} Impressions
                                        </p>
                                    </div>
                                    <div>
                                        {forecastedCampaignBalanceInString && (
                                            <div
                                                className={`${space_grotesk_light.className} text-xs flex justify-between`}
                                            >
                                                <p>Funds Left</p>
                                                <p>{forecastedCampaignBalanceInString} USDC</p>
                                            </div>
                                        )}
                                        {participationIDcountInString && (
                                            <div
                                                className={`${space_grotesk_light.className} text-xs flex justify-between`}
                                            >
                                                <p>Participants joined</p>
                                                <p>{participationIDcountInString} user</p>
                                            </div>
                                        )}
                                        <ProgressBar value={participationIDcountInString} />
                                        <span
                                            className={`${space_grotesk_light.className} flex justify-end text-xs`}
                                        >
                                            {/* {campaign?.threadEarnings}{" "} */}
                                            {/* 2.352.35 / 3.500 USDC */}
                                        </span>
                                    </div>
                                </div>

                                {/* section 2 */}
                                <div>
                                    <h3
                                        className={`${space_grotesk_semibold.className} font-semibold text-2xl`}
                                    >
                                        Thread Details
                                    </h3>
                                    <p className={`${space_grotesk_regular.className}`}>
                                        {campaign?.threadDetails}
                                    </p>
                                    <div
                                        className={`${space_grotesk_semibold.className} text-sm flex justify-between`}
                                    >
                                        <p>View the Dopex Docs to learn more</p>
                                        <Link
                                            href="#"
                                            className="bg-purple-600 w-5 h-5 flex justify-center items-center rounded-md cursor-pointer hover:bg-gray-600"
                                        >
                                            <Image
                                                src="/images/chevron-right.svg"
                                                alt="chevron-right"
                                                width={15}
                                                height={15}
                                                unoptimized={true}
                                            />
                                        </Link>
                                    </div>
                                    <div
                                        className={`${space_grotesk_semibold.className} text-sm flex justify-between`}
                                    >
                                        <p>View Samble Thread</p>
                                        <Link
                                            href="#"
                                            className="bg-purple-600 w-5 h-5 flex justify-center items-center rounded-md cursor-pointer hover:bg-gray-600"
                                        >
                                            <Image
                                                src="/images/chevron-right.svg"
                                                alt="chevron-right"
                                                width={15}
                                                height={15}
                                                unoptimized={true}
                                            />
                                        </Link>
                                    </div>
                                </div>

                                {/* section 3 */}
                                <div>
                                    <h3
                                        className={`${space_grotesk_semibold.className} font-semibold text-lg`}
                                    >
                                        {campaign?.title} Overview
                                    </h3>
                                    <p className={`${space_grotesk_regular.className}`}>
                                        {campaign?.overview}
                                    </p>
                                </div>

                                {/* section 4 */}
                                <div>
                                    <h3
                                        className={`${space_grotesk_semibold.className} font-semibold text-lg`}
                                    >
                                        Tokenomics
                                    </h3>
                                    <span className={`${space_grotesk_regular.className}`}>
                                        <p>{campaign?.tokenomics}</p>
                                    </span>
                                </div>

                                {/* section 7 */}
                                <div>
                                    <h3
                                        className={`${space_grotesk_semibold.className} font-semibold text-lg`}
                                    >
                                        {campaign?.title} Products
                                    </h3>
                                    <span className={`${space_grotesk_regular.className}`}>
                                        {campaign?.products}
                                    </span>
                                </div>
                            </div>
                            {/* right */}
                            <div className="bg-shillStreetGrey w-1/3 h-96 text-white p-4 space-y-8">
                                <div>
                                    <h4
                                        className={`${space_grotesk_semibold.className} font-semibold`}
                                    >
                                        Arbitrum
                                    </h4>
                                    <p
                                        className={`${space_grotesk_light.className} text-xs flex items-center space-x-2`}
                                    >
                                        <span>
                                            <Image
                                                src="/images/wallet-icon.svg"
                                                alt="wallet-icon"
                                                width={18}
                                                height={18}
                                                unoptimized={true}
                                            />
                                        </span>
                                        <span>
                                            {"0x0a884564B8708B1dEFa90E99B146B3a142EFf06".slice(
                                                0,
                                                30
                                            )}
                                            ...
                                        </span>
                                    </p>
                                </div>
                                <div>
                                    <h4
                                        className={`${space_grotesk_semibold.className} font-semibold`}
                                    >
                                        Thread and Earn
                                    </h4>
                                    <p className={`${space_grotesk_light.className} text-xs`}>
                                        Tweet a thread covering the required criteria and tell us
                                        where to find the thread, we will send your calculated
                                        payment after 24hrs.
                                    </p>
                                </div>
                                <div>
                                    <h4
                                        className={`${space_grotesk_semibold.className} font-semibold`}
                                    >
                                        Twitter URL
                                    </h4>
                                    <input
                                        className="bg-gray-200  h-8 w-full rounded-xl text-shillStreetGrey px-4"
                                        onChange={(e: any) => setTwitterURL(e.target.value)}
                                    />
                                    <div className="flex justify-end">
                                        <button
                                            className={`${space_grotesk_medium.className} flex items-center justify-center text-xs bg-blue-500 p-2 rounded-md w-24 h-9 shadow-md hover:bg-blue-600 text-white mt-2`}
                                            type="submit"
                                            onClick={() => handleSendingTwitterURL()}
                                        >
                                            {isRequesting ? (
                                                <Spinner width={20} height={20} />
                                            ) : (
                                                "Submit"
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    )
}

export default CampaignDetails
