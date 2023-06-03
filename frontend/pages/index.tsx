import { MainLayout, LandingMiniCard, TeamCard } from "../components";
import { useEffect, useRef } from "react";
import {
  space_grotesk_bold,
  space_grotesk_regular,
  space_grotesk_semibold,
} from "../utils/customFont";

const CardSampleData: any = [
    { index: 0, title: "12,500 $STC", subtitle: "Total value locked (TVL)" },
    { index: 1, title: "6", subtitle: "Campaigns deployed" },
    { index: 2, title: "35,250 $STC", subtitle: "Threadors Earned" },
]

const TeamSampleData: any = [
    { index: 0, img:"/images/Berger.png" ,title: "Berger", subtitle: "Smart contract developer" },
    { index: 1, img:"/images/0x_0dc.png" ,title: "0x_0dc.eth", subtitle: "Marketing" },
    { index: 2, img:"/images/Maej.png" ,title: "Maej", subtitle: "Front-end developer" },
    { index: 3, img: "/images/0x_Charlie.png",title: "0x_Charlie.eth", subtitle: "Marketing"},
    { index: 4, img:"/images/ASTRO.png",title: "ASTRO", subtitle: "Backend developer"}
]

const Index = () => {
    const videoRef = useRef(null);

  useEffect(() => {
    const video = document.getElementById("infiniteVideo");
    if (video) {
      video.play();
    }
  }, []);

    return (
        <MainLayout>
            <section className="bg-gray-800 flex flex-col flex-grow mt-14 pt-14 w-full">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start h-full w-full p-3 border-b border-gray-200  pb-20">
                    <div className="pl-20">
                        <h3
                            className={`${space_grotesk_bold.className} text-shillStreetBlue text-3xl md:text-4xl lg:text-7xl tracking-wide`}
                        >
                            ShillStreet
                        </h3>
                        <h5 className={`${space_grotesk_semibold.className} } text-white text-lg md:text-2xl`}>
                            Automated Web3 Marketing Platform
                        </h5>
                        <p
                            className={`${space_grotesk_regular.className} text-white text-sm md:text-lg mt-5 md:mt-10`}
                        >
                            Enabling one-click marketing campaigns for Web3 protocols and <br />
                            automating value exchange between threadors and protocols
                        </p>
                    </div>
                    <div className="flex justify-center items-center ml-10 mr-10">
                        <div className="flex justify-center items-center">
                        <video
                        ref={videoRef}
                        id="infiniteVideo"
                        loop
                        width ="600"
                        height="600"
                        muted
                        autoPlay
                        style={{ borderRadius: "20px" }}
                        >
                        <source src="/TweetInfinite.mp4" type="video/mp4" />
                        {/* Add alternative sources for different video formats if needed */}
                        </video>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center flex-col border-b ">
                <h3 className={`${space_grotesk_bold.className} pt-8 text-shillStreetBlue text-3xl md:text-4xl lg:text-7xl tracking-wide`}>Interesting KPIs</h3>
                <div className="flex justify-center items-center flex-col md:flex-row h-full w-full">
                    {CardSampleData.map((item: any) => (
                        <li key={item.index} className="list-none p-6">
                            <LandingMiniCard title={item.title}  subtitle={item.subtitle} />
                        </li>
                    ))}
                </div>
                </div>
                <div className="flex justify-center items-center flex-col">
                    <h4 className={`${space_grotesk_semibold.className} text-shillStreetBlue text-3xl md:text-4xl pt-10 lg:text-7xl tracking-wide`}>Team</h4>
                    <div className="flex justify-center items-center flex-col md:flex-row h-full w-full">
                    {TeamSampleData.map((item: any) => (
                        <li key={item.index} className="list-none p-6">
                            <TeamCard img={item.img} title={item.title}  subtitle={item.subtitle} />
                        </li>
                    ))}
                    </div>
                </div>

            </section>
        </MainLayout>
    )
}

export default Index
