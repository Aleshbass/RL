import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Order Confirmation | RehabifyLearn",
  description: "Your course order has been confirmed",
};

interface ConfirmationLayoutProps {
  children: ReactNode;
}

export default function ConfirmationLayout({ children }: ConfirmationLayoutProps) {
  return (
    <section className="bg-background min-h-screen">
      {children}
    </section>
  );
}
