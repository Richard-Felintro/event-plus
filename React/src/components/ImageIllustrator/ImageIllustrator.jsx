import React from "react";
import "./ImageIllustrator.css";

const ImageIllustrator = ({ alterText, imageRender, AdditionalClass = "" }) => {
  return (
    <figure>
      <img
        src={imageRender}
        alt={alterText}
        className={`illustrator-box__image ${AdditionalClass}`}
      />
    </figure>
  );
};

export default ImageIllustrator;
