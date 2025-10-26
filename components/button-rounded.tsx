// TODO: Use this button library everywhere to unify code!
import React, { CSSProperties } from "react";
import Image from "next/image";
import { Button } from "@heroui/button";

type ButtonProps = {
  rounded?: string;
  bgColor?: string;
  fontSize?: string;
  fontColor?: string;
  marginClass?: string;
  marginBottom?: string;
  maxW?: string;
  outline?: string;
  height?: string;
  padding?: string;
  width?: string;
  btnText?: string;
  btnImageParams?: {
    src: string;
    alt: string;
    height: number;
    width: number;
    className?: string;
    title?: string;
    style?: CSSProperties;
  } | null;
  textBeforeImage?: true | null;
  startContent?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  style?: CSSProperties | undefined;
  onPress?: () => void;
  onClick?: () => void;
};

const baseDefaults: Required<
  Omit<
    ButtonProps,
    | "fontSize"
    | "maxW"
    | "padding"
    | "startContent"
    | "outline"
    | "onPress"
    | "onClick"
    | "style"
  >
> = {
  rounded: "btn-rounded",
  bgColor: "bg-blue",
  fontColor: "inherit",
  marginClass: "m-auto",
  marginBottom: "mb-[10px]",
  height: "h-10",
  width: "w-full",
  btnText: "Button",
  btnImageParams: null,
  textBeforeImage: null,
  type: "button",
};

function renderButton(p: ButtonProps) {
  const {
    rounded,
    bgColor,
    fontColor,
    fontSize,
    marginClass,
    marginBottom,
    maxW,
    outline,
    padding,
    height,
    width,
    btnText,
    btnImageParams,
    textBeforeImage,
    startContent,
    type,
    style,
    ...rest // (onClick/onPress/aria-*)
  } = { ...baseDefaults, ...p };

  return (
    <Button
      className={`${fontSize} ${rounded} ${bgColor} ${fontColor} ${padding} ${marginClass} ${marginBottom} ${maxW} ${outline} ${width} ${height}`}
      startContent={startContent}
      style={style}
      type={type}
      {...rest}
    >
      <>
        {textBeforeImage && <span>{btnText}</span>}
        {btnImageParams && (
          <Image
            alt={btnImageParams.alt}
            className={btnImageParams.className}
            height={btnImageParams.height}
            src={btnImageParams.src}
            style={btnImageParams.style}
            title={btnImageParams.title || btnImageParams.alt}
            width={btnImageParams.width}
          />
        )}
        {!textBeforeImage && <span>{btnText}</span>}
      </>
    </Button>
  );
}

type PresetProps = Partial<ButtonProps>;

function makeButton(preset: PresetProps) {
  const PresetButton: React.FC<PresetProps> = (props) =>
    renderButton({ ...preset, ...props });

  return PresetButton;
}

export const ButtonRoundedGrey = makeButton({
  bgColor: "bg-translusent-light",
  btnText: "Sign in with Google",
  outline: "outline outline-color-15",
});

export const ButtonRoundedBlue = makeButton({
  bgColor: "bg-blue",
  btnText: "Complete!",
});
