import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ImgHTMLAttributes,
  InputHTMLAttributes,
  MouseEventHandler,
  ReactNode
} from "react";

// default HTML props for an input
type DefaultTextInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

interface ICustomTextInputProps {
  name: string;
  label?: string;
  errorText?: string;
  helpText?: string;
  onChangeText?(text: string): void;
}

export type TextInputProps = DefaultTextInputProps & ICustomTextInputProps;

// default HTML props for an button
type DefaultButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

interface ICustomButtonProps {
  type: "button" | "submit" | "reset";
  buttonClass: string;
  children: ReactNode;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

export type ButtonProps = DefaultButtonProps & ICustomButtonProps;

// default HTML props for an image
type DefaultImageProps = DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

interface ICustomImageProps {
  imageName: string;
  className: string;
}

// image type
export type ImageProps = DefaultImageProps & ICustomImageProps;

// icon type
export type IconProps = {
  iconName: string;
};

export type ConfettiAnimationProps = {
  width: number;
  height: number;
};

