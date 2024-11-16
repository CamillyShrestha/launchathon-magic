import Link from 'next/link'
import { LinkIcon } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-4">
        <Link href="/patient-dashboard" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
          <LinkIcon className="mr-2" size={16} />
          Patient
        </Link>
        <Link href="/admin-dashboard" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center">
          <LinkIcon className="mr-2" size={16} />
          Administrator
        </Link>
        <Link href="/doctor-dashboard" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center">
          <LinkIcon className="mr-2" size={16} />
          Doctor
        </Link>
      </div>
    </div>
  )
}
