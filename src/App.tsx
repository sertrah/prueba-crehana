import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";

import { AppLayout, Loader } from "application/components";
import routes from "application/routes";
import { ROUTER_PATH_LIST } from "application/constants";
import { NotificationProvider } from "application/contexts";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <Router basename="/">
          <AppLayout>
            <Suspense fallback={<Loader />}>
              <Switch>
                {routes.map(({ component: Component, ...rest }) => (
                  <Route
                    {...rest}
                    key={rest.path}
                    render={(props: any) => <Component {...props} />}
                    exact
                  />
                ))}
                <Redirect from="*" to={ROUTER_PATH_LIST.notFound} />
              </Switch>
            </Suspense>
          </AppLayout>
        </Router>
      </NotificationProvider>
    </QueryClientProvider>
  );
}

export default App;
