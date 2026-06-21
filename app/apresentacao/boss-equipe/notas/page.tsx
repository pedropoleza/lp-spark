import type { Metadata } from "next";
import { TalkNotes } from "@/components/talk/TalkNotes";

export const metadata: Metadata = {
  title: "Roteiro — Webinar BO$$",
  description: "Roteiro do apresentador (webinar em grupo BO$$).",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <TalkNotes variant="bossgrupo" />;
}
