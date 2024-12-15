import React from "react";
import { BannerProps, IIntroductionItem } from "../types/staticDataType";
import { Image } from "./common";

const Banner: React.FC<BannerProps> = (props) => {
  const {
    listIntroduction,
    bannerBackgroundColor,
    bannerImage,
    bannerTitle,
    bannerDescription,
    bannerTextColor,
  } = props;
  return (
    <section className={bannerBackgroundColor}>
      <div className="max-w-90 grid mx-auto md:grid-cols-2">
        <div
          className={`${bannerTextColor} xl:py-xxl xl:px-xl p-medium max-w-35 mx-auto`}
        >
          <div className="">
            <h1 className="text-large font-bold mb-xl">{bannerTitle}</h1>
            <p className="text-small font-normal mb-xl">{bannerDescription}</p>
          </div>
          <div className="">
            {listIntroduction &&
              listIntroduction.map((item: IIntroductionItem, index: number) => (
                <div key={index} className="flex mb-large">
                  <div className="sm:w-16 sm:h-16 w-12 h-12 relative flex items-center justify-center">
                    <Image
                      imageName={item.imageUrl}
                      className="w-full object-cover"
                    />
                  </div>
                  <div className="pt-1.5 ml-medium">
                    <h2 className="sm:text-medium text-small font-bold">
                      {item.title}
                    </h2>
                    <p className="sm:text-small text-base">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="w-full hidden items-center justify-center md:flex">
          <div className="max-w-30">
            <Image
              imageName={bannerImage}
              className="max-w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
