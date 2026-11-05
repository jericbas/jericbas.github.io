import React from 'react';
import { Package, ShieldAlert, Cpu, GitFork, ExternalLink, Star } from 'lucide-react';

export interface ProjectItem {
  title: string;
  category: 'npm' | 'rust' | 'app';
  tagline: string;
  description: string;
  tech: string[];
  githubUrl: string;
  npmUrl?: string;
  featured?: boolean;
  status?: string;
}

export const PROJECTS: ProjectItem[] = [
  {
    title: 'why-override',
    category: 'npm',
    tagline: 'CLI dependency tree inspector for npm overrides',
    description:
      'Solves dependency hell by pinpointing exactly which transitive dependencies force npm overrides, helping teams clean up package.json risks.',
    tech: ['Node.js', 'CLI', 'TypeScript', 'npm'],
    githubUrl: 'https://github.com/jericbas/why-override',
    npmUrl: 'https://www.npmjs.com/package/why-override',
    featured: true,
  },
  {
    title: 'zod-v3-to-v4',
    category: 'npm',
    tagline: 'Automated AST codemod for schema migration',
    description:
      'AST-based migration tool that parses TypeScript files and refactors Zod validation schemas safely to the latest syntax specifications.',
    tech: ['TypeScript', 'AST', 'Codemod', 'npm'],
    githubUrl: 'https://github.com/jericbas/zod-v3-to-v4',
    npmUrl: 'https://www.npmjs.com/package/zod-v3-to-v4',
    featured: true,
  },
  {
    title: 'oxitty',
    category: 'rust',
    tagline: 'High-performance cross-platform utility in Rust',
    description:
      'Fast, minimal, memory-efficient systems terminal tool engineered with Rust, emphasizing instant startup time and zero memory leaks.',
    tech: ['Rust', 'Cargo', 'Systems', 'CLI'],
    githubUrl: 'https://github.com/jericbas/oxitty',
    featured: true,
  },
  {
    title: 'ufw-guard',
    category: 'rust',
    tagline: 'Real-time Linux firewall monitor and guard',
    description:
      'System-level Linux security monitor built in Rust that inspects UFW rules, blocks suspicious probes, and provides real-time rule visualization.',
    tech: ['Rust', 'Linux Security', 'UFW', 'Cargo'],
    githubUrl: 'https://github.com/jericbas/ufw-guard',
    featured: true,
  },
  {
    title: 'NautilusArena',
    category: 'app',
    tagline: 'Multi-agent simulation & reactive canvas arena',
    description:
      'Interactive architecture platform exploring autonomous behaviors, state synchronization, and reactive rendering engines.',
    tech: ['React', 'TypeScript', 'Simulations', 'Canvas'],
    githubUrl: 'https://github.com/jericbas/NautilusArena',
    featured: false,
  },
];

interface ProjectGridProps {
  filter?: 'all' | 'featured' | 'npm' | 'rust';
}

export default function ProjectGrid({ filter = 'all' }: ProjectGridProps) {
  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === 'featured') return p.featured;
    if (filter === 'npm') return p.category === 'npm';
    if (filter === 'rust') return p.category === 'rust';
    return true;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {filteredProjects.map((project) => (
        <div
          key={project.title}
          className="p-5 rounded-2xl border border-theme bg-surface seasonal-card-hover flex flex-col justify-between"
        >
          <div>
            {/* Header badges */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {project.category === 'rust' ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
                    <Cpu className="w-3 h-3" />
                    Rust
                  </span>
                ) : project.category === 'npm' ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
                    <Package className="w-3 h-3" />
                    npm Package
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                    App Architecture
                  </span>
                )}
                {project.featured && (
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-theme">
                    ★ Featured
                  </span>
                )}
                {project.status && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                    🚧 {project.status}
                  </span>
                )}
              </div>

              {/* External Links */}
              <div className="flex items-center gap-2 text-secondary-theme">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-theme p-1 rounded-md hover:bg-surface-elevated transition-colors"
                  title="View GitHub Repository"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Title & Tagline */}
            <h3 className="text-base font-bold text-primary-theme group-hover:accent-text transition-colors">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {project.title}
              </a>
            </h3>
            <p className="text-xs font-medium text-secondary-theme mt-0.5 mb-2">
              {project.tagline}
            </p>

            <p className="text-xs text-muted-theme leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Footer Tags & Links */}
          <div className="mt-4 pt-3 border-t border-theme/60 flex items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-surface-elevated text-secondary-theme"
                >
                  {t}
                </span>
              ))}
            </div>

            {project.npmUrl && (
              <a
                href={project.npmUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-mono text-red-500 hover:underline flex items-center gap-1"
              >
                npm registry →
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
