"use client";

import dynamic from "next/dynamic";

// Dynamically import the ConfettiSuccess component with SSR disabled
const ConfettiSuccess = dynamic(
  () => import("./ConfettiSuccess"),
  { ssr: false }
);

export default function ConfettiWrapper() {
  return <ConfettiSuccess />;
}
