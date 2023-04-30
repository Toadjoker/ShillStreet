import { useState } from "react"
import { space_grotesk_medium } from "../utils/customFont"
import { Spinner } from "."

const ConnectTwitterButton = ({ buttonTitle }: any) => {
    const [isRequesting, setIsRequesting] = useState<boolean>(false)
    const [isConnecting, setIsConnecting] = useState<boolean>(false)
    const createConnection = () => {
        // the followssssssssssing are just place holders
        try {
            setTimeout(() => {
                setIsRequesting(true)
                setIsConnecting(true)
            }, 2000)
        } catch (error) {
        } finally {
            setIsRequesting(false)
        }
    }

    return (
        <>
            <button
                className={`${space_grotesk_medium.className} flex items-center justify-center text-xs bg-blue-500 p-2 rounded-full w-32 h-10 shadow-md hover:bg-blue-600 text-white`}
                type="submit"
                onClick={() => createConnection()}
            >
                {isRequesting ? <Spinner width={20} height={20} /> : buttonTitle}
            </button>
            {isConnecting && (
                <button
                    className={`${space_grotesk_medium.className} flex items-center justify-center text-xs bg-blue-500 p-2 rounded-full w-32 h-10 shadow-md hover:bg-blue-600 text-white`}
                    type="submit"
                    onClick={() => createConnection()}
                >
                    {isRequesting ? <Spinner width={20} height={20} /> : buttonTitle}
                </button>
            )}
        </>
    )
}

export default ConnectTwitterButton
