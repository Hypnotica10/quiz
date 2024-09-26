import React from "react";
import { Banner, FeatureReview } from "../components";
import {
  listIntroductionFlashcards,
  listFeaturesFlashcardsReview,
} from "../helper/staticData";

const Flashcards: React.FC = () => {
  return (
    <>
      <Banner
        bannerTextColor="text-gray-800"
        bannerBackgroundColor="bg-lilac-200"
        bannerDescription="A better way to study with flashcards is here. Quizlet makes it simple to create your own flashcards, study those of a classmate, or search our archive of millions of flashcard decks from other students."
        bannerImage="flashcards-banner"
        bannerTitle="The easiest way to make and study flashcards"
        listIntroduction={listIntroductionFlashcards}
      />
      <FeatureReview listFeature={listFeaturesFlashcardsReview} />
    </>
  );
};

export default Flashcards;
