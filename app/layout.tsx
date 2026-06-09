import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Traditional Catholic Editorial Platform',
  description: 'A scholarly, high-fidelity archival and social-bridge editorial platform designed within a Warm-Editorial aesthetic.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
