import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { Header, LandingBox } from "../components";

export default function Landing() {
  return (
    <>
      <Header />
      <main className="h-screen flex items-center justify-center">
        <LandingBox />
      </main>
    </>
  );
}
