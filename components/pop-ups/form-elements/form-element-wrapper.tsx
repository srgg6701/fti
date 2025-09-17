import { ReactElement } from 'react';
import { Header4Left } from '@/components/pop-ups/styled-popup-header';
export default function FormElementWrapper({
  header4,
  children,
  id,
}: {
  header4: string;
  children: ReactElement;
  id?: string;
}) {
  return (
    <div id={`${id || ''}`}>
      <Header4Left>{header4}</Header4Left>
      {children}
    </div>
  );
}