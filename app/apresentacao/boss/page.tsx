import type { Metadata } from "next";
import { TalkExperience } from "@/components/talk/TalkExperience";

export const metadata: Metadata = {
  title: "Spark — Demo BO$$",
  description: "Apresentação personalizada para a BO$$.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <TalkExperience variant="boss" />;
}
