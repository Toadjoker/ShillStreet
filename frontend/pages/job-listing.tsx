import { MainLayout } from "../components"
import { SmartCampaignCard } from "../components/cards"
import {
    space_grotesk_light,
    space_grotesk_medium,
    space_grotesk_semibold,
} from "../utils/customFont"

// sample data
const CardSampleData: any = [
    {
        index: 0,
        title: "Poison Finance",
        valutSize: "2,000",
        threadComplete: 13,
        utilization: 97.5,
    },
    { index: 1, title: "Pepe's Game", valutSize: "1,000", threadComplete: 6, utilization: 52.43 },
    { index: 2, title: "Jane's DAO", valutSize: "3,500", threadComplete: 22, utilization: 74.5 },
    { index: 3, title: "Combo Pay", valutSize: "4,000", threadComplete: 2, utilization: 10 },
    { index: 4, title: "Finix", valutSize: "2,500", threadComplete: 12, utilization: 17.8 },
    { index: 5, title: "Culint", valutSize: "8,000", threadComplete: 16, utilization: 89.6 },
]

const JobListing = () => {
    return (
        <MainLayout>
            <section className="bg-shillStreetBlue flex flex-col flex-grow px-60 pt-10 overflow-hidden">
                <h3
                    className={`${space_grotesk_medium.className} text-white text-3xl font-semibold tracking-wide`}
                >
                    Smart Campaigns
                </h3>

                {/* total value card */}
                <div className="bg-shillStreetGrey w-full rounded-3xl p-2 px-14 h-24 text-white border-4 border-white">
                    <p className={`${space_grotesk_semibold.className} font-bold text-3xl`}>
                        $12,981
                    </p>
                    <p className={`${space_grotesk_light.className}text-gray-200 text-sm -mt-3`}>
                        Total Value Locked
                    </p>
                </div>

                {/* smart campaign cards container */}
                <div className="my-10 max-h-160 overflow-y-auto mx-auto justify-center grid grid-cols-2 gap-6 w-full">
                    {CardSampleData.map((item: any) => (
                        <li key={item.index} className="list-none">
                            <SmartCampaignCard
                                title={item.title}
                                valutSize={item.valutSize}
                                threadComplete={item.threadComplete}
                                utilization={item.utilization}
                            />
                        </li>
                    ))}
                </div>
            </section>
        </MainLayout>
    )
}

export default JobListing
