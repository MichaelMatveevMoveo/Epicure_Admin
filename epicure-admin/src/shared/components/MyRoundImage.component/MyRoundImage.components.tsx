import React from "react";
import "./MyRoundImage.style.scss";

const MyRoundImage: React.FC<{ url: string; alt: string }> = ({ url, alt }) => {
  return <img src={url} alt={alt} className="MyRoundImage" />;
};

export default MyRoundImage;
