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

type teamCardProps = {
    title: string
    subtitle: string
    img: string
}

type smartCampaignCardProps = {
    id: string
    title: string
    vaultSize: number
    threadComplete: number
    utilization: number
    state : string
}

type overviewCardProps = {
    title: string
    duration: string
    value: string
}

export const LandingMiniCard = ({ title, subtitle }: landingMiniCardProps) => {
    return (
        <div
            className={`${space_grotesk_regular.className} bg-shillStreetBlue w-60 h-24 sm:h-auto flex flex-col items-center justify-center text-blue font-semibold text-center rounded-2xl`}
        >
            <p className="text-base md:text-xl pt-5">{title}</p>
            <p className="text-base  md:text-lg pb-1">{subtitle}</p>
        </div>
    )
}

export const TeamCard = ({ title, subtitle, img }:teamCardProps) => {
    return (
        <div className="flex flex-col items-center justify-center max-w-sm">
            <img className="w-24 h-auto rounded-full" src={img} />
            <div className="px-6 py-4 flex items-center flex-col flex-center">
                <div className="font-bold text-xl text-white mb-2">{title}</div>
                <div className= "text-xl text-white mb-2">{subtitle}</div>

            </div>
        </div>
    )
}


export const SmartCampaignCard = ({
    id,
    title,
    state,
    vaultSize,
    threadComplete,
    utilization,
}: smartCampaignCardProps) => {
    const dispatch = useDispatch()

    // this function dispatch to get a single campaign
    const dispatchToStore = (id: any) => {
        dispatch(setCampaignAction(id))
    }

    // Determine if the campaign is deployed or not
    const isDeployed = state !== "Not deployed yet";

    return (
        <div className="w-full rounded-3xl mt-2 mb-2 p-2 px-14 h-full text-white border border-white ">
            <h3 className={`${space_grotesk_bold.className} text-twitterBlue text-2xl text-center`}>{title}</h3>
            <div className={`${space_grotesk_regular.className} mt-4`}>
                <p className="text-sm text-white">Vault Size: {vaultSize}</p>
                <p className="text-sm text-white">Threads Completed: {threadComplete}</p>
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
                    onClick={isDeployed ? () => dispatchToStore(id) : undefined}
                    href={`/campaigns/${id}`}
                    className={`${space_grotesk_regular.className} rounded-lg p-2 text-gray-900 text-sm ${isDeployed ? 'bg-twitterBlue hover:bg-gray-200 text-white' : 'bg-twitterDisabledBlue cursor-not-allowed text-white'}`}>
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
