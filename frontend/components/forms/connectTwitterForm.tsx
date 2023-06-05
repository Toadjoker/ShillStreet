import { useMemo, useState, useEffect } from "react"
import { Spinner, Alert, AlertType } from "../"
import Cookies from "js-cookie"
import { space_grotesk_medium } from "../../utils/customFont"
import { useAccount, useSignMessage } from "wagmi"

type ConnectTwitterFormProps = {
    userName: string
    email: string
}

const ConnectTwitterForm = ({ userName, email }: ConnectTwitterFormProps) => {
    const [isRequesting, setIsRequesting] = useState<boolean>(false)
    const [isBindnig, setIsBindnig] = useState<boolean>(false)
    const [isConnecting, setIsConnecting] = useState<boolean>(false)
    const [twitterHandle, setTwitterHandle] = useState<string>("")
    const [url, setUrl] = useState<string>("")
    const { address, isConnected } = useAccount()
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
        setIsBindnig(true)
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
            console.log(data.twitter_handle)
            if (data.twitter_handle) {
                Alert(
                    AlertType.success,
                    `Twitter handle: ${data.twitter_handle} connected Successful!`
                )
                checkTwitterHandle()
            } else {
                Alert(AlertType.error, `Not Logged in!`)
            }
        } catch (error) {
            // if (error.response && error.response.status === 401) {
            //     return
            // }
            // console.error(error)
        } finally {
            setIsBindnig(false)
        }
    }

    const unbindConnection = async () => {
        setIsBindnig(true)
        try {
            const token = Cookies.get("jwt")
            const response = await fetch("https://api.shillstreet.com/users/unbind_twitter/", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
            const data = await response.json()
            if (data.twitter_handle == null) {
                Alert(AlertType.success, `Twitter handle Unbinded Successful!`)
                setTwitterHandle("")
            }
        } catch (error) {
            // if (error.response && error.response.status === 401) {
            //     return
            // }
            console.error(error)
        } finally {
            setIsBindnig(false)
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
            // if (error.response && error.response.status === 401) {
            //     return
            // }
            console.error(error)
        }
    }
    const checkTwitterHandle = async () => {
        try {
            const response = await fetch("https://api.shillstreet.com/users/checkTwitterBinded/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    walletAddress: address,
                }),
            })
            const data = await response.json()
            console.log(data)
            if (data.is_twitterBinded) {
                setTwitterHandle(data.twitter_handle)
            }
        } catch (error) {
            // if (error.response && error.response.status === 401) {
            //     return
            // }
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
    useEffect(() => {
        checkTwitterHandle()
    }, [address, isBindnig])
    return (
        <div className="flex flex-col justify-center items-center px-14">
            <div className="mt-5 text-twitterBlue border border-white rounded p-3">
                <div className=" mb-5 p-2 ">User Name : {userName}</div>
                <div className=" p-2 ">Email : {email}</div>
                {!!twitterHandle && (<div className="p-2">Twitter Account : {twitterHandle}</div>)}
            </div>
            {!!twitterHandle ? (
                <>
                    <button
                        className={`${space_grotesk_medium.className} flex items-center justify-center text-xs bg-twitterBlue p-2 rounded w-32 h-10 shadow-md hover:bg-blue-600 text-white`}
                        type="submit"
                        onClick={() => unbindConnection()}
                    >
                        {isRequesting ? <Spinner width={20} height={20} /> : "Unbind Twitter"}
                    </button>
                </>
            ) : (
                <div className="flex flex-col jusitfy-center items-center">
                    <button
                        className={`${space_grotesk_medium.className} flex items-center justify-center  mt-6 text-xs bg-twitterBlue p-2 rounded w-32 h-10 shadow-md hover:bg-blue-600 text-white`}
                        type="submit"
                        onClick={() => createConnection()}
                    >
                        {isRequesting ? <Spinner width={20} height={20} /> : "Connect Twitter"}
                    </button>
                    <div className="flex items-center justify-between my-10 ">
                        {isConnecting && (
                            <div className="flex flex-row space-x-3">
                                <input
                                    className="text-black rounded"
                                    placeholder="Your Tweet Link"
                                    onChange={handleEmailChange}
                                ></input>
                                <button
                                    className={`${space_grotesk_medium.className} flex items-center justify-center text-xs bg-twitterBlue p-2 rounded-full w-32 h-10 shadow-md hover:bg-blue-600 text-white`}
                                    type="submit"
                                    onClick={() => bindConnection()}
                                >
                                    {isBindnig ? (
                                        <Spinner width={20} height={20} />
                                    ) : (
                                        "Verify Twitter"
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ConnectTwitterForm
