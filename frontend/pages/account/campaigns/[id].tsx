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
                <div className="bg-red-400 py-10 h-full px-48">
                    <div className="flex h-20 bg-green-400 overflow-hidden items-center space-x-6">
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

                    <div className="bg-blue-500 h-full mt-5 ml-20">
                        <div className="bg-shillStreetGrey w-full p-2 px-14 h-16 text-white">
                            <p className={`${space_grotesk_semibold.className} font-bold text-lg`}>
                                $3,500
                            </p>
                            <p
                                className={`${space_grotesk_light.className}text-gray-200 text-xs -mt-3`}
                            >
                                Total Value Locked
                            </p>
                        </div>
                        <div className="bg-red-100 mt-5 flex h-full">
                            {/* left */}
                            <div className="w-2/3"></div>
                            {/* right */}
                            <div className="bg-shillStreetGrey w-1/3 h-72 text-white p-4 space-y-8">
                                <div>
                                    <h4
                                        className={`${space_grotesk_semibold.className} font-semibold`}
                                    >
                                        Arbitrum
                                    </h4>
                                    <p
                                        className={`${space_grotesk_light.className} text-xs flex items-center space-x-2`}
                                    >
                                        <span>
                                            <Image
                                                src="/images/wallet-icon.svg"
                                                alt="wallet-icon"
                                                width={18}
                                                height={18}
                                                unoptimized={true}
                                            />
                                        </span>
                                        <span>
                                            {"0x0a884564B8708B1dEFa90E99B146B3a142EFf06".slice(
                                                0,
                                                30
                                            )}
                                            ...
                                        </span>
                                    </p>
                                </div>
                                <div>
                                    <h4
                                        className={`${space_grotesk_semibold.className} font-semibold`}
                                    >
                                        Thread and Earn
                                    </h4>
                                    <p className={`${space_grotesk_light.className} text-xs`}>
                                        Tweet a thread covering the required criteria and tell us
                                        where to find the thread, we will send your calculated
                                        payment after 24hrs.
                                    </p>
                                </div>
                                <div>
                                    <h4
                                        className={`${space_grotesk_semibold.className} font-semibold`}
                                    >
                                        Twitter URL
                                    </h4>
                                    <input className="bg-gray-200  h-8 w-full rounded-xl text-shillStreetGrey px-4" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    )
}

export default CampaignDetails
