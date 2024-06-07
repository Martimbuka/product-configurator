import React from "react";
import ImageZoom from "react-image-zooom";

const Image = ({ src, alt }) => {
  return (
    <ImageZoom
      src={src}
      alt={alt}
      zoom={200}
    />
  );
}

export default Image;