// TODO: Check to unify ALL the pop-ups
import tw from 'tailwind-styled-components';

export default tw.h2`
  h-[39px] !text-[32px] text-left font-black
`;

type Header4Props = {
  $limit?: '52' | '72' | 'sm' | 'lg';
};

export const Header4Center = tw.h4<Header4Props>`
  mb-5 mx-auto
  ${(p) => (p.$limit ? `max-w-${p.$limit}` : '')}
`;

export const Header4Left = tw.h4<Header4Props>`
  text-left inline-block
  ${(p) => (p.$limit ? `max-w-${p.$limit}` : '')}
`;

export const Subheader = tw.p`
  text-sm text-left mt-2.5 opacity-80
`;
