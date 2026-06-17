import type { Metadata } from "next";
import { TalkNotes } from "@/components/talk/TalkNotes";

export const metadata: Metadata = {
  title: "Roteiro — Palestra Follow-up",
  description: "Notas do apresentador (follow-up).",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <TalkNotes variant="followup" />;
}
