import React, { FunctionComponent } from "react"; // importing FunctionComponent

type HeaderProps = {
  title?: string;
  paragraph?: string;
};

const Header: FunctionComponent<HeaderProps> = ({
  title,
  paragraph,
}) => (
  <aside>
    <h2>{title}</h2>
    <p>{paragraph}</p>
  </aside>
);


export default Header