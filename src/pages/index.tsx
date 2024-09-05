import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Button, buttonVariants } from '@/components/ui/button'
import { useState } from 'react'
import Link from 'next/link'
import { getRangeYears } from '@/utils/getRangeYears'
import { GetStaticProps } from 'next'

type Vehicle = {
  MakeId: string
  MakeName: string
  VehicleTypeId: number
  VehicleTypeName: string
}

export default function FilterPage(props: { vehicles: Vehicle[] }) {
  const [selectedVehicleId, setSelectedVehicleId] = useState('')
  const [selectedYear, setSelectedYear] = useState('')

  function generateHref() {
    if (selectedVehicleId && selectedYear) {
      return `/result/${selectedVehicleId}/${selectedYear}`
    }
    return ''
  }

  return (
    <div className="container min-h-screen grid place-content-center mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6">Find your next car</h1>

        <div className="space-y-4">
          <div>
            <Label htmlFor="type" className="block font-medium mb-2">
              Type
            </Label>
            <Select
              onValueChange={(value) => setSelectedVehicleId(value)}
              value={selectedVehicleId}
            >
              <SelectTrigger id="type">
                <SelectValue placeholder="Select the type" />
              </SelectTrigger>
              <SelectContent>
                {props.vehicles.map((vehicle: Vehicle) => (
                  <SelectItem
                    key={vehicle.MakeId}
                    value={vehicle.MakeId.toString()}
                  >
                    {vehicle.MakeName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="year" className="block font-medium mb-2">
              Year
            </Label>
            <Select
              onValueChange={(value) => setSelectedYear(value)}
              value={selectedYear}
            >
              <SelectTrigger id="year">
                <SelectValue placeholder="Select the year" />
              </SelectTrigger>
              <SelectContent>
                {getRangeYears(2015).map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            asChild
            className={`w-full ${buttonVariants({ variant: 'default' })} ${selectedVehicleId && selectedYear ? '' : 'opacity-50 cursor-not-allowed'}`}
            type="submit"
          >
            <Link href={generateHref()}>Next</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/vehicles/GetMakesForVehicleType/car?format=json`,
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch vehicles: ${response.status}`)
    }

    const data = await response.json()
    const vehicles = data.Results

    return {
      props: {
        vehicles,
      },
      revalidate: 60 * 60 * 24,
    }
  } catch (error) {
    console.error('Error fetching vehicle types:', error)
    return {
      props: {
        vehicles: [],
      },
      revalidate: 60 * 60 * 24,
    }
  }
}
