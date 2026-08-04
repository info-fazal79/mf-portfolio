'use client';

import React, { useState, useEffect } from 'react';
import { getProjects, Project } from '@/utils/api';
import SkeletonLoader from '@/components/SkeletonLoader';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const list = await getProjects();
      setProjects(list);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <main className="bg-slate-950 py-20 px-4 sm:px-6 lg:px-8 text-white min-h-screen">
      <div className="max-w-6xl mx-auto space-y-12">
        
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Featured Projects
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
            Custom-built web architectures, database scale upgrades, and modern frontend integrations.
          </p>
        </div>

        {loading ? (
          <SkeletonLoader count={3} />
        ) : projects.length === 0 ? (
          <div className="text-center py-12 text-slate-500">No projects showcase added yet. Add some in the Admin Panel!</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="bg-slate-900 border border-slate-850 hover:border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:scale-[1.01] transition duration-300">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{project.description}</p>
                  
                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tech_stack.map((tech, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-slate-800 text-slate-350 text-xs font-semibold rounded-md">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex space-x-4">
                  {project.live_link && (
                    <a 
                      href={project.live_link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition"
                    >
                      View Live Project
                    </a>
                  )}
                  {project.github_link && (
                    <a 
                      href={project.github_link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold rounded-lg transition border border-slate-700"
                    >
                      GitHub Repo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}
