// TODO: Check to unify ALL the pop-ups
import tw from 'tailwind-styled-components';

export default tw.h2`
  h-[39px] !text-[32px] text-left font-black
`;

type Header4Props = {
  $limitW?: '52' | '72' | 'sm' | 'lg';
  $limitH?: '52' | '72' | 'sm' | 'lg';
  $h?: string;
  $mBottom?: string;
  $size?: string;
};

const headerHeader4 = (p: Header4Props) => `
  ${p.$limitW ? `max-w-${p.$limitW}` : ''}
  ${p.$limitH ? `max-h-${p.$limitH}` : ''}
  ${p.$mBottom ? `mb-${p.$mBottom}` : ''}
  ${p.$h ? `h-${p.$h}` : 'mx-auto'}
  ${p.$size ? p.$size : 'text-base'}
`;

export const Header4Center = tw.h4<Header4Props>`
  ${(p) => headerHeader4(p)}
  `;

export const Header4Left = tw.h4<Header4Props>`
  w-full text-left inline-block
  ${(p) => headerHeader4(p)}
`;

export const Subheader = tw.p`
  text-sm text-left mt-2.5 opacity-80
`;
