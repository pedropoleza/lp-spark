import type { Metadata } from "next";
import { TalkNotes } from "@/components/talk/TalkNotes";

export const metadata: Metadata = {
  title: "Roteiro — Demo BO$$",
  description: "Roteiro do apresentador (BO$$).",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <TalkNotes variant="boss" />;
}
