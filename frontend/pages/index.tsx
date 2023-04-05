import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import {Header} from '../components';

export default function Landing() {
  return (
    <>
        <Header />
      <main className="text-xl h-screen">
        <p className="text-blue-600">Landing...</p>
      </main>
    </>
  )
}
