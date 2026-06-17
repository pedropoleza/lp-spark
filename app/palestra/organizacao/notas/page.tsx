import type { Metadata } from "next";
import { TalkNotes } from "@/components/talk/TalkNotes";

export const metadata: Metadata = {
  title: "Roteiro — Palestra Organização",
  description: "Notas do apresentador (organização / CRM).",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <TalkNotes variant="organizacao" />;
}
