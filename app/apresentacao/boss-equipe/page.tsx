import type { Metadata } from "next";
import { TalkExperience } from "@/components/talk/TalkExperience";

export const metadata: Metadata = {
  title: "Spark — Webinar BO$$",
  description: "Apresentação em grupo para o time da BO$$.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <TalkExperience variant="bossgrupo" />;
}
