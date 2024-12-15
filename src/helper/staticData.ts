import {
  IAvatarDefault,
  IDrawerListItem,
  IFooterData,
  IIntroductionItem,
  IMenu,
} from "../types/staticDataType";

export const listFeatureHomeReview: IIntroductionItem[] = [
  {
    title: "Make class material instantly studiable",
    description:
      "Turn your slides, videos, and notes into flashcard sets, practice tests, and study guides.",
    imageUrl: "features-1.jpg",
  },
  {
    title: "Test prep for any subject",
    description:
      "Memorize anything with personalized practice tests and study sessions in Learn. 98% of students say Quizlet has improved their understanding.",
    imageUrl: "features-2.jpg",
  },
];

export const footerData: IFooterData[] = [
  {
    label: "About us",
    list: [
      {
        name: "About Quizlet",
        path: "/mission",
      },
      {
        name: "How Quizlet works",
        path: "/features/how-quizlet-works",
      },
    ],
  },
  {
    label: "Study tools",
    list: [
      {
        name: "Flashcards",
        path: "/flashcards",
      },
      {
        name: "Test",
        path: "/test",
      },
    ],
  },
  {
    label: "Resources",
    list: [
      {
        name: "Help center",
        path: "/help",
      },
      {
        name: "Privacy",
        path: "/privacy",
      },
      {
        name: "Terms",
        path: "/tos",
      },
    ],
  },
];

export const listIntroduction: IIntroductionItem[] = [
  {
    title: "Create Magic Notes",
    description: "Get flashcards, practice tests and more in one click",
    imageUrl: "introduction-1.svg",
  },
  {
    title: "Meet Q-Chat: your AI tutor",
    description: "Engage with your highly responsive study partner",
    imageUrl: "introduction-2.svg",
  },
  {
    title: "Get Expert Solutions",
    description: "Find trustworthy solutions, expert-written and AI-enhanced",
    imageUrl: "introduction-3.svg",
  },
];

export const menu: IMenu[] = [
  {
    id: 1,
    name: "Study tools",
    subMenu: [
      {
        id: 1,
        name: "flashcards",
      },
      {
        id: 2,
        name: "test",
      },
    ],
  },
  {
    id: 2,
    name: "Subjects",
    subMenu: [
      {
        id: 1,
        name: "languages",
        description: "ngoại ngữ",
      },
      {
        id: 2,
        name: "math",
        description: "toán",
      },
      {
        id: 3,
        name: "science",
        description: "khoa học tự nhiên",
      },
      {
        id: 4,
        name: "social science",
        description: "khoa học xã hội",
      },
      {
        id: 5,
        name: "other",
        description: "khác",
      },
    ],
  },
];

export const listIntroductionFlashcards: IIntroductionItem[] = [
  {
    title: "Over 500 million",
    description: "flashcards created",
    imageUrl: "flashcards-creation.svg",
  },
  {
    title: "90% of students",
    description: "who use Quizlet report receiving higher grades",
    imageUrl: "flashcards-exam.svg",
  },
  {
    title: "The most popular",
    description: "online learning tool in the US",
    imageUrl: "flashcards-study.svg",
  },
];

export const listFeaturesFlashcardsReview: IIntroductionItem[] = [
  {
    title: "Make flashcards",
    description:
      "Creating your own set of flashcards is simple with our free flashcard maker — just add a term and definition. You can even add an image from our library. Once your flashcard set is complete, you can study and share it with friends.",
    imageUrl: "flashcards-1.gif",
  },
  {
    title: "Find online flashcards",
    description:
      "Need flashcards to memorize vocabulary, equations, or anatomy? With millions of flashcards already created by other students and teachers, you can find free flashcards for any subject on Quizlet.",
    imageUrl: "flashcards-2.png",
  },
  {
    title: "Spaced repetition learning",
    description:
      "Quizlet uses spaced repetition to help you retain information and study more effectively with Memory Score and Scheduled Review. As you sort flashcards into stacks of ones you know and don't know, we'll keep track of your answers and provide you with a personalized Memory Score.",
    imageUrl: "flashcards-3.png",
  },
  {
    title: "Do more with your flashcards",
    description:
      "On Quizlet, you can do more than flip flashcards. With 4 study modes to pick from, there's an option for every learner.",
    imageUrl: "flashcards-4.gif",
  },
];

