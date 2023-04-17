import { MainLayout } from "../components"

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
                <div className="bg-red-400 mt-48">
                    <p>cardss</p>
                </div>
            </section>
        </MainLayout>
    )
}

export default Landing
