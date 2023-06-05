import { useRouter } from "next/router"
import { MainLayout, ProgressBar, Spinner } from "../../components"
import {
    space_grotesk_light,
    space_grotesk_medium,
    space_grotesk_regular,
    space_grotesk_semibold,
} from "../../utils/customFont"
import { useSelector, useDispatch } from "react-redux"
import { useContractRead, useAccount, useContractWrite, usePrepareContractWrite } from "wagmi"
import { useState, useEffect } from "react"
import { TwitterIdRequest } from "../../utils/apiRequests"
import { SubmitHandler } from "react-hook-form"
import { TwitterIdType } from "../../utils/types"
import { Alert, AlertType } from "../../components/"

import Image from "next/image"
import Link from "next/link"
import campapaignsContract from "../../constants/CAMPAIGN_ABI.json"

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
    const [campaignData, setCampaignData] = useState<any>(campaign)

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
        console.log(campaign)
        if (forecastedCampaignBalance) {
            setForecastedCampaignBalanceInString(
                parseInt(forecastedCampaignBalance.toString()) / 10 ** 18
            )
        }
        if (participationIDcount) {
            setparticipationIDcountInString(participationIDcount.toString())
        }
    }, [forecastedCampaignBalance, participationIDcount])

    useEffect(() => {
        const campaignData = {
            forecastedCampaignBalanceInString: forecastedCampaignBalanceInString,
            participationIDcount: participationIDcountInString,
            instruction: "blallalalla",
            title: "Chain Link",
        }

        if (typeof window !== "undefined") {
            localStorage.setItem("campaignData", JSON.stringify(campaignData))
        }
    }, [forecastedCampaignBalanceInString, participationIDcountInString])

    return (
        <MainLayout>
            <section className="bg-gray-800 flex flex-col flex-grow mt-14 pt-14 w-full">
                <h2
                    className={`${space_grotesk_semibold.className} ml-10 text-3xl text-shillStreetBlue mt-3`}
                >
                    Campaign overview
                </h2>
                <section className="bg-twitterBackGround  rounded-2xl h-full m-10">
                    <div className="flex items-center space-x-6  pt-3 pb-4">
                        {/* back arrow */}
                        <div
                            onClick={() => router.back()}
                            className="bg-shillStreetGrey ml-6 w-6 h-6 flex justify-center items-center rounded-md cursor-pointer hover:bg-gray-600"
                        >
                            <Image
                                src="/images/chevron-left.svg"
                                alt="chevron-left"
                                width={18}
                                height={18}
                                unoptimized={true}
                            />
                        </div>
                        {/* image and title container */}
                        <div className="flex justify-center items-center">
                            <div className="w-20 h-20 rounded-full mr-5 mt-3">
                                <Image
                                    src={campaign?.campaign}
                                    alt=""
                                    width={110}
                                    height={110}
                                    unoptimized={true}
                                    className="rounded-full"
                                />
                            </div>
                            <h3
                                className={`${space_grotesk_semibold.className} text-3xl text-white mt-3`}
                            >
                                {campaignData?.title}
                            </h3>
                        </div>
                    </div>

                    <div className="h-auto mt-5 ml-14">
                        <div className="mt-5 h-auto justify-center space-x-3 flex flex-col items-center md:items-center md:space-x-3 md:flex-row md:justify-center  ">
                            {/* left */}
                            <div className="w-2/3 mb-20  text-white space-y-3  border rounded-2xl ">
                                {/* section 1 */}
                                <div>
                                    <p
                                        className={`${space_grotesk_semibold.className}font-semibold text-2xl p-3 border-b`}
                                    >
                                        About {campaignData?.title} campaign
                                    </p>
                                    <div className="p-7">
                                        <p
                                            className={`${space_grotesk_semibold.className} text-twitterBlue font-semibold text-lg`}
                                        >
                                            Campaign Information
                                        </p>

                                        {campaignData?.participationIDcount && (
                                            <div
                                                className={`${space_grotesk_semibold.className} text-sm flex justify-between`}
                                            >
                                                <p>Participants joined</p>

                                                <p>{`${campaignData?.participationIDcount} user`}</p>
                                            </div>
                                        )}

                                        {campaignData?.vaultSize && (
                                            <div
                                                className={`${space_grotesk_semibold.className} text-sm flex`}
                                            >
                                                <p>Total value locked (TVL)</p>
                                                <p className="flex justify-start">
                                                    {campaignData?.vaultSize}
                                                </p>
                                            </div>
                                        )}
                                        {campaignData?.forecastedCampaignBalanceInString && (
                                            <div
                                                className={`${space_grotesk_semibold.className} text-sm flex justify-between`}
                                            >
                                                <p>Campaign current balance</p>
                                                <p>
                                                    {`${campaignData?.forecastedCampaignBalanceInString} USDC`}
                                                </p>
                                            </div>
                                        )}
                                        {campaignData?.forecastedCampaignBalanceInString && (
                                            <div className="mb-10 ">
                                                <div
                                                    className={`${space_grotesk_light.className}text-xs flex justify-between`}
                                                >
                                                    <p>Funds Remaining</p>

                                                    <p>
                                                        {(
                                                            campaignData?.forecastedCampaignBalanceInString /
                                                            300
                                                        ).toFixed(3)}
                                                        %
                                                    </p>
                                                </div>
                                                <ProgressBar
                                                    value={forecastedCampaignBalanceInString / 300}
                                                />
                                            </div>
                                        )}

                                        {/* section 2 */}
                                        <div>
                                            {campaignData?.title && (
                                                <p
                                                    className={`${space_grotesk_semibold.className} text-twitterBlue font-semibold text-lg`}
                                                >
                                                    {`${campaignData?.title} Overview`}
                                                </p>
                                            )}
                                            {campaignData?.overview && (
                                                <p
                                                    className={`${space_grotesk_regular.className}`}
                                                >
                                                    {campaignData?.overview}
                                                </p>
                                            )}
                                            <div
                                                className={`${space_grotesk_semibold.className} text-sm flex justify-between`}
                                            >
                                                <p>
                                                    View the Chainlink CCIP documentation to learn
                                                    more
                                                </p>
                                                <Link
                                                    href="https://blog.chain.link/cross-chain-bridge/?_ga=2.251032590.903498201.1685827149-1065892986.1683128058&_gac=1.83568100.1684330817.CjwKCAjw9pGjBhB-EiwAa5jl3MkSG4fj59oTB_RHYn9gd_kH2juOFOPB8pacXKAj-YqEuNbJcxYItBoCvWQQAvD_BwE"
                                                    className="bg-purple-600 w-5 h-5 flex justify-center items-center rounded-md cursor-pointer hover:bg-gray-600"
                                                    target="_blank"
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
                                            <p
                                                className={`${space_grotesk_semibold.className} text-lg font-semibold text-twitterBlue`}
                                            >
                                                Thread Instructions
                                            </p>
                                            <div>
                                                {campaignData?.threadDetails &&
                                                    campaignData?.threadDetails.map(
                                                        (detail: any, index: any) => (
                                                            <p
                                                                key={index}
                                                                className={`${space_grotesk_regular.className}`}
                                                            >
                                                                {detail}
                                                            </p>
                                                        )
                                                    )}
                                            </div>
                                            <div
                                                className={`${space_grotesk_semibold.className} text-sm flex justify-between`}
                                            >
                                                <p>View Sample Thread</p>
                                                <Link
                                                    href="/images/Sample_Tweet.png"
                                                    download
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
                                    </div>
                                </div>
                            </div>
                            {/* right */}
                            <div className="bg-twitterBlue ml-4 w-1/2 md:w-1/4 h-2/3 text-twitterBackGround p-4 mb-5 rounded-2xl space-y-8">
                                <div>
                                    <p
                                        className={`${space_grotesk_semibold.className} font-semibold`}
                                    >
                                        Sepolia campaign address
                                    </p>
                                    <p
                                        className={`${space_grotesk_light.className} text-xs flex items-center space-x-2`}
                                    >
                                        {campaignData?.address}
                                    </p>
                                </div>
                                <div>
                                    <p
                                        className={`${space_grotesk_semibold.className} font-semibold`}
                                    >
                                        Thread and Earn
                                    </p>
                                    <p className={`${space_grotesk_light.className} text-xs`}>
                                        Tweet a thread covering the required criteria and tell us
                                        where to find the thread, we will send your calculated
                                        payment after 24hrs. (For hackaton testing, the
                                        verification time its at 2minutes)
                                    </p>
                                </div>
                                <div>
                                    <p
                                        className={`${space_grotesk_semibold.className} font-semibold`}
                                    >
                                        Twitter URL
                                    </p>
                                    <input
                                        className="bg-gray-200  h-8 w-full rounded-xl text-shillStreetGrey px-4"
                                        onChange={(e: any) => setTwitterURL(e.target.value)}
                                    />
                                    <div className="flex justify-end">
                                        <button
                                            className={`${space_grotesk_medium.className} flex items-center justify-center text-xs bg-twitterBackGround p-2 rounded-md w-24 h-9 shadow-md hover:bg-blue-600 text-white mt-2`}
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
                </section>
            </section>
        </MainLayout>
    )
}

export default CampaignDetails
