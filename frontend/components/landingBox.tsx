import React, { useState } from "react"
import Image from "next/image"
import { press_start_2P } from "../utils/customFont"
import { useForm, SubmitHandler } from "react-hook-form"
import { waitListRequest } from "../utils/apiRequests"
import { WaitListType } from "../utils/types"
import { Spinner, Alert, AlertType } from "./"

type Inputs = {
    email: string
}

const LandingBox = () => {
    const [requesting, setReqesting] = useState<boolean>(false)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<WaitListType> = async (data) => {
        setReqesting(true)
        await waitListRequest
            .post("/users/join_waitlist", data)
            .then((response: any) => {
                if (response) {
                    reset() // clear form input when submit is successful
                    Alert(AlertType.success, "You have been added to the wait list!")
                }
            })
            .catch((error: any) => {
                if (error.response) Alert(AlertType.error, error.response?.data?.email[0])
            })
            .finally(() => setReqesting(false))
    }

    return (
        <section className="flex flex-col items-center justify-center -mt-28 md:-mt-auto">
            <h2
                className={`${press_start_2P.className} mx-10 md:mx-0 md:w-1/2 text-center text-sm md:text-xl text-gray-600 leading-6 md:leading-loose`}
            >
                The Web3 Marketing Platform - Empowering Threadors and Automating Marketing
                Campaigns for Web3 Protocols
            </h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col items-center justify-start w-2/5 h-1/2"
            >
                {/* image and button section */}
                <div className="flex flex-col items-center justify-center mb-3">
                    <div className="rounded-full w-40 h-40 flex items-center justify-center mb-5 overflow-hidden">
                        <Image
                            src="/images/whiteBird.svg"
                            alt="bird-logo"
                            width={400}
                            height={400}
                            unoptimized={true}
                        />
                    </div>
                </div>

                {/* instruction text and input field section */}
                <div className="my-10 space-y-3">
                    <p
                        className={`${press_start_2P.className} text-center text-gray-600 text-xs md:text-sm leading-7`}
                    >
                        Provide Email For Private Beta
                    </p>
                    <div className="h_line"></div>
                    <input
                        type="email"
                        placeholder="youremail@example.com"
                        className={`${press_start_2P.className} text-xs w-full h-14 md:h-12 rounded-sm p-4 text-gray-500 border-2 border-gray-400`}
                        {...register("email", { required: "This field is required" })}
                    />

                    {errors.email && (
                        <span className="text-red-400 text-center">{errors.email?.message}</span>
                    )}
                </div>
                <button
                    className={`${press_start_2P.className} flex items-center justify-center text-sm bg-blue-500 p-2 rounded-full w-40 h-14 shadow-md hover:bg-blue-600 text-white`}
                    type="submit"
                >
                    {requesting ? <Spinner width={20} height={20} /> : "Submit"}
                </button>
            </form>
        </section>
    )
}

export default LandingBox
