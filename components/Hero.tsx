'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface HeroProps {
  initialTitle?: string;
  typingStrings?: string[];
  cvUrl?: string;
  profileImageUrl?: string;
}

export default function Hero({
  initialTitle = "Muhammad Fazal",
  typingStrings = ["Senior Full-Stack Architect", "Next.js & PHP Expert", "MySQL Performance Specialist"],
  cvUrl = "/uploads/cv.pdf",
  profileImageUrl = "/uploads/hero-profile.png"
}: HeroProps) {
  const [currentText, setCurrentText] = useState('');
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const handleTyping = () => {
      const i = loopNum % typingStrings.length;
      const fullText = typingStrings[i];

      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(50);
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(150);
      }

      if (!isDeleting && currentText === fullText) {
        timer = setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500);
      }
    };

    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, loopNum, typingSpeed, typingStrings]);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-slate-950 text-white overflow-hidden py-20 px-4">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-950/40 via-slate-950 to-slate-950 -z-10" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 -z-10" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
        {/* Left Content Column */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium backdrop-blur-md animate-pulse">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            <span>Available for Custom Architectures</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
            Hi, I'm <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">{initialTitle}</span>
          </h1>

          <h2 className="text-xl sm:text-3xl font-medium text-slate-300 h-10">
            I build <span className="text-blue-400 border-r-2 border-blue-400 pr-1 animate-blink">{currentText}</span>
          </h2>

          <p className="text-slate-400 max-w-xl text-lg leading-relaxed mx-auto lg:mx-0">
            Specializing in high-performance headless architectures, bespoke Next.js frontends, and ultra-optimized PHP/MySQL APIs. Let's transform your slow WordPress site into a modern speed beast.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            <button 
              onClick={() => {
                const panel = document.getElementById('consultation-sidebar');
                if (panel) panel.classList.remove('translate-x-full');
              }}
              className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg shadow-lg hover:shadow-blue-500/25 transition duration-300 transform hover:-translate-y-0.5"
            >
              Get Consultation
            </button>
            <Link 
              href={cvUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-medium rounded-lg backdrop-blur-md transition duration-300 text-center"
            >
              Download CV
            </Link>
          </div>
        </div>

        {/* Right Graphic/Profile Column */}
        <div className="lg:col-span-5 flex justify-center z-10">
          <div className="relative group w-72 h-72 sm:w-96 sm:h-96">
            {/* Ambient background glow behind image */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-600 to-purple-600 opacity-20 blur-2xl group-hover:opacity-30 transition duration-500" />
            
            {/* The Glass Container */}
            <div className="relative w-full h-full rounded-3xl p-3 border border-slate-800 bg-slate-900/50 backdrop-blur-xl overflow-hidden shadow-2xl transition duration-500 group-hover:scale-[1.02] group-hover:border-slate-700/50">
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-950">
                <Image
                  src={profileImageUrl}
                  alt={initialTitle}
                  fill
                  priority
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-w-72px) 100vw, 384px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
