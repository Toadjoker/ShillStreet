import Link from "next/link"
import Image from "next/image"
import { useDispatch } from "react-redux"
import { setCampaignAction } from "../redux/campaigns/campaigns"

import {
    space_grotesk_bold,
    space_grotesk_regular,
    space_grotesk_light,
} from "../utils/customFont"
import ProgressBar from "./progressBar"

type landingMiniCardProps = {
    title: string
    subtitle: string
}

type smartCampaignCardProps = {
    id: string
    title: string
    vaultSize: number
    threadComplete: number
    utilization: number
}

type overviewCardProps = {
    title: string
    duration: string
    value: string
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
    id,
    title,
    vaultSize,
    threadComplete,
    utilization,
}: smartCampaignCardProps) => {
    const dispatch = useDispatch()

    // this function dispatch to get a single campaign
    const dispatchToStore = (id: any) => {
        dispatch(setCampaignAction(id))
    }

    return (
        <div className="bg-shillStreetGrey w-full rounded-3xl p-2 px-14 h-60 text-white border-4 border-white">
            <h3 className={`${space_grotesk_bold.className} text-2xl text-center`}>{title}</h3>
            <div className={`${space_grotesk_regular.className} mt-4`}>
                <p className="text-sm">Vault Size: ${vaultSize}</p>
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
                    onClick={() => dispatchToStore(id)}
                    href={`/campaigns/${id}`}
                    className={`${space_grotesk_regular.className} bg-white rounded-lg p-2 text-gray-900 hover:bg-gray-200 text-sm`}
                >
                    View Campaign
                </Link>
            </div>
        </div>
    )
}

export const OverviewCard = ({ title, duration, value }: overviewCardProps) => {
    return (
        <div className="bg-shillStreetGrey flex w-52 rounded-3xl h-auto text-white border-4 border-white overflow-hidden">
            <div className="ml-3 mr-2 mt-5">
                <Image
                    src="/images/flag-icon.svg"
                    alt="flag-icon"
                    width={30}
                    height={30}
                    unoptimized={true}
                />
            </div>
            <div className="flex flex-col w-full overflow-hidden mr-5 text-center">
                <div
                    className={`${space_grotesk_light.className} flex items-center justify-between pt-2`}
                >
                    <p className="text-xs">{title}</p>
                    <p className="text-xs">{duration}</p>
                </div>
                <h4 className={`${space_grotesk_bold.className} text-lg text-center -mt-1 -ml-5`}>
                    {value}
                </h4>
            </div>
        </div>
    )
}

export const Paper = ({ children }: any) => (
    <div className="bg-white overflow-x-hidden overflow-y-auto flex items-center justify-center rounded-md mx-10 -mt-28 md:-mt-auto">
        <div className="relative w-full h-full max-w-2xl md:h-auto p-5">
            {/* paper content */}
            <div className="my-5 h-auto flex justify-center">{children}</div>
        </div>
    </div>
)
