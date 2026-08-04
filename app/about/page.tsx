'use client';

import React from 'react';

export default function AboutPage() {
  const experiences = [
    { year: '2023 - Present', role: 'Lead Full-Stack Architect', company: 'Bespoke Solutions', desc: 'Designing modern Next.js frontends and optimizing legacy PHP APIs.' },
    { year: '2021 - 2023', role: 'Senior PHP Developer', company: 'DevCorp', desc: 'Rebuilding relational databases for scale and migrating legacy monolithic apps.' },
    { year: '2019 - 2021', role: 'Web Developer', company: 'Freelance Agency', desc: 'Crafting bespoke web applications and specialized custom tools.' }
  ];

  const tools = [
    { name: 'Next.js', category: 'Frontend', level: 'Expert' },
    { name: 'React', category: 'Frontend', level: 'Expert' },
    { name: 'Tailwind CSS', category: 'Styling', level: 'Expert' },
    { name: 'PHP 8.x', category: 'Backend', level: 'Expert' },
    { name: 'MySQL', category: 'Database', level: 'Expert' },
    { name: 'Docker', category: 'DevOps', level: 'Intermediate' }
  ];

  return (
    <main className="bg-slate-950 py-20 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Page title */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            About Muhammad Fazal
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
            Professional journey, developer timeline, and backend toolkit.
          </p>
        </div>

        {/* Experience Timeline */}
        <section className="space-y-8">
          <h2 className="text-2xl font-bold border-b border-slate-800 pb-3">Professional History</h2>
          <div className="relative border-l border-slate-800 ml-4 space-y-8">
            {experiences.map((exp, idx) => (
              <div key={idx} className="relative pl-6">
                <span className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-blue-500 border-4 border-slate-950"></span>
                <span className="text-xs font-semibold text-blue-400">{exp.year}</span>
                <h3 className="text-lg font-bold text-white mt-1">{exp.role}</h3>
                <span className="text-xs text-slate-500">{exp.company}</span>
                <p className="text-slate-400 text-sm mt-2">{exp.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tools & Tech Grid */}
        <section className="space-y-8">
          <h2 className="text-2xl font-bold border-b border-slate-800 pb-3">Tools & Technologies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {tools.map((tool, idx) => (
              <div key={idx} className="p-4 bg-slate-900 border border-slate-850 hover:border-slate-800 rounded-xl transition duration-300">
                <h3 className="font-bold text-white text-sm">{tool.name}</h3>
                <span className="text-xs text-slate-500 block mt-1">{tool.category}</span>
                <span className="inline-block mt-2 px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded text-[10px] font-semibold">{tool.level}</span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
