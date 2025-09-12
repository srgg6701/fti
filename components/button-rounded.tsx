// TODO: Use this button library everywhere to unify code!
import { Button } from '@heroui/button';
import React, { CSSProperties } from 'react';

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
  width?: string;
  btnText?: string;
  startContent?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  style?: CSSProperties | undefined;
  onPress?: () => void;
  onClick?: () => void;
};

const baseDefaults: Required<
  Omit<
    ButtonProps,
    'fontSize' | 'maxW' | 'startContent' | 'outline' | 'onPress' | 'onClick' | 'style'
  >
> = {
  rounded: 'btn-rounded',
  bgColor: 'bg-blue',
  fontColor: 'inherit',
  marginClass: 'm-auto',
  marginBottom: 'mb-[10px]',
  height: 'h-10',
  width: 'w-full',
  btnText: 'Button',
  type: 'button',
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
    height,
    width,
    btnText,
    startContent,
    type,
    ...rest // (onClick/onPress/aria-*)
  } = { ...baseDefaults, ...p };

  return (
    <Button
      className={`${fontSize} ${rounded} ${bgColor} ${fontColor} ${marginClass} ${marginBottom} ${maxW} ${outline} ${width} ${height}`}
      startContent={startContent}
      type={type}
      {...rest}
    >
      {btnText}
    </Button>
  );
}

type PresetProps = Partial<ButtonProps>;

function makeButton(preset: PresetProps) {
  const PresetButton: React.FC<PresetProps> = (props) => renderButton({ ...preset, ...props });

  return PresetButton;
}

export const ButtonRoundedGrey = makeButton({
  bgColor: 'bg-translusent-light',
  btnText: 'Register with Google',
  outline: 'outline outline-color-15',
});

export const ButtonRoundedBlue = makeButton({
  bgColor: 'bg-blue',
  btnText: 'Complete!',
});
