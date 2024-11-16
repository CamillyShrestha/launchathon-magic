'use client'

import { ArrowLeft, User } from 'lucide-react'
import Link from 'next/link'

interface PatientData {
  id: string
  lastName: string
  firstName: string
  age: number
  score: number
  // Additional fields for the profile page
  dateOfBirth: string
  gender: string
  bloodType: string
  height: number
  weight: number
  allergies: string[]
  medications: string[]
}

export default function PatientProfile() {

  // In a real application, you would fetch the patient data based on the ID
  // For this example, we'll use mock data
  const patientData: PatientData = {
    id: '1',
    lastName: 'Doe',
    firstName: 'John',
    age: 45,
    score: 8,
    dateOfBirth: '1978-05-12',
    gender: 'Male',
    bloodType: 'A+',
    height: 180,
    weight: 75,
    allergies: ['Penicillin', 'Peanuts'],
    medications: ['Lisinopril', 'Metformin']
  }

  return (
    <>
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center">
          <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 rounded-full p-3 mr-4">
                <User className="w-8 h-8 text-blue-500" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  {patientData.lastName}, {patientData.firstName}
                </h1>
                <p className="text-gray-600">Patient ID: {patientData.id}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
                <div className="space-y-3">
                  <p><span className="font-medium">Date of Birth:</span> {patientData.dateOfBirth}</p>
                  <p><span className="font-medium">Age:</span> {patientData.age}</p>
                  <p><span className="font-medium">Gender:</span> {patientData.gender}</p>
                  <p><span className="font-medium">Blood Type:</span> {patientData.bloodType}</p>
                  <p><span className="font-medium">Height:</span> {patientData.height} cm</p>
                  <p><span className="font-medium">Weight:</span> {patientData.weight} kg</p>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Medical Information</h2>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">Allergies:</p>
                    <ul className="list-disc list-inside">
                      {patientData.allergies.map((allergy, index) => (
                        <li key={index}>{allergy}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium">Medications:</p>
                    <ul className="list-disc list-inside">
                      {patientData.medications.map((medication, index) => (
                        <li key={index}>{medication}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Health Score</h2>
              <div className="flex items-center">
                <div className="w-full h-4 bg-gray-200 rounded-full mr-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-orange-200 via-orange-300 to-orange-500 h-4 rounded-full transition-all duration-500 ease-in-out"
                    style={{ width: `${(patientData.score / 11) * 100}%` }}
                  ></div>
                </div>
                <span className="text-lg font-bold text-gray-700">{patientData.score}/11</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    </>
  )
}
