import Link from "next/link"
import { space_grotesk_bold, space_grotesk_regular } from "../utils/customFont"
import ProgressBar from "./progressBar"

type landingMiniCardProps = {
    title: string
    subtitle: string
}

type smartCampaignCardProps = {
    title: string
    valutSize: number
    threadComplete: number
    utilization: number
}

export const LandingMiniCard = ({ title, subtitle }: landingMiniCardProps) => {
    return (
        <div
            className={`${space_grotesk_regular.className} bg-shillStreetGrey w-60 h-24 flex flex-col items-center justify-center text-white font-semibold text-center`}
        >
            <p className="text-xl pt-5">${title}</p>
            <p className="text-lg">{subtitle}</p>
        </div>
    )
}

export const SmartCampaignCard = ({
    title,
    valutSize,
    threadComplete,
    utilization,
}: smartCampaignCardProps) => {
    return (
        <div className="bg-shillStreetGrey w-full rounded-3xl p-2 px-14 h-60 text-white border-4 border-white">
            <h3 className={`${space_grotesk_bold.className} text-2xl text-center`}>{title}</h3>
            <div className={`${space_grotesk_regular.className} mt-4`}>
                <p className="text-sm">Vault Size: ${valutSize}</p>
                <p className="text-sm">Threads Complete: {threadComplete}</p>
            </div>
            {/* progress bar and content container */}
            <div>
                <div
                    className={`${space_grotesk_regular.className} flex justify-between text-xs mb-2`}
                >
                    <span>Utilzation</span>
                    <span>{utilization}%</span>
                </div>
                {/* progress bar */}
                <ProgressBar value={utilization} />
            </div>
            <div className="mt-5 flex justify-center">
                <Link
                    href="#"
                    className={`${space_grotesk_regular.className} bg-white rounded-lg p-2 text-gray-900 hover:bg-gray-200 text-sm`}
                >
                    View Campaign
                </Link>
            </div>
        </div>
    )
}
