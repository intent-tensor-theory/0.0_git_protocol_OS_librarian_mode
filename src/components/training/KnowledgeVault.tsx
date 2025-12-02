// ============================================
// KNOWLEDGE VAULT COMPONENT
// ============================================

import React, { useRef } from 'react';
import type { KnowledgeFile } from '@/types';
import { GlassPane } from '../ui/GlassPane';
import { GlassButton } from '../ui/GlassButton';

type KnowledgeVaultProps = {
  files: KnowledgeFile[];
  onAddFile: (file: File) => void;
  onRemoveFile: (fileId: string) => void;
};

export const KnowledgeVault: React.FC<KnowledgeVaultProps> = ({
  files,
  onAddFile,
  onRemoveFile,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      Array.from(selectedFiles).forEach((file) => {
        onAddFile(file);
      });
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return '📕';
    if (type.includes('json')) return '📊';
    if (type.includes('markdown') || type.includes('md')) return '📝';
    if (type.includes('text')) return '📄';
    if (type.includes('csv')) return '📈';
    return '📎';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-cyan-300">Knowledge Vault</h4>
          <p className="text-xs text-gray-400">
            Upload documents to enhance RAG context
          </p>
        </div>
        <GlassButton
          size="sm"
          variant="primary"
          onClick={() => fileInputRef.current?.click()}
        >
          📤 Upload
        </GlassButton>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".txt,.md,.json,.csv,.pdf"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* File List */}
      {files.length === 0 ? (
        <GlassPane className="text-center py-8">
          <div className="text-4xl mb-2">📚</div>
          <p className="text-sm text-gray-400 mb-2">No files uploaded yet</p>
          <p className="text-xs text-gray-500">
            Supported: .txt, .md, .json, .csv, .pdf
          </p>
        </GlassPane>
      ) : (
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {files.map((file) => (
            <GlassPane
              key={file.id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xl">{getFileIcon(file.type)}</span>
                <div className="min-w-0">
                  <p className="text-sm text-white truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(file.size)} •{' '}
                    {new Date(file.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => onRemoveFile(file.id)}
                className="p-1.5 text-gray-400 hover:text-red-400 rounded transition-colors flex-shrink-0"
                title="Remove file"
              >
                🗑️
              </button>
            </GlassPane>
          ))}
        </div>
      )}

      {/* Stats */}
      {files.length > 0 && (
        <div className="flex gap-4 text-xs text-gray-500">
          <span>{files.length} files</span>
          <span>
            {formatFileSize(files.reduce((acc, f) => acc + f.size, 0))} total
          </span>
        </div>
      )}

      {/* Info */}
      <div className="p-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
        <p className="text-xs text-cyan-300">
          💡 Files are parsed and added to the RAG context. The AI will use
          this knowledge when answering questions.
        </p>
      </div>
    </div>
  );
};
