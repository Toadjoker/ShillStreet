import { MainLayout, Paper } from "../components"
import { SignUpForm } from "../components/forms"

const Signup = () => {
    return (
        <MainLayout>
            <section className="bg-shillStreetBlue flex flex-col flex-grow w-full items-center justify-center">
                <Paper>
                    <SignUpForm />
                </Paper>
            </section>
        </MainLayout>
    )
}

export default Signup
