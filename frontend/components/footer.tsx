import Link from "next/link"
import Image from "next/image"
import { space_grotesk_regular } from "../utils/customFont"

const Footer = () => {
    return (
        <div className="bg-shillStreetBlue h-15 flex items-center justify-between py-4 px-3 md:px-20 border-t-cyan-50">
            <div className="flex space-x-3">
                <Link
                    href="https://discord.gg/bcbUYfBF"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="bg-shillStreetBlue text-white text-xs md:text-xl font-semibold cursor-pointer border-b border-shillStreetGrey p-2 "
                >
                    <Image
                        src="/images/icons8-discord.svg"
                        alt="discord-icon"
                        width={20}
                        height={20}
                        unoptimized={true}
                    />
                </Link>
                <Link
                    href="https://twitter.com/ShillStreet"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="bg-shillStreetBlue text-white text-xs md:text-xl font-semibold cursor-pointer border-b border-shillStreetGrey p-2 "
                >
                    <Image
                        src="/images/icons8-twitter.svg"
                        alt="twitter-icon"
                        width={20}
                        height={20}
                        unoptimized={true}
                    />
                </Link>
                <Link
                    href="https://shillstreet.gitbook.io/shillstreet/"
                    className="bg-shillStreetBlue text-xs md:text-xl font-semibold cursor-pointer p-2  border-b border-shillStreetGrey"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <Image
                        src="/images/icons8-docs.svg"
                        alt="docs-icon"
                        width={20}
                        height={20}
                        unoptimized={true}
                    />
                </Link>
            </div>
            <p className={`${space_grotesk_regular.className} flex text-xs  text-shillStreetGrey`}>
                Copyright &copy;2023 shillstreet
            </p>
        </div>
    )
}

export default Footer
