import { Card } from '@/components/ui/card'
import { getRangeYears } from '@/utils/getRangeYears'
import { CarIcon } from 'lucide-react'
import { GetStaticPaths, GetStaticProps } from 'next'

type VehicleModel = {
  Make_ID: number
  Make_Name: string
  Model_ID: number
  Model_Name: string
}

type ResultProps = {
  models: VehicleModel[]
  error?: string
}

export default function ResultPage({ models, error }: ResultProps) {
  if (error) {
    return (
      <div className="container grid place-content-center mx-auto px-4 py-12">
        <p className="text-center text-destructive">{error}</p>
      </div>
    )
  }

  return (
    <div className="container flex flex-wrap gap-4 items-center justify-center mx-auto px-4 py-12">
      {models.map((model) => (
        <Card key={model.Model_ID} className="w-full max-w-md p-6 grid gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-muted rounded-md flex items-center justify-center aspect-square w-12">
              <CarIcon className="w-6 h-6" />
            </div>
            <div className="grid gap-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">Make ID:</span>
                <span className="text-muted-foreground">{model.Make_ID}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Make Name:</span>
                <span className="text-muted-foreground">{model.Make_Name}</span>
              </div>
            </div>
          </div>
          <div className="grid gap-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">Model ID:</span>
              <span className="text-muted-foreground">{model.Model_ID}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Model Name:</span>
              <span className="text-muted-foreground">{model.Model_Name}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/vehicles/GetMakesForVehicleType/car?format=json`,
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch vehicles: ${response.status}`)
    }

    const data = await response.json()
    const vehicles = data.Results

    const years = getRangeYears(2015).map((year) => year.toString())

    const paths = vehicles.flatMap((vehicle: { MakeId: string }) =>
      years.map((year) => ({
        params: {
          makeId: vehicle.MakeId.toString(),
          year,
        },
      })),
    )

    return {
      paths,
      fallback: 'blocking',
    }
  } catch (error) {
    console.error('Error fetching vehicle types:', error)
    return {
      paths: [],
      fallback: 'blocking',
    }
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { makeId, year } = params!

  try {
    const response = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`,
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch models: ${response.status}`)
    }

    const data = await response.json()

    if (!data.Results || data.Results.length === 0) {
      return {
        notFound: true,
      }
    }

    return {
      props: {
        models: data.Results,
      },
      revalidate: 60 * 60 * 24,
    }
  } catch (error) {
    console.error('Error fetching vehicle models:', error)

    return {
      props: {
        models: [],
        error:
          'There was an error fetching vehicle models. Please try again later.',
      },
      revalidate: 60 * 60 * 24,
    }
  }
}
