import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TypeTest - Improve Your Typing Skills',
  description: 'A modern typing test app to improve your typing speed and accuracy',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <link rel="shortcut icon" href="https://png.pngtree.com/png-clipart/20250207/original/pngtree-chicony-white-computer-keyboards-keypads-clipart-illustration-keyboard-and-keypad-design-png-image_20377061.png" type="image/x-icon" />
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}