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
        <div className="bg-shillStreetGrey max-h-80 overflow-y-auto mx-auto border-4 border-white rounded-xl w-full">
            <table
                className={`${space_grotesk_regular.className} w-full text-sm text-center text-gray-500 dark:text-gray-400`}
            >
                <thead className="text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
                    <tr>
                        <th scope="col" colSpan={2} className="px-6 py-3">
                            <span className="font-semibold text-white">Active Jobs (1)</span>
                            <br />
                            <span className="text-xs mt-2">Campaign</span>
                        </th>
                        <th scope="col" colSpan={2} className="px-6 py-3">
                            <span className="font-semibold text-white">Completed Jobs</span>
                            <br />
                            <span className="text-xs mt-2">Time Accepted</span>
                        </th>
                        <th scope="col" colSpan={2} className="px-6 py-3">
                            <span className="font-semibold text-white">Job Activity</span>
                            <br />
                            <span className="text-xs mt-2">Reach Generated</span>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <br />
                            <span className="text-xs mt-2">Thread Earnings</span>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <br />
                            <span className="text-xs">Share of Campaign Earned</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {campaigns.map((item: any) => (
                        <tr
                            key={item.id}
                            onClick={() => handleNavigationToDetails(item)}
                            className="bg-transparent border-b hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer overflow-y-auto"
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
                                {item.timeAccepted.date} <br />
                                {item.timeAccepted.time}
                            </td>
                            <td colSpan={2} className="px-6 py-4">
                                {item.reachGenerated}
                            </td>
                            <td className="px-6 py-4">{item.threadEarnings}</td>
                            <td className="px-6 py-4">{item.shareOfCampaignEarned}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table
