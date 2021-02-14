import { request, gql } from "graphql-request";
import { useQuery } from "react-query";

const endpoint = "https://countries-274616.ew.r.appspot.com";

function useLanguages() {
  const graphQuery = gql`
    query {
      Language {
        name
        _id
      }
    }
  `;
  return useQuery("languages", async () => {
    const { Language } = await request(endpoint, graphQuery);
    return Language;
  });
}

function useCurrencies() {
  const graphQuery = gql`
    query {
      Currency {
        code
        _id
      }
    }
  `;
  return useQuery("currencies", async () => {
    const { Currency } = await request(endpoint, graphQuery);
    return Currency;
  });
}

function useRegions() {
  const graphQuery = gql`
    query {
      Region {
        name
        _id
      }
    }
  `;
  return useQuery("regions", async () => {
    const { Region } = await request(endpoint, graphQuery);
    return Region;
  });
}

export const commonService = {
  useRegions,
  useCurrencies,
  useLanguages,
};
