import React, { FunctionComponent } from "react"; // importing FunctionComponent

type FooterProps = {
  title?: string;
  paragraph?: string;
};

const Footer: FunctionComponent<FooterProps> = ({
  title,
  paragraph,
}) => (
  <aside>
    <h2>{title}</h2>
    <p>{paragraph}</p>
  </aside>
);

export default Footer