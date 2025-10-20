export const metadata = { title: "Policies" };
import "@/app/policies/styles.css";
import ContactBlocks from "@/components/contact-block";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="lengty-text my-[80px] mb-[80px] flex flex-col gap-4">
      {children}
      <ContactBlocks />
    </div>
  );
}
