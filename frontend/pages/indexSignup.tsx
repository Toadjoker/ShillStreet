import { MainLayout, Paper } from "../components"
import { SignUpForm } from "../components/forms"

export default function Index() {
    return (
        <MainLayout>
            <section className="flex flex-col flex-grow w-full items-center justify-center bg-cloudBg bg-cover bg-center bg-no-repeat">
                <Paper>
                    <SignUpForm />
                </Paper>
            </section>
        </MainLayout>
    )
}
