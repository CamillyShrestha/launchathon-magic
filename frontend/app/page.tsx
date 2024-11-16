import Link from 'next/link'
import { UserCircle, ShieldCheck, Stethoscope } from 'lucide-react'
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-orange-100 p-8 flex flex-col justify-center items-center">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-orange-800 mb-4">
          Welcome to Prevene.ai
        </h1>
        <p className="text-xl md:text-2xl text-orange-700">
          An AI-based withdrawal prevention and intervention support system
        </p>
      </div>
      <div className="flex flex-col gap-6 w-full max-w-md">
        <Link
          href="/patient-dashboard"
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out flex items-center justify-center"
        >
          <UserCircle className="mr-3" size={24} />
          Patient Dashboard
        </Link>
        <Link
          href="/doctor-dashboard"
          className="bg-orange-700 hover:bg-orange-800 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out flex items-center justify-center"
        >
          <Stethoscope className="mr-3" size={24} />
          Doctor Dashboard
        </Link>
      </div>
    </div>
  )
}