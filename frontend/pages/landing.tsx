import Image from "next/image"
import { MainLayout, LandingMiniCard } from "../components"
import {
    space_grotesk_bold,
    space_grotesk_regular,
    space_grotesk_semibold,
} from "../utils/customFont"

const CardSampleData: any = [
    { index: 0, title: "12,500", subtitle: "TVL" },
    { index: 1, title: "6", subtitle: "Campaigns" },
    { index: 2, title: "35,250", subtitle: "Threadors Earned" },
]

const Landing = () => {
    return (
        <MainLayout>
            <section className="bg-shillStreetBlue flex flex-col flex-grow p-24">
                <div className="flex justify-between h-1/2 w-full">
                    <div>
                        <h3
                            className={`${space_grotesk_bold.className} text-shillStreetGrey text-7xl tracking-wide`}
                        >
                            ShillStreet
                        </h3>
                        <h5 className={`${space_grotesk_semibold.className} text-white text-2xl`}>
                            Automated Web3 Marketing Platform
                        </h5>
                        <p
                            className={`${space_grotesk_regular.className} text-white text-lg mt-10`}
                        >
                            Enabling one-click marketing campaigns for Web3 protocols and <br />
                            automating value exchange between threadors and protocols
                        </p>
                    </div>
                    <div className="mr-20">
                        <Image
                            src="/images/logo-right.png"
                            alt="right-icon"
                            width={400}
                            height={400}
                            unoptimized={true}
                        />
                    </div>
                </div>
                <div className="mt-24 h-32 flex space-x-20">
                    {CardSampleData.map((item: any) => (
                        <li key={item.index} className="list-none">
                            <LandingMiniCard title={item.title} subtitle={item.subtitle} />
                        </li>
                    ))}
                </div>
            </section>
        </MainLayout>
    )
}

export default Landing
