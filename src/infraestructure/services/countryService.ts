import { request, gql } from "graphql-request";
import { useQuery } from "react-query";

const endpoint = "https://countries-274616.ew.r.appspot.com";

const filterMappers: any = {
  currency: (value: string) => (`{ currencies: { code: "${value}" } },`),
  region: (value: string) => (`{ subregion: { name: "${value}" } },`),
};
const buildCountriesGraphQuery = (selectedFilters: any ) => {
  let str="";
  const entries = Object.entries(selectedFilters);
    for (const [key, value] of entries) {
      if (value) {
        str += filterMappers[key](value)
      }
    }
  return str
}
const filterByAll = (condition?: string | undefined, filters?: any) => gql`
query {
  Country(filter: { 
    OR: [{ alpha2Code: "${condition}" }, { name: "${condition}" }]
    AND: [
        ${buildCountriesGraphQuery(filters)}
      ] 
    }) {
    _id
    name
    nativeName
    alpha2Code
    alpha3Code
    populationDensity
    capital
    subregion {
      name
    }
    officialLanguages {
      name
    }
    currencies {
      name
    }
    flag {
      svgFile
    }
  }
}
`;
const filterOnlyBySelectedFilters = (filters?: any) => gql`
query {
  Country(filter: { 
    AND: [
        ${buildCountriesGraphQuery(filters)}
      ] 
    }) {
    _id
    name
    nativeName
    alpha2Code
    alpha3Code
    populationDensity
    capital
    subregion {
      name
    }
    officialLanguages {
      name
    }
    currencies {
      name
    }
    flag {
      svgFile
    }
  }
}
`;
const filterByCritiria = (condition: string) => gql`
query {
  Country(filter: { OR: [{ alpha2Code: "${condition}" }, { name: "${condition}" }] }) {
    _id
    name
    nativeName
    alpha2Code
    alpha3Code
    populationDensity
    capital
    subregion {
      name
    }
    officialLanguages {
      name
    }
    currencies {
      name
    }
    flag {
      svgFile
    }
  }
}
`;
const retrivingAll = gql`
  query {
    Country {
      _id
      name
      nativeName
      alpha2Code
      alpha3Code
      populationDensity
      capital
      subregion {
        name
      }
      officialLanguages {
        name
      }
      currencies {
        name
      }
      flag {
        svgFile
      }
    }
  }
`;

const evalGraphQuery = (filterSearchValue?: string, selectedFilters?: any) => {
  if(filterSearchValue && selectedFilters) {
    return filterByAll(filterSearchValue, selectedFilters)
  } if( filterSearchValue ) {
    return filterByCritiria(filterSearchValue)
  }
  if( selectedFilters ) {
    return filterOnlyBySelectedFilters(selectedFilters)
  }
  return retrivingAll
}
function useCountries({
  filterSearchValue,
  selectedFilters,
}: {
  filterSearchValue?: string | undefined;
  selectedFilters?: any;
}) {
  return useQuery(["countries", filterSearchValue], async () => {
    const { Country } = await request(
      endpoint,
      evalGraphQuery(filterSearchValue, selectedFilters)
    );
    return Country;
  });
}

function useCountry(countryId: string) {
  return useQuery(
    ["country", countryId],
    async () => {
      const { Country } = await request(
        endpoint,
        gql`
        query {
          Country(_id: "${countryId}") {
            name
            nativeName
            alpha2Code
            alpha3Code
            populationDensity
            capital
            subregion {
              name
            }
            officialLanguages {
              name
            }
            currencies {
              name
            }
            flag {
              svgFile
            }
          }
        }
        `
      );
      return Country[0];
    },
    {
      enabled: !!countryId,
    }
  );
}

export const countryService = {
  useCountry,
  useCountries,
};
