import { useState } from "react"
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

const img = "https://icodrops.com/wp-content/uploads/2021/06/dopex_logo.png"
const CampaignDetails = () => {
    const router = useRouter()
    const state = useSelector((state: any) => state)
    const { campaign } = state.campaignsReducer
    const [isRequesting, setIsRequesting] = useState<boolean>(false)
    const [twitterURL, setTwitterURL] = useState<string>("")

    const handleSendingTwitterURL = () => {
        // the following are just place holders
        try {
            setIsRequesting(true)
        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => {
                setIsRequesting(false)
            }, 2000)
        }
    }
    // console.log(campaign?.campaign)
    return (
        <MainLayout>
            <section className="bg-gray-800 flex flex-col flex-grow mt-14 pt-14 w-full">
                <h4
                    className={`${space_grotesk_semibold.className} ml-10 text-3xl text-shillStreetBlue mt-3`}
                >
                    Campaign overview
                </h4>
                <div className="bg-twitterBackGround  rounded-2xl h-full m-10">
                    <div className="flex items-center space-x-6  pt-3 pb-4">
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
                            <h4
                                className={`${space_grotesk_semibold.className} text-3xl text-white mt-3`}
                            >
                                {campaign?.title}
                            </h4>
                        </div>
                    </div>

                    <div className="h-auto mt-5 ml-14">
                        <div className="mt-5 h-auto space-x-3 flex justify-center flex-col items-center md:items-center md:space-x-3 md:flex-row md:justify-center  ">
                            {/* left */}
                            <div className="w-2/3 mb-20  text-white space-y-3  border rounded-2xl ">
                                {/* section 1 */}
                                <div>
                                    <h3
                                        className={`${space_grotesk_semibold.className}font-semibold text-2xl p-3 border-b`}
                                    >
                                        About {campaign?.title} campaign
                                    </h3>
                                    <div className="p-7">
                                        <h3
                                            className={`${space_grotesk_semibold.className} text-twitterBlue font-semibold text-lg`}
                                        >
                                            Campaign Information
                                        </h3>
                                        <div
                                            className={`${space_grotesk_semibold.className} text-sm flex`}
                                        >
                                            <p className="w-67">Total value locked (TVL)</p>
                                            <p className="flex justify-start">
                                                {campaign?.vaultSize}
                                            </p>
                                        </div>
                                        <div
                                            className={`${space_grotesk_semibold.className} text-sm flex`}
                                        >
                                            <p className="w-67">Campaign current balance</p>
                                            <p className="flex justify-start">
                                                {campaign?.currentBalance}
                                            </p>
                                        </div>
                                        <div
                                            className={`${space_grotesk_semibold.className} text-sm flex`}
                                        ></div>
                                        <div className="mb-10 ">
                                            <div
                                                className={`${space_grotesk_light.className}text-xs flex justify-between`}
                                            >
                                                <p>Funds Utilized</p>
                                                <p>{campaign?.utilization}%</p>
                                            </div>
                                            <ProgressBar value={campaign?.utilization} />
                                        </div>

                                        {/* section 2 */}
                                        <div>
                                            <h3
                                                className={`${space_grotesk_semibold.className} text-twitterBlue font-semibold text-lg`}
                                            >
                                                {campaign?.title} Overview
                                            </h3>
                                            <p className={`${space_grotesk_regular.className}`}>
                                                {campaign?.overview}
                                            </p>
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
                                                className={`${space_grotesk_semibold.className} text-lg font-semibold text-twitterBlue`}
                                            >
                                                Thread Instructions
                                            </h3>
                                            {campaign?.threadDetails &&
                                                campaign?.threadDetails.map(
                                                    (detail: any, index: any) => (
                                                        <p
                                                            key={index}
                                                            className={`${space_grotesk_regular.className}`}
                                                        >
                                                            {detail}
                                                        </p>
                                                    )
                                                )}
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
                                    <h4
                                        className={`${space_grotesk_semibold.className} font-semibold`}
                                    >
                                        Sepolia campaign address
                                    </h4>
                                    <p
                                        className={`${space_grotesk_light.className} text-xs flex items-center space-x-2`}
                                    >
                                        <h4 className="text-xs">{campaign?.address}</h4>
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
                                        payment after 24hrs. (For hackaton testing, the
                                        verification time its at 2minutes)
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
                </div>
            </section>
        </MainLayout>
    )
}

export default CampaignDetails
