import type { Metadata } from "next";

export const metadata: Metadata = {
  title: '井字棋',
};

export default function ClientLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
