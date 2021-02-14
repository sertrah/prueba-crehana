import CountryDetailPage from "entities/Country/CountryDetail";
import CountryListPage from "entities/Country/CountryList";
import NotFoundPage from "entities/NotFound";

import { ROUTER_PATH_LIST } from "./constants";

const routes = [
  {
    path: ROUTER_PATH_LIST.default,
    component: CountryListPage,
  },
  {
    path: ROUTER_PATH_LIST.notFound,
    component: NotFoundPage,
  },
  {
    path: `${ROUTER_PATH_LIST.countryDetail}/:id`,
    component: CountryDetailPage,
  },
];

export default routes;
