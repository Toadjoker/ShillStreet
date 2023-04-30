import { MainLayout, ConnectTwitterButton } from "../components"
import LoginButton from "../components/LoginButton"
import ConnectTwitterForm from "../components/forms/connectTwitterForm"
import { space_grotesk_medium } from "../utils/customFont"

const AccountSetup = () => {
    return (
        <MainLayout>
            <section className="bg-shillStreetBlue flex flex-col flex-grow px-96 pt-10 overflow-hidden">
                {/* top title card */}
                <div className="bg-shillStreetGrey w-full rounded-xl p-2 px-14 h-14 text-white border-4 border-white">
                    <h3
                        className={`${space_grotesk_medium.className} font-bold text-xl text-center`}
                    >
                        Account Setup
                    </h3>
                </div>

                <div className="bg-shillStreetGrey w-full rounded-xl p-2 px-14 h-1/2 mt-14 text-white border-4 border-white">
                    <LoginButton />
                    <ConnectTwitterForm />
                </div>
            </section>
        </MainLayout>
    )
}

export default AccountSetup
