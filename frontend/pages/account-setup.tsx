import { MainLayout, ConnectTwitterButton } from "../components"
import LoginButton from "../components/LoginButton"
import ConnectTwitterForm from "../components/forms/connectTwitterForm"
import { space_grotesk_medium } from "../utils/customFont"
import { useState } from "react"
import { LoginType } from "../utils/types"
import SignUpForm from "../components/forms/signupForm"
const AccountSetup = () => {
    const [state, setState] = useState<string>("")
    return (
        <MainLayout>
            <section className="bg-shillStreetBlue flex flex-col flex-grow px-96 pt-10 overflow-hidden">
                {/* top title card */}
                <div className="bg-shillStreetGrey w-full rounded-xl p-2 px-14 h-14 text-white border-4 border-white mb-10">
                    <h3
                        className={`${space_grotesk_medium.className} font-bold text-xl text-center`}
                    >
                        Account Setup
                    </h3>
                </div>

                <div className="flex flex-col items-center justify-center ">
                    <div className="bg-shillStreetGrey flex items-center rounded-xl p-2 px-14 text-white border-4 border-white">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2 ml-12 mr-12"
                            onClick={() => setState("login")}
                        >
                            Login
                        </button>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2 ml-12 mr-12"
                            onClick={() => setState("signup")}
                        >
                            Signup
                        </button>
                    </div>
                </div>

                {state != "" &&
                    (state === "login" ? (
                        <div className="bg-shillStreetGrey w-full rounded-xl p-2 px-14 h-1/2 mt-14 text-white border-4 border-white">
                            <LoginButton />
                            <ConnectTwitterForm />
                        </div>
                    ) : (
                        <div className="bg-shillStreetGrey w-full rounded-xl p-2 px-14 h-1/3 mt-14 text-white border-4 border-white">
                            <SignUpForm />
                        </div>
                    ))}
            </section>
        </MainLayout>
    )
}

export default AccountSetup