export const listIntroductionTest: IIntroductionItem[] = [
  {
    title: "Questions formatted your way",
    description:
      "Test yourself with multiple choice, true/false, and other question types to better learn the material.",
    imageUrl: "test-practice-test.svg",
  },
  {
    title: "Get graded on your responses",
    description:
      "With auto-grading, get feedback on what you know and where you need to spend more time studying.",
    imageUrl: "test-multiple-choice.svg",
  },
  {
    title: "Take a test, anywhere",
    description:
      "With Test Mode available on both iOS and Android, you can get practice in wherever you go.",
    imageUrl: "test-technology.svg",
  },
];

export const listFeaturesTestReview: IIntroductionItem[] = [
  {
    title: "Get ready for test day",
    description:
      "Set up your test in a way that makes the most sense to you! With Test Mode, you can choose from question formats you're most likely to see on your exam and set a timer to get comfortable doing your best under pressure.",
    imageUrl: "test-1.jpg",
  },
  {
    title: "Challenge yourself with different questions",
    description:
      "Use different question formats to go beyond memorization. By answering the same question in different ways, you can gain confidence knowing that you've learned the material.",
    imageUrl: "test-2.gif",
  },
  {
    title: "Enjoy the first round of test on us",
    description:
      "Take Test Mode for a spin with a free round, then test yourself as frequently as you'd like with Quizlet Plus. With unlimited rounds of Test Mode, there's nothing that can hold you back.",
    imageUrl: "test-3.jpg",
  },
];

export const listAvatarDefault: IAvatarDefault[] = [
  {
    id: 0,
    urlImage: "avatar-default.jpg",
  },
  {
    id: 1,
    urlImage: "avatar_1.jpg",
  },
  {
    id: 2,
    urlImage: "avatar_2.jpg",
  },
  {
    id: 3,
    urlImage: "avatar_3.jpg",
  },
  {
    id: 4,
    urlImage: "avatar_4.jpg",
  },
  {
    id: 5,
    urlImage: "avatar_5.jpg",
  },
  {
    id: 6,
    urlImage: "avatar_6.jpg",
  },
  {
    id: 7,
    urlImage: "avatar_7.jpg",
  },
  {
    id: 8,
    urlImage: "avatar_8.jpg",
  },
  {
    id: 9,
    urlImage: "avatar_9.jpg",
  },
  {
    id: 10,
    urlImage: "avatar_10.jpg",
  },
  {
    id: 11,
    urlImage: "avatar_11.jpg",
  },
  {
    id: 12,
    urlImage: "avatar_12.jpg",
  },
  {
    id: 13,
    urlImage: "avatar_13.jpg",
  },
  {
    id: 14,
    urlImage: "avatar_14.jpg",
  },
  {
    id: 15,
    urlImage: "avatar_15.jpg",
  },
  {
    id: 16,
    urlImage: "avatar_16.jpg",
  },
  {
    id: 17,
    urlImage: "avatar_17.jpg",
  },
  {
    id: 18,
    urlImage: "avatar_18.jpg",
  },
  {
    id: 19,
    urlImage: "avatar_19.jpg",
  },
  {
    id: 20,
    urlImage: "avatar_20.jpg",
  },
];

export const drawerList: IDrawerListItem[] = [
  {
    tooltipText: "home",
    iconName: "home",
    to: "/quiz",
  },
  {
    tooltipText: "library",
    iconName: "library",
    to: "",
  },
  {
    tooltipText: "flashcards",
    iconName: "setflashcards",
    to: "/flashcards/sets",
  },
];
