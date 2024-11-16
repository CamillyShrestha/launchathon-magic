import { Link } from 'lucide-react'
import React from 'react'

const page = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-4">
        <Link to="/patient-dashboard" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Patient
        </Link>
        <Link to="/admin-dashboard" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Administrator
        </Link>
      </div>
    </div>
  )
}

export default page