import Image from "next/image"
import { MainLayout } from "../components"
import { OverviewCard } from "../components/cards"
import {
    space_grotesk_light,
    space_grotesk_medium,
    space_grotesk_semibold,
} from "../utils/customFont"

// sample data
const CardSampleData: any = [
    {
        index: 0,
        title: "Ranking",
        duration: "Past 30 Days",
        value: "17th",
    },
    { index: 1, title: "Threads", duration: "Past 30 Days", value: "12" },
    { index: 2, title: "Earnings", duration: "Past 30 Days", value: "$125" },
]

const TopCardTextContentSampleData: any = [
    {
        index: 0,
        title: "Revenue Earned (USDC)",
        value: "$250.00",
    },
    { index: 1, title: "Reach Generated", value: " 27,369" },
    { index: 2, title: "Average Thread Value", value: "$25.00" },
]

const TopCardTextContent = ({ index, title, value }: any) => (
    <div key={index} className="flex space-x-12 items-center">
        <div className="flex flex-col text-center">
            <span className={`${space_grotesk_light.className}`}>{title}</span>
            <div className="flex items-center space-x-3 justify-center">
                {/* only show the dollar sign for revenue earned title */}
                {title === "Revenue Earned (USDC)" && (
                    <span className="bg-shillStreetGrey">
                        <Image
                            src="/images/dollar-sign.svg"
                            alt="dollar-sign"
                            width={20}
                            height={20}
                            unoptimized={true}
                        />
                    </span>
                )}
                <span className={`${space_grotesk_semibold.className} my-3`}>{value}</span>
            </div>
        </div>
    </div>
)

const AccountOverview = () => {
    return (
        <MainLayout>
            <section className="bg-shillStreetBlue flex flex-col flex-grow px-52 pt-10 overflow-hidden">
                <h3
                    className={`${space_grotesk_medium.className} text-white text-3xl font-semibold tracking-wide`}
                >
                    Account Overview
                </h3>
                <p className={`${space_grotesk_medium.className} text-white`}>
                    View your account, view your earnings, and more
                </p>

                {/* top card */}
                <div className="bg-purple-900 w-full rounded-lg p-2 h-40 text-white flex justify-center space-x-20 shadow-lg">
                    {/* user avatar and wallet address container */}
                    <div className="w-36 flex flex-col items-center justify-center space-y-5">
                        <div className="bg-shillStreetBlue flex items-center justify-center h-20 w-20 rounded-full border-4 border-shillStreetGrey">
                            <Image
                                src="/images/avatar-icon.svg"
                                alt="avatar"
                                width={40}
                                height={40}
                                unoptimized={true}
                            />
                        </div>
                        <span className={`${space_grotesk_light.className}text-gray-200`}>
                            0x000....89862
                        </span>
                    </div>

                    {TopCardTextContentSampleData.map((item) => (
                        <TopCardTextContent
                            key={item.index}
                            title={item.title}
                            value={item.value}
                        />
                    ))}
                </div>

                {/* overview cards container */}
                <div className="my-5 mx-auto flex w-full justify-center space-x-20">
                    {CardSampleData.map((item: any) => (
                        <li key={item.index} className="list-none">
                            <OverviewCard
                                title={item.title}
                                duration={item.duration}
                                value={item.value}
                            />
                        </li>
                    ))}
                </div>

                <div className="bg-shillStreetGrey flex w-52 rounded-3xl h-auto text-white border-4 border-white overflow-hidden"></div>
            </section>
        </MainLayout>
    )
}

export default AccountOverview
