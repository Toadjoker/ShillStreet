import Image from "next/image"
import { useRouter } from "next/router"
import { space_grotesk_regular } from "../utils/customFont"
import { useDispatch, useSelector } from "react-redux"
import { setCampaignAction } from "../redux/campaigns/campaigns"

const Table = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const handleNavigationToDetails = (item: any) => {
        dispatch(setCampaignAction(item.id))
        if (item.id == 0) {
            router.push(`/activecampaigns/${item.id}`)
        } else {
            router.push(`/campaigns/${item.id}`)
        }
    }

    const state = useSelector((state: any) => state)
    const { campaigns } = state.campaignsReducer

    return (
        <div className="overflow-x-auto rounded-2px w-full">
            <table
                className={`${space_grotesk_regular.className} max-h-30 w-full text-sm text-center text-gray-500 overflow-hidden rounded-2px dark:text-gray-400 rounded-2xl `}
            >
                <thead className="text-white  bg-white dark:bg-twitterBlue dark:text-white ">
                    <tr>
                        <th scope="col" colSpan={2} className="px-6 py-3">
                            <span className="font-semibold text-white">Campaign logo</span>
                        </th>
                        <th scope="col" colSpan={2} className="px-6 py-3">
                            <span className="font-semibold text-white">Campaign name</span>
                        </th>
                        <th scope="col" colSpan={2} className="px-6 py-3">
                            <span className="font-semibold text-white">Participation time</span>
                        </th>
                        <th scope="col" colSpan={2} className="px-6 py-3">
                            <span className="font-semibold text-white">Rewarded value</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {campaigns.map((item: any) => (
                        <tr
                            key={item.id}
                            className="bg-transparent border-b"
                        >
                            <td
                                scope="row"
                                colSpan={2}
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white pl-20"
                            >
                                <Image
                                    src={item.campaign}
                                    alt="campaign-logo"
                                    width={50}
                                    height={50}
                                    unoptimized={true}
                                />
                            </td>
                            <td colSpan={2} className="px-6 py-4">
                                {item.title}
                            </td>
                            <td colSpan={2} className="px-6 py-4">
                                {item.timeAccepted.date} <br />
                                {item.timeAccepted.time}
                            </td>
                            <td className="px-6 py-4">{item.rewardedValue}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table
