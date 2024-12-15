import { useEffect, useRef } from "react";
import { Image, Button, FeatureReview } from "../components";
import { listFeatureHomeReview, listIntroduction } from "../helper/staticData";
import useWindowResize from "../hooks/useWindowResize";
import { IIntroductionItem } from "../types/staticDataType";

const IntroductionItem = (introductionItem: IIntroductionItem) => {
  return (
    <div className="p-small flex sm:flex-col sm:items-center flex-row items-start">
      <div className="sm:w-full w-1/3 flex justify-center">
        <Image
          imageName={introductionItem.imageUrl}
          className="max-w-full object-cover"
        />
      </div>
      <div className="flex flex-col sm:ml-0 ml-medium sm:w-full w-2/3">
        <span className="text-center font-bold text-small">
          {introductionItem.title}
        </span>
        <span className="text-center text-small">
          {introductionItem.description}
        </span>
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  const [width] = useWindowResize();
  const refImg = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (refImg.current) {
      if (width > 768) {
        refImg.current.src =
          "https://res.cloudinary.com/dwjypnbvd/image/upload/v1726376315/quiz/banner.jpg";
      } else {
        refImg.current.src =
          "https://res.cloudinary.com/dwjypnbvd/image/upload/v1726377725/quiz/banner-sm.jpg";
      }
    }
  }, [width]);
  return (
    <>
      <section className="banner relative w-full h-45">
        <div className="absolute w-full h-full">
          <img
            alt="banner"
            className="absolute w-full h-full object-cover"
            ref={refImg}
          />
        </div>
        <div className="2xl:px-80 xl:px-40 px-8 md:py-20 py-8 relative z-40">
          <div className="flex flex-col justify-start max-w-35 md:m-xl m-small">
            <div className="text-gray-100">
              <h1 className="mb-small font-bold sm:text-xl text-large">
                Experience a new era of AI-enhanced learning
              </h1>
              <p className="mb-small font-normal lg:text-medium text-small">
                Quizlet is more than flashcards: it’s the #1 global learning
                platform. Join our community of 300 million learners using
                Quizlet’s practice tests, Expert Solutions and AI-powered tools
                to improve their grades and reach their goals.
              </p>
            </div>
            <div className="text-gray-100">
              <Button
                type="button"
                buttonClass="text-gray-100 px-8 py-5 font-semibold text-small cursor-pointer flex items-center justify-center transition-all bg-twilight-500 rounded-medium outline-none"
              >
                Sign up now
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="introduction section bg-gray-200 pb-xxl">
        <div className="max-content">
          <div className="">
            <p className="min-h-12"></p>
            <h2 className="text-center m-auto font-bold text-large">
              Ace your classes with our new suite of study tools
            </h2>
            <p className="min-h-12"></p>
          </div>
          <div className="bg-gray-100 shadow-small sm:p-large px-small py-large">
            <div className="mt-medium grid sm:grid-cols-3 grid-cols-1 gap-small grid-flow-row">
              {listIntroduction &&
                listIntroduction.map((item: IIntroductionItem, index) => (
                  <IntroductionItem
                    key={index}
                    description={item.description}
                    imageUrl={item.imageUrl}
                    title={item.title}
                  />
                ))}
            </div>
          </div>
        </div>
      </section>

      <FeatureReview listFeature={listFeatureHomeReview} />
      <section className="bg-twilight-800 relative h-37.5 p-8">
        <div className="h-full flex items-center justify-center">
          <div className="h-full absolute w-full">
            <Image
              imageName="bg-section-statistics"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-gray-100 max-w-35 w-full md:m-xl m-small z-40 relative">
            <h2 className="font-bold text-large mb-small">
              94% of students who use Learn or Test mode say that Quizlet helps
              them get better grades*
            </h2>
            <p className="text-small">
              *381 Quizlet users were surveyed in Dec. 2021
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
