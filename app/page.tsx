import { CustomFilter, Hero, SearchBar } from "@/components";
import CarCard from "@/components/CarCard";
import ShowMore from "@/components/ShowMore";
import { fuels, yearsOfProduction } from "@/constants";
import { FilterProps } from "@/types";
import { fetchCars } from "@/utils";

export default async function Home({ searchParams }: {searchParams: FilterProps}) {
  const { manufacturer, year, fuel, limit, model } = await searchParams
  const allCars = await fetchCars({ 
    manufacturer: manufacturer || '',
    year: year || 2022,
    fuel: fuel || '',
    limit: limit || 4,
    model: model || '',
  })

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;



  return (
    <main className="overflow-hidden">
        <Hero />

        <div className="mt-12 padding-x padding-y max-width" id="discover">
          <div className="home__text-container">
            <h1 className="text-4xl font-entrabold">
              Car Catalogue
            </h1>
            <p>Eplore the cars you might like</p>
          </div>

          <div className="home__filters">
            <SearchBar />

            <div className="home__filter-container">
              <CustomFilter title="fuel" options={fuels} />
              <CustomFilter title="year" options={yearsOfProduction} />
            </div>
          </div>

          {!isDataEmpty ? (
            <section className="">
              <div className="home__cars-wrapper">
                {allCars?.map((car, idx) => (
                  <CarCard car={car} key={idx} />
                ))}
              </div>

              <ShowMore 
                pageNumber={(limit || 4) / 4}
                isNext={(limit || 4) > allCars.length}
              />
            </section>
          ) : (
            <div className="home__error-container">
              <h2 className="text-black text-xl font-bold">No cars found</h2>
              <p>{allCars?.message}</p>
            </div>
          )}

        </div>
    </main>
  );
}
