import { useRouter } from "next/router"
import Image from "next/image"
import Link from "next/link"
import { MainLayout } from "../../../components"
import {
    space_grotesk_light,
    space_grotesk_medium,
    space_grotesk_semibold,
} from "../../../utils/customFont"

const img = "https://icodrops.com/wp-content/uploads/2021/06/dopex_logo.png"
const CampaignDetails = () => {
    const router = useRouter()
    const { id } = router.query

    return (
        <MainLayout>
            <section className="h-full bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
                <div className="bg-red-400 py-10 h-full">
                    <div className="flex h-20 bg-green-400 mx-48 overflow-hidden items-center space-x-10">
                        <Link
                            href="/account/overview"
                            className="bg-shillStreetGrey w-6 h-6 flex justify-center items-center rounded-md cursor-pointer hover:bg-gray-600"
                        >
                            <Image
                                src="/images/chevron-left.svg"
                                alt="chevron-left"
                                width={18}
                                height={18}
                                unoptimized={true}
                            />
                        </Link>
                        <div className="flex items-center">
                            <div className="w-20 h-20 rounded-full overflow-hidden mr-5">
                                <Image
                                    src={img}
                                    alt="avatar"
                                    width={100}
                                    height={100}
                                    unoptimized={true}
                                />
                            </div>
                            <h4
                                className={`${space_grotesk_semibold.className} text-3xl text-white mt-3`}
                            >
                                Dopex Smart Campaign
                            </h4>
                        </div>
                    </div>

                    <div></div>
                </div>
            </section>
        </MainLayout>
    )
}

export default CampaignDetails
