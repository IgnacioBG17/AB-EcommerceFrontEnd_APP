import React, { Fragment } from "react";

const Footer = ({ className = "" }) => {
  return (
    <Fragment>
      <footer className={`py-1 ${className}`.trim()}>
        <p className="text-center mt-1">
          Ecommerce - {new Date().getFullYear()}, All Rights Reserved
        </p>
      </footer>
    </Fragment>
  );
};

export default Footer;
