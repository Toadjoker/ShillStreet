import { MainLayout } from "../components"
import { LandingMiniCards } from "../components/cards"

const LandingMiniCardsContent: any = [
    { index: 0, title: "$12,500", subtitle: "TVL" },
    { index: 1, title: "6", subtitle: "Campaigns" },
    { index: 2, title: "$35,250", subtitle: "Threadors Earned" },
]

const JobListing = () => {
    return (
        <MainLayout>
            <section className="bg-shillStreetBlue flex flex-col flex-grow px-48 py-10">
                <h3 className="text-white text-3xl font-semibold tracking-wide">
                    Smart Campaigns
                </h3>
                <div className="bg-shillStreetGrey w-full rounded-3xl p-2 px-14 h-24 text-white border-4 border-white">
                    <p className="font-bold text-3xl">$12,981</p>
                    <p className="text-gray-200 text-sm -mt-3">Total Value Locked</p>
                </div>
            </section>
        </MainLayout>
    )
}

export default JobListing
