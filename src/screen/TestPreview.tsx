import React from "react";
import { Banner, FeatureReview } from "../components";
import {
  listFeaturesTestReview,
  listIntroductionTest,
} from "../helper/staticData";

const TestPreview: React.FC = () => {
  return (
    <>
      <Banner
        bannerTextColor="text-gray-100"
        bannerBackgroundColor="bg-twilight-800"
        bannerDescription="Get graded on practice tests to check how much you know and
                prepare for your next big exam."
        bannerImage="flashcards-banner"
        bannerTitle="Make the material stick with Test Mode"
        listIntroduction={listIntroductionTest}
      />
      <FeatureReview listFeature={listFeaturesTestReview} />
    </>
  );
};

export default TestPreview;
