import { useMemo, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { ConnectWalletButton } from "../"
import { useAccount, useSignMessage, useDisconnect } from "wagmi"
import { RegisterType } from "../../utils/types"
import { registerRequest } from "../../utils/apiRequests"
import { press_start_2P } from "../../utils/customFont"
import { Spinner, Alert, AlertType } from "../"
import Cookies from "js-cookie"
import { space_grotesk_medium } from "../../utils/customFont"

const ConnectTwitterForm = () => {
    const [isRequesting, setIsRequesting] = useState<boolean>(false)
    const [isBindnig, setIsBindnig] = useState<boolean>(false)
    const [isConnecting, setIsConnecting] = useState<boolean>(false)
    const [url, setUrl] = useState<string>("")
    const createConnection = async () => {
        try {
            setIsRequesting(true)
            setIsConnecting(true)
            request()
        } catch (error) {
        } finally {
        }
    }
    console.log(url)
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value)
    }

    const bindConnection = async () => {
        try {
            const token = Cookies.get("jwt")
            const response = await fetch("https://api.shillstreet.com/users/bind/", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    url,
                }),
            })
            const data = await response.json()
            console.log(data)
        } catch (error) {
            if (error.response && error.response.status === 401) {
                return
            }
            console.error(error)
        }
    }
    const request = async () => {
        try {
            const token = Cookies.get("jwt")
            const response = await fetch("https://api.shillstreet.com/users/request/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            const data = await response.json()
            if (response.status === 200) {
                setTimeout(() => {
                    setIsRequesting(false)
                    openTwitterPopup(data.id)
                }, 2000)
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                return
            }
            console.error(error)
        }
    }
    const openTwitterPopup = (ssId: string) => {
        console.log(ssId)
        const url = `https://twitter.com/intent/tweet?text=Hey%20everyone!%20I%20wanted%20to%20let%20you%20know%20about%20a%20great%20platform%20called%20@ShillStreet%20that%20I've%20been%20using.%20It's%20been%20really%20helpful%20for%20me%20and%20I%20think%20you%20should%20check%20it%20out%20too.%20ssid:${ssId}.%20You%20can%20learn%20more%20about%20it%20at%20https://shillstreet.com.`
        const windowFeatures =
            "width=600,height=400,menubar=no,toolbar=no,location=no,status=no,resizable=yes,scrollbars=yes"
        window.open(url, "twitterShare", windowFeatures)
    }
    return (
        <>
            <div className="flex items-center justify-between my-10">
                <p
                    className={`${space_grotesk_medium.className} font-bold text-xl text-center mt-5`}
                >
                    Connect Twitter
                </p>
                <button
                    className={`${space_grotesk_medium.className} flex items-center justify-center text-xs bg-blue-500 p-2 rounded-full w-32 h-10 shadow-md hover:bg-blue-600 text-white`}
                    type="submit"
                    onClick={() => createConnection()}
                >
                    {isRequesting ? <Spinner width={20} height={20} /> : "Connect Twitter"}
                </button>
            </div>
            <div className="flex items-center justify-between my-10">
                {isConnecting && (
                    <>
                        <input
                            className="text-black"
                            placeholder="Your Tweet Link"
                            onChange={handleEmailChange}
                        ></input>
                        <button
                            className={`${space_grotesk_medium.className} flex items-center justify-center text-xs bg-blue-500 p-2 rounded-full w-32 h-10 shadow-md hover:bg-blue-600 text-white`}
                            type="submit"
                            onClick={() => bindConnection()}
                        >
                            {isBindnig ? <Spinner width={20} height={20} /> : "Verify Twitter"}
                        </button>
                    </>
                )}
            </div>
        </>
    )
}

export default ConnectTwitterForm
