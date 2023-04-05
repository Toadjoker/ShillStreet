import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { Header, LandingBox } from "../components";

export default function Landing() {
  return (
    <>
      <Header />
      <main className="h-screen w-full flex items-center justify-center bg-cloudBg bg-cover bg-center bg-no-repeat fixed">
        <LandingBox />
      </main>
    </>
  );
}
