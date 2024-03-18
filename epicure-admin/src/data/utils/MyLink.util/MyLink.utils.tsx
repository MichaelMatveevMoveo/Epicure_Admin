import React, { ReactNode } from "react";
import { Link, LinkProps } from "react-router-dom";
import "./MyLink.Utils.Style.scss";

interface MyLinkProps extends LinkProps {
  children: ReactNode;
}

const MyLink: React.FC<MyLinkProps> = ({ children, ...rest }) => {
  return (
    <Link className="myLinkStyle" {...rest}>
      {children}
    </Link>
  );
};

export default MyLink;
