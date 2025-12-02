// ============================================
// HANDSHAKE EDITOR COMPONENT
// ============================================

import React, { useState } from 'react';
import type { Handshake, ProtocolType, HandshakeInput, HandshakeOutput } from '@/types';
import { parseCurl, isCurlCommand } from '@/utils/curlParser';
import { logger } from '@/services/logger';
import { GlassPane } from '../ui/GlassPane';
import { GlassButton } from '../ui/GlassButton';
import { GlassInput } from '../ui/GlassInput';
import { ProtocolSelector } from './ProtocolSelector';
import { ConfigForm } from './ConfigForm';
import { RequestInput } from './RequestInput';
import { ExecutionOutput } from './ExecutionOutput';

type HandshakeEditorProps = {
  handshake?: Handshake;
  onSave: (handshake: Omit<Handshake, 'id' | 'serial' | 'version'>) => void;
  onCancel: () => void;
};

export const HandshakeEditor: React.FC<HandshakeEditorProps> = ({
  handshake,
  onSave,
  onCancel,
}) => {
  const [baseName, setBaseName] = useState(handshake?.baseName || '');
  const [protocol, setProtocol] = useState<ProtocolType>(handshake?.protocol || 'curl-default');
  const [config, setConfig] = useState<Record<string, string>>(handshake?.config || {});
  const [input, setInput] = useState<HandshakeInput>(
    handshake?.input || { model: '', dynamicText: '' }
  );
  const [output, setOutput] = useState<HandshakeOutput | null>(handshake?.output || null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setExecutionLogs((prev) => [...prev, `[${timestamp}] ${message}`]);
  };

  const handleExecute = async () => {
    setIsExecuting(true);
    setExecutionLogs([]);
    addLog('Starting request execution...');

    try {
      let url = '';
      let options: RequestInit = {};

      // Prepare request based on protocol
      if (protocol === 'curl-default' && isCurlCommand(input.model)) {
        addLog('Parsing cURL command...');
        const parsed = parseCurl(input.model);
        url = parsed.url;
        options = parsed.options;
      } else if (protocol === 'rest-api-key') {
        url = config.apiUrl || '';
        const headerName = config.headerName || 'Authorization';
        options = {
          method: 'GET',
          headers: {
            [headerName]: config.headerName === 'Authorization' 
              ? `Bearer ${config.apiKey}` 
              : config.apiKey,
          },
        };
      } else if (protocol === 'basic-auth') {
        url = config.apiUrl || '';
        const credentials = btoa(`${config.username}:${config.password}`);
        options = {
          method: 'GET',
          headers: {
            'Authorization': `Basic ${credentials}`,
          },
        };
      } else if (protocol === 'graphql') {
        url = config.apiUrl || '';
        options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(config.authToken ? { 'Authorization': `Bearer ${config.authToken}` } : {}),
          },
          body: JSON.stringify({ query: input.model }),
        };
      } else {
        // Fallback: try to use input.model as raw fetch
        addLog('Using simulated execution mode');
        await new Promise((r) => setTimeout(r, 1000));
        
        setOutput({
          status: 200,
          method: 'GET',
          size: 1234,
          response: {
            message: 'Simulated response',
            protocol,
            note: 'Real execution requires proper URL configuration',
          },
          executedAt: Date.now(),
        });
        
        addLog('Simulated execution complete');
        setIsExecuting(false);
        return;
      }

      // Apply dynamic text substitution
      if (input.dynamicText && options.body) {
        options.body = (options.body as string).replace(/\{INPUT\}/g, input.dynamicText);
      }

      addLog(`Executing ${options.method || 'GET'} ${url}`);

      // Execute request
      const response = await fetch(url, options);
      const responseText = await response.text();
      
      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch {
        responseData = responseText;
      }

      addLog(`Response received: ${response.status}`);

      setOutput({
        status: response.status,
        method: options.method || 'GET',
        size: responseText.length,
        response: responseData,
        executedAt: Date.now(),
      });

      logger.log('SUCCESS', `Handshake executed: ${response.status}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      addLog(`Error: ${errorMessage}`);
      
      setOutput({
        status: 0,
        method: 'ERROR',
        response: { error: errorMessage },
        executedAt: Date.now(),
      });

      logger.log('ERROR', `Handshake failed: ${errorMessage}`);
    }

    setIsExecuting(false);
  };

  const handleSave = () => {
    if (!baseName.trim()) {
      alert('Please enter a handshake name');
      return;
    }

    onSave({
      baseName: baseName.trim(),
      protocol,
      config,
      input,
      output: output || undefined,
    });
  };

  return (
    <GlassPane variant="modal" className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-cyan-300">
          {handshake ? 'Edit Handshake' : 'New Handshake'}
        </h3>
        <button onClick={onCancel} className="text-gray-400 hover:text-white">
          ✕
        </button>
      </div>

      {/* Section 1: Name */}
      <div>
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
          Handshake Name
        </label>
        <GlassInput
          value={baseName}
          onChange={setBaseName}
          placeholder="e.g., Get User Data"
        />
      </div>

      {/* Section 2: Protocol Selection */}
      <ProtocolSelector value={protocol} onChange={setProtocol} />

      {/* Section 3: Configuration */}
      <ConfigForm protocol={protocol} config={config} onChange={setConfig} />

      {/* Section 4: Request Input */}
      <RequestInput protocol={protocol} input={input} onChange={setInput} />

      {/* Section 5: Execution & Output */}
      <ExecutionOutput
        output={output}
        isExecuting={isExecuting}
        onExecute={handleExecute}
        logs={executionLogs}
      />

      {/* Actions */}
      <div className="flex gap-3 pt-4 border-t border-white/10">
        <GlassButton variant="ghost" onClick={onCancel}>
          Cancel
        </GlassButton>
        <GlassButton variant="primary" onClick={handleSave}>
          💾 Save Handshake
        </GlassButton>
      </div>
    </GlassPane>
  );
};
