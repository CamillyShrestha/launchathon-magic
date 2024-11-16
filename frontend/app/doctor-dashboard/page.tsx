'use client'

import { useState, useEffect } from 'react'
import { faker } from '@faker-js/faker'
import { User, LogOut } from 'lucide-react'

interface Patient {
  id: string
  lastName: string
  firstName: string
  age: number
  score: number
}

export default function DoctorDashboard() {
  const [patients, setPatients] = useState<Patient[]>([])

  useEffect(() => {
    // Generate random patient data
    const generatedPatients = Array.from({ length: 12 }, () => ({
      id: faker.string.uuid(),
      lastName: faker.person.lastName(),
      firstName: faker.person.firstName(),
      age: faker.number.int({ min: 18, max: 100 }),
      score: faker.number.int({ min: 0, max: 11 })
    }))
    setPatients(generatedPatients)
  }, [])

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Dr. Smith Dashboard</h1>
          <button className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200">
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {patients.map((patient) => (
            <div
              key={patient.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-blue-100 rounded-full p-2">
                    <User className="w-6 h-6 text-blue-500" />
                  </div>
                  <span className="text-sm font-medium text-gray-500">Age: {patient.age}</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {patient.lastName}, {patient.firstName}
                </h2>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">Score</span>
                  <div className="flex items-center">
                    <div className="w-24 h-3 bg-gray-200 rounded-full mr-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-orange-200 via-orange-300 to-orange-500 h-3 rounded-full transition-all duration-500 ease-in-out"
                        style={{ width: `${(patient.score / 11) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-lg font-bold text-gray-700">{patient.score}/11</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4">
                <button className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200">
                  View Profile →
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
