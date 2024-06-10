import 'src/lib/styles/globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Money Manager Dashboard',
  description: 'A dashboard for managing money using Next.js, Tailwind CSS, and Supabase.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
      <html lang="en">
      <body>{children}</body>
      </html>
  );
}
