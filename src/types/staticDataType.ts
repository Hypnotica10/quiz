import { ISubject } from "./subject";

export interface IFooterData {
  label: string;
  list: {
    name: string;
    path: string;
  }[];
}

export interface IIntroductionItem {
  title: string;
  description: string;
  imageUrl: string;
}

interface IListIntroduction {
  listIntroduction?: IIntroductionItem[];
  listFeature?: IIntroductionItem[];
}

interface IBanner {
  bannerBackgroundColor: string;
  bannerImage: string;
  bannerTitle: string;
  bannerDescription: string;
  bannerTextColor: string;
}

export type BannerProps = IListIntroduction & IBanner;

export interface IMenu {
  id: number;
  name: string;
  subMenu: ISubject[];
}

export type FeatureReviewProps = IListIntroduction;

export interface IAvatarDefault {
  id: number;
  urlImage: string;
}

export interface IDrawerListItem {
  tooltipText: string;
  iconName: string;
  to: string;
}
