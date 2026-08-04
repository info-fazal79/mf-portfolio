import React from 'react';
import '../styles/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ConsultationPanel from '@/components/ConsultationPanel';

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
    <html lang="en" className="h-full bg-slate-950 text-white scroll-smooth">
      <body className="h-full antialiased selection:bg-blue-500/30 flex flex-col justify-between min-h-screen">
        <Header />
        <div className="flex-1 mt-20">
          {children}
        </div>
        <ConsultationPanel />
        <Footer />
      </body>
    </html>
  );
}
