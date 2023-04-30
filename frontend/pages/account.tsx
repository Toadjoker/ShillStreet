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
                <div className="bg-purple-900 w-full rounded-lg p-2 px-14 h-40 text-white">
                    {/* user avatar and wallet address container */}
                    <div className="bg-red-300 w-40 flex flex-col items-center justify-center space-y-5">
                        <div className="bg-shillStreetBlue flex items-center justify-center h-20 w-20 rounded-full border-4 border-shillStreetGrey">
                            <Image
                                src="/images/avatar-icon.svg"
                                alt="right-icon"
                                width={40}
                                height={40}
                                unoptimized={true}
                            />
                        </div>
                        <span className={`${space_grotesk_light.className}text-gray-200`}>
                            0x000....89862
                        </span>
                    </div>

                    <div></div>

                    {/* <p className={`${space_grotesk_semibold.className} font-bold text-2xl`}>
                        $12,981
                    </p> */}
                    {/* <p className={`${space_grotesk_light.className}text-gray-200 text-xs -mt-4`}>
                        Total Value Locked
                    </p> */}
                </div>

                {/* smart campaign cards container */}
                {/* <div className="my-5 max-h-160 overflow-y-auto mx-auto justify-center grid grid-cols-2 gap-6 w-full">
                    {CardSampleData.map((item: any) => (
                        <li key={item.index} className="list-none">
                            <OverviewCard
                                title={item.title}
                                duration={item.duration}
                                value={item.value}
                            />
                        </li>
                    ))}
                </div> */}
            </section>
        </MainLayout>
    )
}

export default AccountOverview
