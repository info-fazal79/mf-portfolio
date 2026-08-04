import React from 'react';
import '../styles/globals.css'; // Let's make sure we point to global styles if needed

export const metadata = {
  title: 'Muhammad Fazal | Portfolio',
  description: 'Senior Full-Stack Architect portfolio website',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-slate-950 text-white">
      <body className="h-full antialiased selection:bg-blue-500/30">
        {children}
      </body>
    </html>
  );
}
