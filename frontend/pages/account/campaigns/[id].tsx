import { useRouter } from "next/router"
import Image from "next/image"
import Link from "next/link"
import { MainLayout, ProgressBar } from "../../../components"
import {
    space_grotesk_light,
    space_grotesk_medium,
    space_grotesk_regular,
    space_grotesk_semibold,
} from "../../../utils/customFont"

const img = "https://icodrops.com/wp-content/uploads/2021/06/dopex_logo.png"
const CampaignDetails = () => {
    const router = useRouter()
    const { id } = router.query

    return (
        <MainLayout>
            <section className="h-auto bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
                <div className="py-10 h-full px-48">
                    <div className="flex h-20 overflow-hidden items-center space-x-6">
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

                    <div className="h-auto mt-5 ml-20">
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
                        <div className="mt-5 flex h-auto">
                            {/* left */}
                            <div className="w-2/3 mb-20 mx-20 text-white space-y-3">
                                {/* section 1 */}
                                <div>
                                    <h3
                                        className={`${space_grotesk_semibold.className} font-semibold text-2xl`}
                                    >
                                        About Dopex Smart Campaign
                                    </h3>
                                    <div
                                        className={`${space_grotesk_semibold.className} text-sm flex`}
                                    >
                                        <p className="w-67">Campaign Size</p>
                                        <p className="flex justify-start">$3,500</p>
                                    </div>
                                    <div
                                        className={`${space_grotesk_semibold.className} text-sm flex`}
                                    >
                                        <p className="w-1/2">Target Reach</p>
                                        <p className="w-1/2 flex justify-end">
                                            50,000 Impressions
                                        </p>
                                    </div>
                                    <div>
                                        <div
                                            className={`${space_grotesk_light.className} text-xs flex justify-between`}
                                        >
                                            <p>Funds Utilized</p>
                                            <p>67.21%</p>
                                        </div>
                                        <ProgressBar value="67.21" />
                                        <span
                                            className={`${space_grotesk_light.className} flex justify-end text-xs`}
                                        >
                                            2.352.35 / 3.500 USDC
                                        </span>
                                    </div>
                                </div>

                                {/* section 2 */}
                                <div>
                                    <h3
                                        className={`${space_grotesk_semibold.className} font-semibold text-2xl`}
                                    >
                                        Thread Details
                                    </h3>
                                    <p className={`${space_grotesk_regular.className}`}>
                                        Write an informative thread about the Dope Options Protocol
                                        covering: Products, Tokenomics, Road Map, Revenues and
                                        other Key Metrics
                                    </p>
                                    <div
                                        className={`${space_grotesk_semibold.className} text-sm flex justify-between`}
                                    >
                                        <p>View the Dopex Docs to learn more</p>
                                        <Link
                                            href="#"
                                            className="bg-purple-600 w-5 h-5 flex justify-center items-center rounded-md cursor-pointer hover:bg-gray-600"
                                        >
                                            <Image
                                                src="/images/chevron-right.svg"
                                                alt="chevron-right"
                                                width={15}
                                                height={15}
                                                unoptimized={true}
                                            />
                                        </Link>
                                    </div>
                                    <div
                                        className={`${space_grotesk_semibold.className} text-sm flex justify-between`}
                                    >
                                        <p>View Samble Thread</p>
                                        <Link
                                            href="#"
                                            className="bg-purple-600 w-5 h-5 flex justify-center items-center rounded-md cursor-pointer hover:bg-gray-600"
                                        >
                                            <Image
                                                src="/images/chevron-right.svg"
                                                alt="chevron-right"
                                                width={15}
                                                height={15}
                                                unoptimized={true}
                                            />
                                        </Link>
                                    </div>
                                </div>

                                {/* section 3 */}
                                <div>
                                    <h3
                                        className={`${space_grotesk_semibold.className} font-semibold text-lg`}
                                    >
                                        Dope Overview
                                    </h3>
                                    <p className={`${space_grotesk_regular.className}`}>
                                        Dopex is a decentralized options protocol aiming to expand
                                        option liquidity throughout DeFi by minimizing option
                                        losses via rebates and maximizing reward through delegated
                                        controlled incentives
                                    </p>
                                </div>

                                {/* section 4 */}
                                <div>
                                    <h3
                                        className={`${space_grotesk_semibold.className} font-semibold text-lg`}
                                    >
                                        Tokenomics
                                    </h3>
                                    <span className={`${space_grotesk_regular.className}`}>
                                        <p>
                                            Dopex makes use of two tokens for the protocol to work
                                            synergistically: <br />
                                            • DPX - The vanilla governance and protocol fee accrual
                                            token <br />• rDPx - The rebate token - Collateralized
                                            and used to access our sunthetic market
                                        </p>
                                        <p>
                                            DPX is a unique governance token that is essential to
                                            the Dopex protocol. It is designed to enable DPX
                                            holders to vote on crucial protocol and app-level
                                            proposals. <br /> DPX is also designed to accrue fees
                                            and revenue from all Dope products
                                        </p>
                                    </span>
                                </div>

                                {/* section 7 */}
                                <div>
                                    <h3
                                        className={`${space_grotesk_semibold.className} font-semibold text-lg`}
                                    >
                                        Dope Products
                                    </h3>
                                    <span className={`${space_grotesk_regular.className}`}>
                                        • Single Staking Options Vaults (SSOVs) <br />
                                        • Options Liquiditu Pools <br />
                                        • Atlantic Options <br />• Atlantic Straddles
                                    </span>
                                </div>
                            </div>
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
