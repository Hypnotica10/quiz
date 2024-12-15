import React from "react";
import { FeatureReviewProps, IIntroductionItem } from "../types/staticDataType";
import { Image } from "./common";

const FeatureReviewItem = ({
  item,
  reverse,
}: {
  item: IIntroductionItem;
  reverse: boolean;
}) => {
  return (
    <div className={`${reverse ? "bg-gray-200" : "bg-gray-100"} w-full`}>
      <div
        className={`${
          reverse ? "md:flex-row-reverse" : "md:flex-row"
        } flex md:py-xl py-medium flex-col container`}
      >
        <div className="md:w-1/2 md:mb-0 mb-large">
          <Image
            imageName={item.imageUrl}
            className="max-w-full object-cover"
          />
        </div>
        <div
          className={`${
            reverse ? "md:mr-20" : "md:ml-20"
          } md:w-1/2 flex flex-col justify-center`}
        >
          <h2 className="text-medium font-bold">{item.title}</h2>
          <p className="py-medium md:text-medium text-small font-normal">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
};

const FeatureReview: React.FC<FeatureReviewProps> = (props) => {
  const { listFeature } = props;
  return (
    <section className="w-full">
      {listFeature &&
        listFeature.map((item: IIntroductionItem, index: number) => (
          <FeatureReviewItem
            item={item}
            key={index}
            reverse={index % 2 === 0 ? false : true}
          />
        ))}
    </section>
  );
};

export default FeatureReview;
