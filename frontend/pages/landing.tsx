import { MainLayout } from "../components"
import { LandingMiniCard } from "../components/cards"

const CardSampleData: any = [
    { index: 0, title: "12,500", subtitle: "TVL" },
    { index: 1, title: "6", subtitle: "Campaigns" },
    { index: 2, title: "35,250", subtitle: "Threadors Earned" },
]

const Landing = () => {
    return (
        <MainLayout>
            <section className="bg-shillStreetBlue flex flex-col flex-grow p-32">
                <div className="flex justify-between h-1/2 w-3/4">
                    <div>
                        <h3 className="text-shillStreetGrey text-7xl font-semibold tracking-wide">
                            Shill Street
                        </h3>
                        <h5 className="text-white text-3xl">Automated Web3 Marketing Platform</h5>
                        <p className="text-white text-xl mt-20">
                            Enabling one-click marketing campaigns for Web3 protocols and <br />
                            automating value exchange between threadors and protocols
                        </p>
                    </div>
                    <div>
                        <p className="bg-red-300 h-40 w-40">logo</p>
                    </div>
                </div>
                <div className="mt-36 h-32 flex space-x-20">
                    {CardSampleData.map((item: any) => (
                        <li key={item.index}>
                            <LandingMiniCard title={item.title} subtitle={item.subtitle} />
                        </li>
                    ))}
                </div>
            </section>
        </MainLayout>
    )
}

export default Landing
