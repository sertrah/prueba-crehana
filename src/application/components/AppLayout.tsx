import React, { FunctionComponent } from "react";
import Footer from "./Footer";
import Header from "./Header";

type AppLayoutProps = {
  children?: React.ReactNode;
};

const AppLayout: FunctionComponent<AppLayoutProps> = ({ children }) => (
  <>
    <Header />
    <main className="container mx-auto">{children}</main>
    <Footer />
  </>
);

export default AppLayout;
