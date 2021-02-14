import React, { useState, useMemo, useEffect } from "react";
import QuickSearch from "./QuickSearch";
import CountryCardPreview from "./CountryCardPreview";
import { countryService, commonService } from "infraestructure/services";
import { Loader } from "application/components";
import { useNotification } from "application/hooks";

// TODO: Dinamic type
const transformResponse = (records: any, key: string = "name") => {
  return records
    ? records.map((v: any) => ({
        value: v[key],
        label: v[key],
      }))
    : [];
};

const CountryList = () => {
  const [filterText, setFilterText] = useState<{
    filterSearchValue?: string | undefined;
    selectedFilters?: any | null;
  }>({
    filterSearchValue: "",
    selectedFilters: null,
  });
  const notify = useNotification();
  const { status, data: countriesData, error } = countryService.useCountries({
    filterSearchValue: filterText?.filterSearchValue,
    selectedFilters: filterText?.selectedFilters,
  });

// TODO: Export to customHook
  const {
    status: currenciesStatus,
    data: currenciesData,
    error: currenciesError,
  } = commonService.useCurrencies();
  const {
    status: languagesStatus,
    data: languagesData,
    error: languagesError,
  } = commonService.useLanguages();
  const {
    status: regionsStatus,
    data: regionsData,
    error: regionsError,
  } = commonService.useRegions();

  const currencyOptions = useMemo(
    () =>
      transformResponse(currenciesData, "code")
        .filter(({ label }: { label: string }) => {
          return label !== null && label !== "(none)";
        })
        .filter(
          (v: any, i: any, a: any) =>
            a.findIndex((t: any) => t.value === v.value) === i
        ),
    [currenciesData]
  );
  const languageOptions = useMemo(() => transformResponse(languagesData), [
    languagesData,
  ]);
  const regionOptions = useMemo(() => transformResponse(regionsData), [
    regionsData,
  ]);
  
  useEffect(()=> {
    if(currenciesError || languagesError || regionsError || error) {
      notify.success({
        title: "Error broo",
        message:  "Upsiiii error broooo :c"
      });
    }
    
  }, [currenciesError,languagesError, regionsError, error])
  return (
    <section>
      <QuickSearch
        handleFilterOnChange={setFilterText}
        currencyOptions={currencyOptions}
        languageOptions={languageOptions}
        regionOptions={regionOptions}
      />
      {status === "loading" ||
      currenciesStatus === "loading" ||
      languagesStatus === "loading" ||
      regionsStatus === "loading" ? (
        <Loader />
      ) : (
        <>
          {countriesData ? countriesData.map(
            ({ name, nativeName, flag, alpha2Code, _id }: any) => (
              <CountryCardPreview
                key={_id}
                name={name}
                _id={_id}
                nativeName={nativeName}
                flag={flag}
                alpha2Code={alpha2Code}
              />
            )
          ): "Uhmmm..... algo esta raro "}
        </>
      )}
    </section>
  );
};

export default CountryList;
