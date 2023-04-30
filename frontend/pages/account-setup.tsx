import { MainLayout, ConnectWalletButton, ConnectTwitterButton } from "../components"
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

const AccountSetup = () => {
    return (
        <MainLayout>
            <section className="bg-shillStreetBlue flex flex-col flex-grow px-96 pt-10 overflow-hidden">
                {/* <h3
                    className={`${space_grotesk_medium.className} text-white text-3xl font-semibold tracking-wide`}
                >
                    Account Setup
                </h3> */}

                {/* total value card */}
                <div className="bg-shillStreetGrey w-full rounded-xl p-2 px-14 h-14 text-white border-4 border-white">
                    <h3
                        className={`${space_grotesk_medium.className} font-bold text-xl text-center`}
                    >
                        Account Setup
                    </h3>
                </div>

                <div className="bg-shillStreetGrey w-full rounded-xl p-2 px-14 h-1/2 mt-14 text-white border-4 border-white">
                    <div className="flex items-center justify-between my-10">
                        <p
                            className={`${space_grotesk_medium.className} font-bold text-xl text-center mt-5`}
                        >
                            Connect Wallet
                        </p>
                        <ConnectWalletButton buttonTitle="Connect" />
                    </div>
                    <div className="flex items-center justify-between my-10">
                        <p
                            className={`${space_grotesk_medium.className} font-bold text-xl text-center mt-5`}
                        >
                            Connect Twitter
                        </p>
                        <ConnectTwitterButton buttonTitle="Connect" />
                    </div>
                </div>

                {/* smart campaign cards container */}
                {/* <div className="my-5 max-h-160 overflow-y-auto mx-auto justify-center grid grid-cols-2 gap-6 w-full">
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
                </div> */}
            </section>
        </MainLayout>
    )
}

export default AccountSetup
