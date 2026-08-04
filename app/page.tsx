import React from 'react';
import Hero from '@/components/Hero';
import { getSettings } from '@/utils/api';

export default async function Page() {
  const settings = await getSettings();

  // Parse values from API configuration or load fallbacks
  const heroTitle = settings.seo_title ? settings.seo_title.split('|')[0].trim() : "Muhammad Fazal";
  const typingStrings = settings.hero_typing_text || [
    "Senior Full-Stack Architect",
    "Next.js & PHP Expert",
    "MySQL Performance Specialist"
  ];
  const cvUrl = settings.hero_cv_path || "/uploads/cv.pdf";
  const profileImageUrl = settings.site_logo || "/uploads/hero-profile.png";

  return (
    <main className="bg-slate-950 min-h-screen">
      <Hero 
        initialTitle={heroTitle}
        typingStrings={typingStrings}
        cvUrl={cvUrl}
        profileImageUrl={profileImageUrl}
      />
    </main>
  );
}
