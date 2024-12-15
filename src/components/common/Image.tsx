// import { AdvancedImage } from "@cloudinary/react";
// import { Cloudinary } from "@cloudinary/url-gen";
// import { auto } from "@cloudinary/url-gen/actions/resize";
// import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";

import React from "react";
import { ImageProps } from "../../types/componentType";

// const Image = ({ imageName }: { imageName: string }) => {
//   const cld = new Cloudinary({ cloud: { cloudName: "dwjypnbvd" } });

//   // Use this sample image or upload your own via the Media Explorer
//   const img = cld
//     .image("quiz/" + imageName)
//     .format("auto") // Optimize delivery by resizing and applying auto-format and auto-quality
//     .quality("auto")
//     .resize(auto().gravity(autoGravity()).width(50).height(50)); // Transform the image: auto-crop to square aspect_ratio

//   return <AdvancedImage cldImg={img} />;
// };

// export default Image;

const Image: React.FC<ImageProps> = (props) => {
  const { imageName, className } = props;
  const IMAGE_SRC = `https://res.cloudinary.com/dwjypnbvd/image/upload/v1726491874/quiz/${imageName}`;
  return <img src={IMAGE_SRC} alt="image" className={className} />;
};

export default Image;
