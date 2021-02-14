import React from "react";
import { useParams } from "react-router-dom";
import { countryService } from "infraestructure/services";
import { Loader } from "application/components";

const getListAsString = (records: { name: string }[]) =>
  records.map(({ name }: { name: string }) => name).join(", ");

const CountryDetail = () => {
  const { id }: { id: string } = useParams();
  const { status, data, error, isFetching } = countryService.useCountry(id);

  console.log(id);
  return status === "loading" ? (
    <Loader />
  ) : (
    <div className="flex flex-col justify-center items-center max-w-sm mx-auto my-8">
      <div
        style={{
          backgroundImage: `url(${data.flag.svgFile})`,
        }}
        className="bg-gray-300 h-64 w-full rounded-lg shadow-md bg-cover bg-center"
      ></div>
      <div className="w-56 md:w-64 bg-white -mt-10 shadow-lg rounded-lg overflow-hidden">
        <h1 className="text-gray-900 font-bold text-2xl uppercase text-center py-2 tracking-wide">
          {" "}
          {data.name} ({data.alpha2Code}-{data.alpha3Code})
        </h1>
        <div className="px-4 py-2 bg-gray-200">
          <p className="text-gray-600 text-sm mt-1">
            Native name: {data.nativeName}
          </p>
          <p className="text-gray-600 text-sm mt-1">Capital: {data.capital}</p>
          <p className="text-gray-600 text-sm mt-1">
            Official Languages: {getListAsString(data.officialLanguages)}
          </p>
          <p className="text-gray-600 text-sm mt-1">
            Population Density: {data.populationDensity}
          </p>
          <p className="text-gray-600 text-sm mt-1">
            Sub Region: {data.subregion.name}
          </p>
          <p className="text-gray-600 text-sm mt-1">
            Currencies: {getListAsString(data.currencies)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
