import Image from "next/image"
import { space_grotesk_regular } from "../utils/customFont"

// sample data
const sampleData = [
    {
        index: 0,
        campaign:
            "data:image/png;base64,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",
        timeAccepted: {
            date: "23-03-29",
            time: "10:08:17",
        },
        reachGenerated: "1,753 Users",
        threadEarnings: "$21.50 USDC",
        shareOfCampaignEarned: "1.25%",
    },
    {
        index: 1,
        campaign:
            "data:image/png;base64,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",
        timeAccepted: {
            date: "23-03-25",
            time: "12:23:10",
        },
        reachGenerated: "1,934 Users",
        threadEarnings: "$22.70 USDC",
        shareOfCampaignEarned: "1.10%",
    },
    {
        index: 2,
        campaign:
            "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDQ4NDQ0NDQ0NDQ0NDQ0NDQ8OEA4NFhEiGCARFRMYHSggGBolJxkVIj0hMSorLjMyFyUzODMsNyguLisBCgoKDQ0OFw8PFS0lHR0zLTEvKzgtKy8rKzcvLS0rMCstNCsrLSstNy0vLS0tLS0tKysrKy0tLS0wKy0rLS0tLf/AABEIAKgBLAMBIgACEQEDEQH/xAAbAAEBAQEAAwEAAAAAAAAAAAABAAUGAwQHAv/EAEEQAAIBAwEEBwMHCQkAAAAAAAABAgMEERIFEyExBiJBUXGBkRQyYRUlkqGxstEWIzVSU1RygsEHJDRCYnODk6T/xAAbAQEBAQEBAQEBAAAAAAAAAAADAAIBBwQGBf/EACYRAQEAAgEDAwMFAAAAAAAAAAEAAhESAyExQVGBEyJSBGFxkaH/2gAMAwEAAhEDEQA/APaASP61+eGCIikGCIitjBMiKQYIiOSDBERWxgiIpCCECkGgEDlsaAQKQaAQOSDQCDK2NAJFIMAJFIMAJHLYwREUgwQgUgwQgVsYIQKQbRIQEvOxghApBoBArY0wECkGgECtjQCByQaAQKQaIiKQYIiOWxgiIpBghApBghA5bGCECkGCECtkEIFIMEIHJBoBIrYwAkUhBERSDaJEyEvOyCJkVsYIiKQYIiKQYIiK2QREckIIQKQghArY0AkUgwAkckGAEitjACRSDACRyQYASK2MAJFIMAJMpCCIjlsYIQKQYIQKQbSAQEvOxoBArY0AgUg0AgykKAQKQoBA5bKAQKQaASKQhkRFbIIiKQghA5bIZCBSEEIHJCCECtkEIFIQQgUg0AgctlAJFIQREVsbRIiFvPBgiI5bIIiKQYIiKQYIQK2MHRbH6JVbugq+9jSUtW7jKDlqSeMt54L1MSytZV6tOjD3qk1BPuz2+XF+R223tsRsbiyt6b00qGmVaK/ZtaEn4LU/QHqZZdscfN9XSxxRyy8XCV6Uqc5U5rE4SlCS7pJ4PwdP09sN3cxuIrqXEctrlvIrH1rT9ZzBvDLliNZHHJIN7YHRere05Vd5GjBScYtwc3NrnwysL4mJTpynKMYrMpSUYpdsm8JHc7fvfky3s7Wi+vCUKk8cNUYPLz/FJv0ZjqZJox8svTDuvi4q/tJ29apQqY105aXjk+GU18Gmn5nv/IFR2Cv4zjKOXqpJPVGCnp1Z8ezuNnp7aRmqF9S4wqwjCTXblaoy9MryR++gV3GpC4savGE4ynFPti1plH7H6mXqPAyPmQxOWrjAPYv7WVCtUoz96lNwb78cn5rD8z8WtvKtUhSh79ScYR8W8ZG2a3RadHo/UlYzvnOMYRzpg08zipaW89nHPDtPPsHotUvaLrKtCnHW4JOLk3jt+HM1unNxGhb2+z6XCKjGU1/ojwin4vL/AJT9bE/QV14XP3UfO55cd+7Kebw/kBV/eqf/AFS/EJdAKuH/AHqn505JeuTj9T736snJ979Wb45/l/loYksNrhwbXB5XkzR2NsO4vZNUYpQi8TqzeIRfd8X8EZj4H1G7u4bH2fR00t5p0U9KloTnJZc5Sw8cn6l1M3HQeW3u56r0ArqOYXNKUv1ZQlBfSy/sOVvrOrb1JUq0HCpHnF93en2r4n1HbW31aWlO63Uqm9dPTBy0Y1R1dZ4eOXqZPTyhCvY0btRcZxdNrKxLd1F7r89PoF0+rls5etrHJ9b56AkfTMMAJFIMAJFbGCIjkg0AgVsbRJiAt52NAIFINAJHJBgBApBoBLHdxfYl2lIN9H2Bb7McXdWtNx3KlGVSe9zHq5fvPHJ813nN9K73Z1wt7b65XM5xc5tVIpwUccVLh2Ll3Gntv5v2VStE8Va/Vnj49ab8OKj5nEM+bpYbXPbfb1c9Bho/e7a3Xyjsdw96va8I97lBcPWLx4nDnSdBb/c3e6b6lxHR/wAi4r+q8z0Ok+z/AGW7qwSxCT3tPu0S7PJ5Xkbw+3Nx+ay+7Ay+Lq+itpsysoVKNKTr0I05VJT3nVqNc+L0vk+Rm9LNo7MuYTnTcp3a0QhNKqkoqXHn1cY1ep7cPm7Yzfu17nl3qdRcPSK9UcMHhhyyctvaXLLWJjq7bo21f7Nr2Mn16XCm32JvVF+TTXgjk9mXkrW5p1sNOlPrx7dPKUfHGUe90S2h7Ne023iFX8zU8Jcn5PH1nn6b7P3F45pYhcLer+PlJeuH/MbDWbi+Gt7xH2vc/tAslro3lPDhXioSkuTklmL8190/H9n9gp153M/ct44i3y3klz8ln6SPd2N84bJq2r41rfhT7+HWh9jj5Fe/N2x4Ufdr3XCXenNZl6RxH0D28fp+viX15XK7cv3dXNWv/llLEF3U1wX1cfM7Honufkir7Rxoaq+9xq9zCz7vH0OBO22Gm9hXSSbbVxhLi3wN9Y1iH8Vi97xa+jn6k/8A2fiertSWwtxU9mjU3+n81j2j3/jreMHN+zVP2dT6EvwB29RcXTqJLtcJHTpn5P8Adsbwz5PwZ9u0KUUpJSTSymk0fEZ8n4M+yLaVCNSVFzxUpUFXnHTLhS/WzjHkH+o9LV+qdpPXUlUrSq0540UJ06Winxzwajl+bMjp7+j6n+5R++jSp7ZtpK3aqf4vVuOpNa9PPs4eZidMb6lX2fcbqWrc3FOjU4NaakZrK48/EDAeR2unm+cEIH3zjQCBSDQCBWxoBA5INERFbG0QEhbzsYIiKQYIQOSDBCBSDB5Las6dSFRJN05xmlJZTcXnifgCkxbR27tepe1VUnFQUY6YQi20lnLee9/0M0QOABok5K7ZpzlCUZxeJRkpRa7JJ5TNLb22p30qcp04QdODj1cvLby28/YZgHHEXchkhq1dvbeq3271xjTjSTxGDbTk+cuPgZIgRiBot8ldsGvtnb1W9p0adSEE6OczWczljGfh4GSBILv2kxybR2HtepY1XVppSUo6Zwk2lJc+fYx29tqpfVIznGMIwi4whFtqOebz2t8PRGaBzib5a7yGTrVG7sPpRWsqTowp06kdbmnJyTTfZwMIiyxMjTbxdXW/l9cfu9H6UyfT247Lej9KbORIx9HD2kMmJvOc9uc4WFx+BqbQ27XrVp14vcyqUVQmocVKnjiuPeZZG0G2N5KFzUpyhOE5RlSeabznQ/gnwPa+Vqns1a2klLf11XnUberX2+uEegRINsgmRFIMERFIMERFbGCECkGCEDlsbRIWAt52MEIFINALIpBgBI5bGAEikGCIikGCIitjBERSDBERyQYIiK2MERFIUAgykGgEDlsaAQKQaAQOSDQCRWxgBApBoBIpBgBI5bG0QEhbzsYIiKQYIiK2MEIHJBghBlIUAgUg0AgVspgIFINAIHJBoBArY0AgUg0REUgwREctjBCBSDBERWxghA5IMEIFIMEIFbIIQKQbRIQEvOxoBApBoBArY0REUgwREckIIiK2MERFIMERFIMETIrYwREckGCIikGCYgVsaASKQYASOSDACRWxgBIpCAEjkgwAkVsYASKQbRJgQl52UQEUhRARSFERFbKAiOSFARFIUBEVsoCIpCgIikKAiK2UBEckKAiKQoiIrZBERyQgiIpCCIitkERHJCCIikIIiK2X/9k=",
        timeAccepted: {
            date: "23-03-17",
            time: "5:45:28",
        },
        reachGenerated: "2,849 Users",
        threadEarnings: "$27.23 USDC",
        shareOfCampaignEarned: "0.79%",
    },
    {
        index: 3,
        campaign:
            "data:image/jpeg;base64,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",
        timeAccepted: {
            date: "23-03-12",
            time: "2:15:54",
        },
        reachGenerated: "1,129 Users",
        threadEarnings: "$19.44 USDC",
        shareOfCampaignEarned: "2.87%",
    },
    {
        index: 4,
        campaign:
            "data:image/png;base64,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",
        timeAccepted: {
            date: "23-03-29",
            time: "10:08:17",
        },
        reachGenerated: "1,753 Users",
        threadEarnings: "$21.50 USDC",
        shareOfCampaignEarned: "1.25%",
    },
    {
        index: 5,
        campaign:
            "data:image/png;base64,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",
        timeAccepted: {
            date: "23-03-25",
            time: "12:23:10",
        },
        reachGenerated: "1,934 Users",
        threadEarnings: "$22.70 USDC",
        shareOfCampaignEarned: "1.10%",
    },
    {
        index: 6,
        campaign:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsLYIoq4Bp6wyFJ29ALbBlfECZymBSYGxLHg&usqp=CAU",
        timeAccepted: {
            date: "23-03-17",
            time: "5:45:28",
        },
        reachGenerated: "2,849 Users",
        threadEarnings: "$27.23 USDC",
        shareOfCampaignEarned: "0.79%",
    },
    {
        index: 7,
        campaign:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaJqgTEZ6kkxpAsWK1RiToTVijR79pdPSN5g&usqp=CAU",
        timeAccepted: {
            date: "23-03-12",
            time: "2:15:54",
        },
        reachGenerated: "1,129 Users",
        threadEarnings: "$19.44 USDC",
        shareOfCampaignEarned: "2.87%",
    },
]

const Table = () => (
    <div className="bg-shillStreetGrey max-h-80 overflow-y-auto mx-auto border-4 border-white rounded-xl w-full">
        <table
            className={`${space_grotesk_regular.className} w-full text-sm text-center text-gray-500 dark:text-gray-400`}
        >
            <thead className="text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
                <tr>
                    <th scope="col" colSpan={2} className="px-6 py-3">
                        <span className="font-semibold text-white">Active Jobs (0)</span>
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
                {sampleData.map((item) => (
                    <tr
                        key={item.index}
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

export default Table
