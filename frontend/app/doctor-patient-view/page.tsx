'use client'

import { ArrowLeft, User } from 'lucide-react'
import Link from 'next/link'

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Activity,
  Heart,
  Thermometer,
  Droplet,
  Send,
  Smile,
  Frown,
  Meh,
  MessageSquare,
} from "lucide-react";
import {
  Tooltip,
  TooltipProps,
  LineChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
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
  const [patientHealthData, setPatientHealthData] = useState({
    heartRate: 85,
    bloodPressure: "120/80",
    oxygenLevel: 98,
    temperature: 36.5,
    withdrawalRisk: 0.2,
  });

  const sampleData = [
    {
      HRV: 39.14369397,
      Age: 51,
      Gender: 0,
      PreviousRelapses: 1,
      OxygenLevel: 96.97576753,
      COWS: 2,
    },
    {
      HRV: 59.97345447,
      Age: 21,
      Gender: 1,
      PreviousRelapses: 1,
      OxygenLevel: 96.07995622,
      COWS: 3,
    },
    {
      HRV: 52.82978498,
      Age: 35,
      Gender: 1,
      PreviousRelapses: 3,
      OxygenLevel: 94.91058542,
      COWS: 0,
    },
    {
      HRV: 34.93705286,
      Age: 42,
      Gender: 1,
      PreviousRelapses: 2,
      OxygenLevel: 93.3188049,
      COWS: 4,
    },
    {
      HRV: 44.21399748,
      Age: 64,
      Gender: 1,
      PreviousRelapses: 4,
      OxygenLevel: 91.80535483,
      COWS: 4,
    },
    {
      HRV: 66.51436537,
      Age: 41,
      Gender: 1,
      PreviousRelapses: 2,
      OxygenLevel: 90.25001409,
      COWS: 1,
    },
    {
      HRV: 25.73320757,
      Age: 23,
      Gender: 0,
      PreviousRelapses: 1,
      OxygenLevel: 90.78125379,
      COWS: 2,
    },
    {
      HRV: 45.71087371,
      Age: 51,
      Gender: 0,
      PreviousRelapses: 0,
      OxygenLevel: 90.18855048,
      COWS: 2,
    },
    {
      HRV: 62.65936259,
      Age: 55,
      Gender: 1,
      PreviousRelapses: 3,
      OxygenLevel: 99.89831707,
      COWS: 3,
    },
    {
      HRV: 41.33259598,
      Age: 20,
      Gender: 0,
      PreviousRelapses: 1,
      OxygenLevel: 98.13860023,
      COWS: 3,
    },
    {
      HRV: 43.21113848,
      Age: 36,
      Gender: 1,
      PreviousRelapses: 3,
      OxygenLevel: 91.71068787,
      COWS: 2,
    },
    {
      HRV: 49.05291031,
      Age: 64,
      Gender: 1,
      PreviousRelapses: 0,
      OxygenLevel: 99.28255387,
      COWS: 3,
    },
    {
      HRV: 64.91389626,
      Age: 63,
      Gender: 1,
      PreviousRelapses: 0,
      OxygenLevel: 96.85048681,
      COWS: 3,
    },
    {
      HRV: 43.61098003,
      Age: 53,
      Gender: 0,
      PreviousRelapses: 1,
      OxygenLevel: 90.50359191,
      COWS: 1,
    },
    {
      HRV: 45.5601804,
      Age: 36,
      Gender: 0,
      PreviousRelapses: 4,
      OxygenLevel: 90.29654997,
      COWS: 4,
    },
    {
      HRV: 45.65648724,
      Age: 45,
      Gender: 1,
      PreviousRelapses: 3,
      OxygenLevel: 97.56389177,
      COWS: 4,
    },
    {
      HRV: 72.05930083,
      Age: 64,
      Gender: 0,
      PreviousRelapses: 2,
      OxygenLevel: 92.58983966,
      COWS: 3,
    },
    {
      HRV: 71.86786089,
      Age: 27,
      Gender: 1,
      PreviousRelapses: 2,
      OxygenLevel: 93.89214457,
      COWS: 1,
    },
    {
      HRV: 60.04053898,
      Age: 35,
      Gender: 0,
      PreviousRelapses: 0,
      OxygenLevel: 94.60660413,
      COWS: 4,
    },
    {
      HRV: 53.86186399,
      Age: 21,
      Gender: 1,
      PreviousRelapses: 2,
      OxygenLevel: 95.01318409,
      COWS: 3,
    },
    {
      HRV: 57.37368576,
      Age: 29,
      Gender: 0,
      PreviousRelapses: 3,
      OxygenLevel: 96.37601779,
      COWS: 1,
    },
    {
      HRV: 64.90732028,
      Age: 44,
      Gender: 0,
      PreviousRelapses: 2,
      OxygenLevel: 93.64581274,
      COWS: 2,
    },
    {
      HRV: 40.64166132,
      Age: 46,
      Gender: 1,
      PreviousRelapses: 0,
      OxygenLevel: 92.99459067,
      COWS: 1,
    },
    {
      HRV: 61.75829045,
      Age: 29,
      Gender: 1,
      PreviousRelapses: 2,
      OxygenLevel: 91.14331821,
      COWS: 4,
    },
    {
      HRV: 37.46119332,
      Age: 28,
      Gender: 1,
      PreviousRelapses: 1,
      OxygenLevel: 96.27147469,
      COWS: 1,
    },
    {
      HRV: 43.62248498,
      Age: 21,
      Gender: 0,
      PreviousRelapses: 0,
      OxygenLevel: 93.76482172,
      COWS: 2,
    },
    {
      HRV: 59.07105196,
      Age: 63,
      Gender: 1,
      PreviousRelapses: 3,
      OxygenLevel: 94.0575134,
      COWS: 2,
    },
    {
      HRV: 35.713193,
      Age: 41,
      Gender: 0,
      PreviousRelapses: 1,
      OxygenLevel: 93.91114363,
      COWS: 1,
    },
    {
      HRV: 48.5993128,
      Age: 43,
      Gender: 0,
      PreviousRelapses: 3,
      OxygenLevel: 95.34630428,
      COWS: 0,
    },
    {
      HRV: 41.38245104,
      Age: 45,
      Gender: 1,
      PreviousRelapses: 0,
      OxygenLevel: 91.50579307,
      COWS: 3,
    },
    {
      HRV: 47.44380629,
      Age: 64,
      Gender: 1,
      PreviousRelapses: 2,
      OxygenLevel: 97.94320593,
      COWS: 2,
    },
    {
      HRV: 22.01410895,
      Age: 21,
      Gender: 0,
      PreviousRelapses: 3,
      OxygenLevel: 98.34934364,
      COWS: 4,
    },
    {
      HRV: 32.28466895,
      Age: 53,
      Gender: 1,
      PreviousRelapses: 3,
      OxygenLevel: 92.50125417,
      COWS: 1,
    },
    {
      HRV: 43.00122765,
      Age: 32,
      Gender: 1,
      PreviousRelapses: 4,
      OxygenLevel: 97.53546334,
      COWS: 3,
    },
    {
      HRV: 59.27462432,
      Age: 39,
      Gender: 0,
      PreviousRelapses: 0,
      OxygenLevel: 93.62321572,
      COWS: 1,
    },
    {
      HRV: 48.26364317,
      Age: 41,
      Gender: 0,
      PreviousRelapses: 0,
      OxygenLevel: 94.73099746,
      COWS: 1,
    },
    {
      HRV: 50.02845916,
      Age: 41,
      Gender: 1,
      PreviousRelapses: 0,
      OxygenLevel: 99.84884975,
      COWS: 1,
    },
    {
      HRV: 56.88222711,
      Age: 54,
      Gender: 1,
      PreviousRelapses: 3,
      OxygenLevel: 90.39894151,
      COWS: 4,
    },
    {
      HRV: 41.20463657,
      Age: 22,
      Gender: 0,
      PreviousRelapses: 1,
      OxygenLevel: 94.8845192,
      COWS: 2,
    },
    {
      HRV: 52.83627324,
      Age: 23,
      Gender: 0,
      PreviousRelapses: 0,
      OxygenLevel: 91.42232796,
      COWS: 4,
    },
    {
      HRV: 41.94633482,
      Age: 27,
      Gender: 1,
      PreviousRelapses: 2,
      OxygenLevel: 92.31695331,
      COWS: 2,
    },
    {
      HRV: 32.72330506,
      Age: 20,
      Gender: 0,
      PreviousRelapses: 1,
      OxygenLevel: 94.98044058,
      COWS: 2,
    },
    {
      HRV: 46.09100206,
      Age: 55,
      Gender: 1,
      PreviousRelapses: 3,
      OxygenLevel: 97.88575323,
      COWS: 4,
    },
    {
      HRV: 55.73805862,
      Age: 51,
      Gender: 0,
      PreviousRelapses: 0,
      OxygenLevel: 93.39510557,
      COWS: 3,
    },
    {
      HRV: 53.38589051,
      Age: 23,
      Gender: 0,
      PreviousRelapses: 4,
      OxygenLevel: 95.70111088,
      COWS: 1,
    },
    {
      HRV: 49.88169506,
      Age: 27,
      Gender: 0,
      PreviousRelapses: 0,
      OxygenLevel: 98.55178802,
      COWS: 4,
    },
    {
      HRV: 73.92365266,
      Age: 33,
      Gender: 1,
      PreviousRelapses: 4,
      OxygenLevel: 99.76715294,
      COWS: 1,
    },
    {
      HRV: 54.1291216,
      Age: 46,
      Gender: 0,
      PreviousRelapses: 1,
      OxygenLevel: 91.95447613,
      COWS: 3,
    },
    {
      HRV: 59.78736006,
      Age: 20,
      Gender: 0,
      PreviousRelapses: 3,
      OxygenLevel: 96.89253184,
      COWS: 3,
    },
    {
      HRV: 72.38143338,
      Age: 28,
      Gender: 0,
      PreviousRelapses: 1,
      OxygenLevel: 98.29015985,
      COWS: 2,
    },
    {
      HRV: 37.05914677,
      Age: 54,
      Gender: 0,
      PreviousRelapses: 0,
      OxygenLevel: 99.314283,
      COWS: 2,
    },
    {
      HRV: 39.6121179,
      Age: 21,
      Gender: 0,
      PreviousRelapses: 0,
      OxygenLevel: 97.35057269,
      COWS: 1,
    },
    {
      HRV: 67.43712225,
      Age: 21,
      Gender: 1,
      PreviousRelapses: 1,
      OxygenLevel: 97.47895916,
      COWS: 3,
    },
    {
      HRV: 42.01937265,
      Age: 41,
      Gender: 1,
      PreviousRelapses: 4,
      OxygenLevel: 91.75606213,
      COWS: 2,
    },
    {
      HRV: 50.2968323,
      Age: 45,
      Gender: 0,
      PreviousRelapses: 1,
      OxygenLevel: 97.32139618,
      COWS: 2,
    },
    {
      HRV: 60.69315969,
      Age: 52,
      Gender: 0,
      PreviousRelapses: 4,
      OxygenLevel: 97.35090005,
      COWS: 2,
    },
    {
      HRV: 58.90706391,
      Age: 55,
      Gender: 0,
      PreviousRelapses: 3,
      OxygenLevel: 93.6854751,
      COWS: 1,
    },
    {
      HRV: 67.54886182,
      Age: 41,
      Gender: 0,
      PreviousRelapses: 4,
      OxygenLevel: 98.66617809,
      COWS: 2,
    },
    {
      HRV: 64.95644137,
      Age: 39,
      Gender: 0,
      PreviousRelapses: 0,
      OxygenLevel: 95.54846559,
      COWS: 4,
    },
    {
      HRV: 60.6939267,
      Age: 43,
      Gender: 0,
      PreviousRelapses: 0,
      OxygenLevel: 93.49200503,
      COWS: 1,
    },
    {
      HRV: 42.27291286,
      Age: 35,
      Gender: 0,
      PreviousRelapses: 4,
      OxygenLevel: 99.54948837,
      COWS: 0,
    },
    {
      HRV: 57.94862668,
      Age: 20,
      Gender: 0,
      PreviousRelapses: 0,
      OxygenLevel: 99.05501138,
      COWS: 0,
    },
    {
      HRV: 53.14271995,
      Age: 63,
      Gender: 0,
      PreviousRelapses: 3,
      OxygenLevel: 92.7031164,
      COWS: 2,
    },
    {
      HRV: 36.7373454,
      Age: 28,
      Gender: 0,
      PreviousRelapses: 1,
      OxygenLevel: 92.31096403,
      COWS: 2,
    },
    {
      HRV: 64.17299046,
      Age: 26,
      Gender: 0,
      PreviousRelapses: 4,
      OxygenLevel: 91.87413761,
      COWS: 1,
    },
    {
      HRV: 58.07236535,
      Age: 50,
      Gender: 0,
      PreviousRelapses: 2,
      OxygenLevel: 92.59784187,
      COWS: 0,
    },
    {
      HRV: 50.45490081,
      Age: 43,
      Gender: 0,
      PreviousRelapses: 0,
      OxygenLevel: 91.09496162,
      COWS: 2,
    },
    {
      HRV: 47.66907939,
      Age: 53,
      Gender: 1,
      PreviousRelapses: 0,
      OxygenLevel: 97.28944385,
      COWS: 3,
    },
    {
      HRV: 38.01698855,
      Age: 21,
      Gender: 1,
      PreviousRelapses: 1,
      OxygenLevel: 99.31805584,
      COWS: 3,
    },
    {
      HRV: 51.99524074,
      Age: 19,
      Gender: 0,
      PreviousRelapses: 1,
      OxygenLevel: 95.0094117,
      COWS: 0,
    },
    {
      HRV: 54.68439119,
      Age: 25,
      Gender: 0,
      PreviousRelapses: 4,
      OxygenLevel: 99.67896211,
      COWS: 3,
    },
    {
      HRV: 41.68845016,
      Age: 24,
      Gender: 0,
      PreviousRelapses: 2,
      OxygenLevel: 97.48804568,
      COWS: 2,
    },
    {
      HRV: 61.62204049,
      Age: 53,
      Gender: 1,
      PreviousRelapses: 3,
      OxygenLevel: 97.4120772,
      COWS: 0,
    },
    {
      HRV: 39.02796954,
      Age: 51,
      Gender: 1,
      PreviousRelapses: 2,
      OxygenLevel: 93.84147845,
      COWS: 4,
    },
    {
      HRV: 28.7689965,
      Age: 57,
      Gender: 0,
      PreviousRelapses: 2,
      OxygenLevel: 94.54634969,
      COWS: 3,
    },
    {
      HRV: 60.39727091,
      Age: 36,
      Gender: 1,
      PreviousRelapses: 2,
      OxygenLevel: 95.45741907,
      COWS: 3,
    },
    {
      HRV: 45.96633962,
      Age: 46,
      Gender: 1,
      PreviousRelapses: 3,
      OxygenLevel: 99.34053625,
      COWS: 3,
    },
    {
      HRV: 48.73970415,
      Age: 56,
      Gender: 1,
      PreviousRelapses: 1,
      OxygenLevel: 97.16012415,
      COWS: 4,
    },
    {
      HRV: 41.62483277,
      Age: 23,
      Gender: 1,
      PreviousRelapses: 3,
      OxygenLevel: 97.22514213,
      COWS: 4,
    },
    {
      HRV: 33.94037239,
      Age: 27,
      Gender: 0,
      PreviousRelapses: 1,
      OxygenLevel: 95.68272144,
      COWS: 4,
    },
    {
      HRV: 62.55237375,
      Age: 58,
      Gender: 1,
      PreviousRelapses: 3,
      OxygenLevel: 96.74948975,
      COWS: 3,
    },
    {
      HRV: 43.11131016,
      Age: 59,
      Gender: 1,
      PreviousRelapses: 2,
      OxygenLevel: 94.48013111,
      COWS: 4,
    },
    {
      HRV: 66.60952488,
      Age: 22,
      Gender: 1,
      PreviousRelapses: 3,
      OxygenLevel: 97.34419907,
      COWS: 1,
    },
    {
      HRV: 58.07308186,
      Age: 41,
      Gender: 1,
      PreviousRelapses: 1,
      OxygenLevel: 99.04017165,
      COWS: 4,
    },
    {
      HRV: 46.85241853,
      Age: 58,
      Gender: 0,
      PreviousRelapses: 1,
      OxygenLevel: 90.80221841,
      COWS: 2,
    },
    {
      HRV: 39.14097599,
      Age: 39,
      Gender: 1,
      PreviousRelapses: 0,
      OxygenLevel: 92.00156926,
      COWS: 2,
    },
    {
      HRV: 42.67538013,
      Age: 43,
      Gender: 0,
      PreviousRelapses: 0,
      OxygenLevel: 91.38114158,
      COWS: 0,
    },
    {
      HRV: 37.87476869,
      Age: 54,
      Gender: 1,
      PreviousRelapses: 2,
      OxygenLevel: 90.74984408,
      COWS: 2,
    },
    {
      HRV: 70.8711336,
      Age: 62,
      Gender: 0,
      PreviousRelapses: 3,
      OxygenLevel: 94.5739943,
      COWS: 1,
    },
    {
      HRV: 51.6444123,
      Age: 46,
      Gender: 1,
      PreviousRelapses: 2,
      OxygenLevel: 92.99197838,
      COWS: 2,
    },
    {
      HRV: 61.50205543,
      Age: 53,
      Gender: 1,
      PreviousRelapses: 1,
      OxygenLevel: 96.26460391,
      COWS: 3,
    },
    {
      HRV: 37.32647951,
      Age: 37,
      Gender: 1,
      PreviousRelapses: 3,
      OxygenLevel: 95.25822652,
      COWS: 4,
    },
    {
      HRV: 51.8103513,
      Age: 35,
      Gender: 1,
      PreviousRelapses: 2,
      OxygenLevel: 91.49044343,
      COWS: 0,
    },
    {
      HRV: 61.77861939,
      Age: 57,
      Gender: 0,
      PreviousRelapses: 2,
      OxygenLevel: 97.70833534,
      COWS: 4,
    },
    {
      HRV: 46.64989238,
      Age: 62,
      Gender: 0,
      PreviousRelapses: 1,
      OxygenLevel: 91.33575085,
      COWS: 4,
    },
    {
      HRV: 60.31114459,
      Age: 58,
      Gender: 1,
      PreviousRelapses: 1,
      OxygenLevel: 97.63036423,
      COWS: 2,
    },
    {
      HRV: 39.15432088,
      Age: 32,
      Gender: 0,
      PreviousRelapses: 2,
      OxygenLevel: 97.55604083,
      COWS: 2,
    },
    {
      HRV: 36.36528455,
      Age: 32,
      Gender: 1,
      PreviousRelapses: 4,
      OxygenLevel: 94.798712,
      COWS: 1,
    },
    {
      HRV: 53.79400612,
      Age: 41,
      Gender: 0,
      PreviousRelapses: 4,
      OxygenLevel: 93.66866451,
      COWS: 3,
    },
    {
      HRV: 46.20823565,
      Age: 46,
      Gender: 1,
      PreviousRelapses: 2,
      OxygenLevel: 94.98051317,
      COWS: 3,
    },
    {
      HRV: 63.40243073,
      Age: 32,
      Gender: 1,
      PreviousRelapses: 0,
      OxygenLevel: 98.25503915,
      COWS: 3,
    },
    {
      HRV: 40.04075211,
      Age: 51,
      Gender: 1,
      PreviousRelapses: 2,
      OxygenLevel: 91.65837978,
      COWS: 2,
    },
    {
      HRV: 33.80314585,
      Age: 69,
      Gender: 1,
      PreviousRelapses: 4,
      OxygenLevel: 97.73997129,
      COWS: 2,
    },
    {
      HRV: 79.14247713,
      Age: 31,
      Gender: 1,
      PreviousRelapses: 4,
      OxygenLevel: 97.11615029,
      COWS: 1,
    },
    {
      HRV: 70.85812197,
      Age: 56,
      Gender: 1,
      PreviousRelapses: 1,
      OxygenLevel: 92.42264963,
      COWS: 2,
    },
    {
      HRV: 78.37596239,
      Age: 43,
      Gender: 0,
      PreviousRelapses: 1,
      OxygenLevel: 93.65963255,
      COWS: 1,
    },
    {
      HRV: 79.25596926,
      Age: 69,
      Gender: 0,
      PreviousRelapses: 0,
      OxygenLevel: 98.40803848,
      COWS: 0,
    },
    {
      HRV: 59.93484272,
      Age: 69,
      Gender: 1,
      PreviousRelapses: 1,
      OxygenLevel: 90.36456352,
      COWS: 3,
    },
    {
      HRV: 22.92615935,
      Age: 53,
      Gender: 0,
      PreviousRelapses: 2,
      OxygenLevel: 97.63083396,
      COWS: 0,
    },
    {
      HRV: 57.15904513,
      Age: 24,
      Gender: 1,
      PreviousRelapses: 0,
      OxygenLevel: 97.15334635,
      COWS: 4,
    },
    {
      HRV: 22.90868242,
      Age: 65,
      Gender: 1,
      PreviousRelapses: 1,
      OxygenLevel: 95.8058045,
      COWS: 3,
    },
    {
      HRV: 53.80417874,
      Age: 63,
      Gender: 0,
      PreviousRelapses: 5,
      OxygenLevel: 90.41810316,
      COWS: 3,
    },
    {
      HRV: 64.82347277,
      Age: 55,
      Gender: 1,
      PreviousRelapses: 5,
      OxygenLevel: 96.72513294,
      COWS: 4,
    },
    {
      HRV: 76.32522808,
      Age: 44,
      Gender: 1,
      PreviousRelapses: 1,
      OxygenLevel: 91.8485303,
      COWS: 1,
    },
    {
      HRV: 73.11801182,
      Age: 42,
      Gender: 0,
      PreviousRelapses: 3,
      OxygenLevel: 96.17231624,
      COWS: 3,
    },
    {
      HRV: 74.1018183,
      Age: 67,
      Gender: 1,
      PreviousRelapses: 3,
      OxygenLevel: 97.9620471,
      COWS: 3,
    },
    {
      HRV: 41.04260266,
      Age: 69,
      Gender: 1,
      PreviousRelapses: 0,
      OxygenLevel: 92.41578394,
      COWS: 2,
    },
    {
      HRV: 79.3733823,
      Age: 30,
      Gender: 0,
      PreviousRelapses: 1,
      OxygenLevel: 92.74779822,
      COWS: 0,
    },
    {
      HRV: 23.68347025,
      Age: 48,
      Gender: 0,
      PreviousRelapses: 1,
      OxygenLevel: 99.79745143,
      COWS: 0,
    },
    {
      HRV: 22.22452024,
      Age: 53,
      Gender: 1,
      PreviousRelapses: 3,
      OxygenLevel: 92.73491355,
      COWS: 4,
    },
    {
      HRV: 66.92554,
      Age: 33,
      Gender: 1,
      PreviousRelapses: 0,
      OxygenLevel: 96.86291634,
      COWS: 3,
    },
    {
      HRV: 62.72193464,
      Age: 37,
      Gender: 1,
      PreviousRelapses: 2,
      OxygenLevel: 96.40243712,
      COWS: 4,
    },
    {
      HRV: 76.83034092,
      Age: 50,
      Gender: 0,
      PreviousRelapses: 4,
      OxygenLevel: 90.35507607,
      COWS: 3,
    },
    {
      HRV: 48.44952353,
      Age: 69,
      Gender: 1,
      PreviousRelapses: 4,
      OxygenLevel: 94.77871589,
      COWS: 4,
    },
    {
      HRV: 57.94250445,
      Age: 60,
      Gender: 1,
      PreviousRelapses: 3,
      OxygenLevel: 99.18563277,
      COWS: 1,
    },
    {
      HRV: 70.33199057,
      Age: 20,
      Gender: 1,
      PreviousRelapses: 4,
      OxygenLevel: 95.71563992,
      COWS: 1,
    },
    {
      HRV: 74.12427733,
      Age: 29,
      Gender: 0,
      PreviousRelapses: 1,
      OxygenLevel: 95.90208385,
      COWS: 4,
    },
    {
      HRV: 23.8821807,
      Age: 68,
      Gender: 0,
      PreviousRelapses: 2,
      OxygenLevel: 95.09047263,
      COWS: 4,
    },
    {
      HRV: 30.95267695,
      Age: 47,
      Gender: 1,
      PreviousRelapses: 1,
      OxygenLevel: 94.57946871,
      COWS: 4,
    },
    {
      HRV: 42.68535143,
      Age: 57,
      Gender: 0,
      PreviousRelapses: 3,
      OxygenLevel: 91.32419415,
      COWS: 4,
    },
    {
      HRV: 43.55699088,
      Age: 55,
      Gender: 1,
      PreviousRelapses: 4,
      OxygenLevel: 90.79806732,
      COWS: 0,
    },
    {
      HRV: 53.69168307,
      Age: 31,
      Gender: 1,
      PreviousRelapses: 5,
      OxygenLevel: 92.85472499,
      COWS: 1,
    },
    {
      HRV: 78.15278394,
      Age: 18,
      Gender: 1,
      PreviousRelapses: 2,
      OxygenLevel: 97.74395361,
      COWS: 0,
    },
    {
      HRV: 47.4724754,
      Age: 55,
      Gender: 1,
      PreviousRelapses: 2,
      OxygenLevel: 94.14832174,
      COWS: 0,
    },
    {
      HRV: 68.6230815,
      Age: 48,
      Gender: 0,
      PreviousRelapses: 4,
      OxygenLevel: 92.10904426,
      COWS: 1,
    },
    {
      HRV: 29.0867635,
      Age: 18,
      Gender: 0,
      PreviousRelapses: 2,
      OxygenLevel: 90.88127693,
      COWS: 0,
    },
    {
      HRV: 63.27258141,
      Age: 42,
      Gender: 0,
      PreviousRelapses: 0,
      OxygenLevel: 91.91350103,
      COWS: 0,
    },
    {
      HRV: 44.80998921,
      Age: 43,
      Gender: 0,
      PreviousRelapses: 4,
      OxygenLevel: 92.97451565,
      COWS: 0,
    },
    {
      HRV: 26.48039181,
      Age: 46,
      Gender: 0,
      PreviousRelapses: 4,
      OxygenLevel: 90.864615,
      COWS: 2,
    },
    {
      HRV: 26.59282873,
      Age: 27,
      Gender: 0,
      PreviousRelapses: 0,
      OxygenLevel: 99.47939722,
      COWS: 0,
    },
    {
      HRV: 60.66755589,
      Age: 32,
      Gender: 1,
      PreviousRelapses: 5,
      OxygenLevel: 99.76167513,
      COWS: 0,
    },
    {
      HRV: 64.87789078,
      Age: 36,
      Gender: 1,
      PreviousRelapses: 4,
      OxygenLevel: 94.09471675,
      COWS: 3,
    },
    {
      HRV: 73.33218186,
      Age: 66,
      Gender: 0,
      PreviousRelapses: 2,
      OxygenLevel: 99.41212058,
      COWS: 0,
    },
    {
      HRV: 34.97802681,
      Age: 55,
      Gender: 0,
      PreviousRelapses: 1,
      OxygenLevel: 96.50438457,
      COWS: 1,
    },
    {
      HRV: 37.46242548,
      Age: 63,
      Gender: 0,
      PreviousRelapses: 3,
      OxygenLevel: 99.02204078,
      COWS: 1,
    },
    {
      HRV: 42.90686648,
      Age: 68,
      Gender: 0,
      PreviousRelapses: 5,
      OxygenLevel: 97.09081131,
      COWS: 0,
    },
    {
      HRV: 65.31688636,
      Age: 70,
      Gender: 0,
      PreviousRelapses: 1,
      OxygenLevel: 95.68782156,
      COWS: 4,
    },
    {
      HRV: 31.46657503,
      Age: 18,
      Gender: 0,
      PreviousRelapses: 5,
      OxygenLevel: 92.80632998,
      COWS: 4,
    },
    {
      HRV: 28.44664314,
      Age: 38,
      Gender: 0,
      PreviousRelapses: 2,
      OxygenLevel: 99.01703364,
      COWS: 1,
    },
    {
      HRV: 23.58506523,
      Age: 64,
      Gender: 0,
      PreviousRelapses: 3,
      OxygenLevel: 95.73894907,
      COWS: 1,
    },
  ];

  const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
    active,
    payload,
    label,
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/10 backdrop-blur-lg p-2 rounded">
          <p className="label">{`Time: ${label}`}</p>
          <p className="data">{`Risk: ${
            payload[0]?.value ? (payload[0].value * 50).toFixed(1) : "N/A"
          }%`}</p>
        </div>
      );
    }
    return null;
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const predictIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [riskHistory, setRiskHistory] = useState([
    { time: "0m", risk: 0.2 },
    { time: "5m", risk: 0.25 },
    { time: "10m", risk: 0.22 },
    { time: "15m", risk: 0.28 },
    { time: "20m", risk: 0.2 },
  ]);
  const predictRisk = async () => {
    if (currentIndex >= sampleData.length) {
      // Data has run out; stop the interval
      if (predictIntervalRef.current) {
        // Check if current is not null
        clearInterval(predictIntervalRef.current);
      }
      return;
    }

    setIsLoading(true);

    try {
      // Get the next data point
      const dataToSend = sampleData[currentIndex];

      // Make API call to the backend
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();

      const newRisk = result.risk_score; // Assuming the backend returns {'risk_score': value}

      // Update patientData
      setPatientHealthData((prevData) => ({
        ...prevData,
        heartRate: dataToSend.HRV,
        oxygenLevel: dataToSend.OxygenLevel,
        // Update other vital signs as needed
        withdrawalRisk: newRisk,
      }));

      // Update riskHistory
      setRiskHistory((prevHistory) => [
        ...prevHistory,
        { time: `${currentIndex * 5}m`, risk: newRisk },
      ]);

      // Move to the next data point
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } catch (error) {
      console.error("Error fetching prediction:", error);
      // Handle error (e.g., show notification)
    }

    setIsLoading(false);
  };

  useEffect(() => {
    predictRisk(); // Call once immediately

    predictIntervalRef.current = setInterval(() => {
      predictRisk();
    }, 5000); // Update every 5 seconds

    // Cleanup function
    return () => {
      if (predictIntervalRef.current) {
        // Check if current is defined
        clearInterval(predictIntervalRef.current);
      }
    };
  }, []);

  
  return (
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
            <Card
            className="bg-white/10 w-3/4 backdrop-blur-lg border-gray-400 mx-auto text-black 
hover:bg-white/20 transition-all mt-8 duration-300
shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]
hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]
hover:-translate-y-1 hover:translate-x-1
rounded-xl"
          >
            <CardHeader>
              <CardTitle className="text-stone-800">
                Predicted Withdrawal Risk
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold text-stone-800 text-center mb-4">
                {(patientHealthData.withdrawalRisk * 50).toFixed(1)}%
              </div>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={riskHistory}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.1)"
                    />
                    <XAxis dataKey="time" stroke="rgba(0,0,0,0.5)" />
                    <YAxis
                      stroke="rgba(0,0,0,0.5)"
                      domain={[0, 0.5]}
                      tickFormatter={(value) => `${(value * 50).toFixed(0)}%`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="risk"
                      stroke="#8884d8"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              {/* <div className="mt-4 text-center">
                <Button onClick={predictRisk} disabled={isLoading} 
                  className="bg-white text-purple-600 hover:bg-purple-100 transition-all duration-300">
                  {isLoading ? 'Updating...' : 'Update Risk'}
                </Button>
              </div> */}
            </CardContent>
          </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
