import React, { Dispatch, FunctionComponent, useState } from "react";
import { HDropdown } from "application/components";

type QuickSearchProps = {
  handleFilterOnChange: Dispatch<{filterSearchValue?: string, selectedFilters?: any}>;
  currencyOptions: { value: string | number; label: string }[];
  languageOptions: { value: string | number; label: string }[];
  regionOptions: { value: string | number; label: string }[];
};

const defaultSelectedFilters = { currency: "", language: "", region: "" };
const QuickSearch: FunctionComponent<QuickSearchProps> = ({
  handleFilterOnChange,
  currencyOptions,
  languageOptions,
  regionOptions,
}) => {
  const [filterSearchValue, setFilterSearchValue] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<{
    language?: string;
    region?: string;
    currency?: string;
  }>(defaultSelectedFilters);

  return (
    <section>
      <div className="flex flex-col items-center justify-center">
        <div>
          <input
            type="text"
            placeholder="Search bar..."
            className="border border-gray-300 p-2 my-2 rounded-md focus:outline-none focus:ring-2 ring-blue-200"
            onChange={(event) => setFilterSearchValue(event.target.value)}
          />
          <button
            className="p-2 m-2 bg-blue-500 text-white rounded-md focus:outline-none focus:ring-2 ring-blue-300 ring-offset-2"
            onClick={() => {
              handleFilterOnChange({filterSearchValue, selectedFilters});
            }}
          >
            Lets try
          </button>
        </div>
        <div className="flex flex-col sm:flex-row">
          <HDropdown
            options={currencyOptions}
            value={selectedFilters.currency}
            id="currency"
            label="Currency"
            handleChange={(currency: string) =>
              setSelectedFilters((prev) => ({ ...prev, currency }))
            }
          />
          <HDropdown
            options={languageOptions}
            value={selectedFilters.language}
            id="language"
            label="language"
            handleChange={(language: string) =>
              setSelectedFilters((prev) => ({ ...prev, language }))
            }
          />
          <HDropdown
            options={regionOptions}
            value={selectedFilters.region}
            id="region"
            label="region"
            handleChange={(region: string) =>
              setSelectedFilters((prev) => ({ ...prev, region }))
            }
          />
        </div>
      </div>
    </section>
  );
};

export default QuickSearch;
