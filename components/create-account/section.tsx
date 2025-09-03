
import { ReactNode } from "react";
import Buttons from '@/components/create-account/buttons';
export default function SectionWrapper ({children, messageType, status}: {children: ReactNode, messageType: string, status: string}) {
  return <section className="flex flex-col mb-auto mx-auto w-full h-full">
    {children}
    <Buttons messageType={messageType} status={status} />
  </section>
}