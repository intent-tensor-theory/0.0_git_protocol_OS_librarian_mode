// ============================================
// DOCS PAGE COMPONENT
// ============================================

import React, { useState } from 'react';
import { DOCS_CONTENT } from '@/content/docsContent';
import { GlassPane } from '../ui/GlassPane';

export const DocsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState(DOCS_CONTENT[0]?.id || '');

  const activeDoc = DOCS_CONTENT.find((doc) => doc.id === activeSection);

  return (
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-cyan-300 mb-2">Documentation</h1>
          <p className="text-gray-400">
            Everything you need to know about the Librarian Protocol OS
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <GlassPane className="sticky top-24">
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                Contents
              </h2>
              <nav className="space-y-1">
                {DOCS_CONTENT.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => setActiveSection(doc.id)}
                    className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                      activeSection === doc.id
                        ? 'bg-cyan-500/20 text-cyan-300'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {doc.title}
                  </button>
                ))}
              </nav>
            </GlassPane>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <GlassPane variant="modal">
              {activeDoc ? (
                <article>
                  <h2 className="text-2xl font-bold text-cyan-300 mb-4">
                    {activeDoc.title}
                  </h2>
                  <div className="prose prose-invert max-w-none">
                    {activeDoc.content.split('\n\n').map((paragraph, idx) => {
                      // Handle headers (lines starting with **)
                      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                        return (
                          <h3 key={idx} className="text-lg font-bold text-white mt-6 mb-3">
                            {paragraph.replace(/\*\*/g, '')}
                          </h3>
                        );
                      }
                      
                      // Handle bullet lists
                      if (paragraph.includes('\n- ') || paragraph.startsWith('- ')) {
                        const items = paragraph.split('\n').filter((line) => line.startsWith('- '));
                        return (
                          <ul key={idx} className="list-disc list-inside space-y-1 text-gray-300 mb-4">
                            {items.map((item, i) => (
                              <li key={i}>{item.replace(/^- /, '')}</li>
                            ))}
                          </ul>
                        );
                      }

                      // Handle inline bold
                      if (paragraph.includes('**')) {
                        const parts = paragraph.split(/(\*\*[^*]+\*\*)/g);
                        return (
                          <p key={idx} className="text-gray-300 mb-4 leading-relaxed">
                            {parts.map((part, i) => {
                              if (part.startsWith('**') && part.endsWith('**')) {
                                return (
                                  <strong key={i} className="text-white">
                                    {part.replace(/\*\*/g, '')}
                                  </strong>
                                );
                              }
                              return part;
                            })}
                          </p>
                        );
                      }

                      // Regular paragraph
                      return (
                        <p key={idx} className="text-gray-300 mb-4 leading-relaxed">
                          {paragraph}
                        </p>
                      );
                    })}
                  </div>
                </article>
              ) : (
                <p className="text-gray-500">Select a section to view</p>
              )}
            </GlassPane>
          </div>
        </div>
      </div>
    </div>
  );
};
