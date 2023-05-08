import { MainLayout, SmartCampaignCard } from "../components"
import {
    space_grotesk_light,
    space_grotesk_medium,
    space_grotesk_semibold,
} from "../utils/customFont"
import { useSelector } from "react-redux"

const JobListing = () => {
    const state = useSelector((state: any) => state)
    const { campaigns } = state.campaignsReducer

    return (
        <MainLayout>
            <section className="bg-shillStreetBlue flex flex-col flex-grow px-52 pt-10 overflow-hidden">
                <h3
                    className={`${space_grotesk_medium.className} text-white text-3xl font-semibold tracking-wide`}
                >
                    Smart Campaigns
                </h3>

                {/* total value card */}
                <div className="bg-shillStreetGrey w-full rounded-3xl p-2 px-14 h-20 text-white border-4 border-white">
                    <p className={`${space_grotesk_semibold.className} font-bold text-2xl`}>
                        $12,981
                    </p>
                    <p className={`${space_grotesk_light.className}text-gray-200 text-xs -mt-4`}>
                        Total Value Locked
                    </p>
                </div>

                {/* smart campaign cards container */}
                <div className="my-5 max-h-160 overflow-y-auto mx-auto justify-center grid grid-cols-2 gap-6 w-full">
                    {campaigns.map((item: any) => (
                        <li key={item.id} className="list-none">
                            <SmartCampaignCard
                                id={item.id}
                                title={item.title}
                                vaultSize={item.vaultSize}
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
