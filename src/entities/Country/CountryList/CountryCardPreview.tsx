import React, { FunctionComponent } from "react";
import { useHistory } from "react-router-dom";
import { ROUTER_PATH_LIST } from "application/constants";

// TODO: CREATE Country type Domain file
type CountryCardPreviewProps = {
  _id?: string
  alpha2Code?: string;
  alpha3Code?: string;
  capital?: string;
  currencies?: { name: string }[];
  flag: { svgFile: string };
  name?: string;
  nativeName?: string;
  officialLanguages?: { name: string }[];
  populationDensity?: number;
  subregion?: { name: string };
};

const CountryCardPreview: FunctionComponent<CountryCardPreviewProps> = ({
  _id,
  name,
  nativeName,
  flag: { svgFile },
  alpha2Code,
}) => {
  const history = useHistory();

  return (
    <div className="bg-white w-full flex items-center p-2 my-4 rounded-xl shadow border">
      <div className="relative flex items-center space-x-4">
        <img
          src={svgFile}
          alt="Country Flag"
          className="w-16 h-16 rounded-full"
        />
      </div>
      <div className="flex-grow p-3">
        <div className="font-semibold text-gray-700">{nativeName}</div>
        <div className="text-sm text-gray-500">
          {name}-({alpha2Code})
        </div>
      </div>
      <div className="p-2">
        <button
          className="inline-block p-3 text-center text-white transition bg-blue-700 rounded-full shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none"
          onClick={() => {
            history.push(`${ROUTER_PATH_LIST.countryDetail}/${_id}`);
          }}
        >
          <svg
            className="w-5 h-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 480.026 480.026"
            fill="currentColor"
          >
            <g>
              <g>
                <path
                  d="M475.922,229.325l-144-160c-3.072-3.392-7.36-5.312-11.904-5.312h-96c-6.304,0-12.032,3.712-14.624,9.472
			c-2.56,5.792-1.504,12.544,2.72,17.216l134.368,149.312l-134.368,149.28c-4.224,4.704-5.312,11.456-2.72,17.216
			c2.592,5.792,8.32,9.504,14.624,9.504h96c4.544,0,8.832-1.952,11.904-5.28l144-160
			C481.394,244.653,481.394,235.373,475.922,229.325z"
                />
              </g>
            </g>
            <g>
              <g>
                <path
                  d="M267.922,229.325l-144-160c-3.072-3.392-7.36-5.312-11.904-5.312h-96c-6.304,0-12.032,3.712-14.624,9.472
			c-2.56,5.792-1.504,12.544,2.72,17.216l134.368,149.312L4.114,389.293c-4.224,4.704-5.312,11.456-2.72,17.216
			c2.592,5.792,8.32,9.504,14.624,9.504h96c4.544,0,8.832-1.952,11.904-5.28l144-160
			C273.394,244.653,273.394,235.373,267.922,229.325z"
                />
              </g>
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CountryCardPreview;
