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
            <section className="bg-gray-800  p-20 flex flex-col flex-grow mt-14 pt-14 w-full">
                 <h3
                    className={`${space_grotesk_medium.className} text-shillStreetBlue text-3xl font-semibold tracking-wide`}
                >
                    Smart Campaigns
                </h3>
                <div className="bg-twitterBackGround flex flex-col h-full justify-center border border-white rounded-2xl items-center">

                {/* total value card */}
                <div className="w-full  border-b p-2 px-14 h-20 text-white ">
                    <p className={`${space_grotesk_semibold.className} font-bold text-2xl`}>
                        30000 $STC
                    </p>
                    <p className={`${space_grotesk_light.className} text-twitterBlue text-xs -mt-4`}>
                        Total Value Locked
                    </p>
                </div>

                {/* smart campaign cards container */}
                <div className="flex flex-wrap justify-center items-center  h-full w-full">
                    {campaigns.map((item: any) => (
                        <li key={item.id} className="list-none p-5">
                            <SmartCampaignCard
                                id={item.id}
                                state={item.state}
                                title={item.title}
                                vaultSize={item.vaultSize}
                                threadComplete={item.threadComplete}
                                utilization={item.utilization}
                            />
                        </li>
                    ))}
                </div>
                </div>
            </section>
        </MainLayout>
    )
}

export default JobListing
