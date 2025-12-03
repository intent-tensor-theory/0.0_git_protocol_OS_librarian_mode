// ============================================
// LIBRARIAN MODAL (4-Tab Container)
// ============================================

import React, { useState, useMemo } from 'react';
import type { UseLibrarianReturn } from '@/hooks/useLibrarian';
import { AVAILABLE_ENGINES, getDefaultEngine } from '@/constants';
import { TabButton } from './ui/TabButton';
import { GlassPane } from './ui/GlassPane';
import { ConversationPanel } from './conversation/ConversationPanel';
import { EngineSelectorDropdown } from './conversation/EngineSelectorDropdown';
import { ProtocolOSPanel } from './protocol/ProtocolOSPanel';
import { ProtocolDropdown } from './protocol/ProtocolDropdown';
import { TrainPanel } from './training/TrainPanel';
import { TrainDropdown } from './training/TrainDropdown';
import { HumanPanel } from './human/HumanPanel';
import { HumanDropdown } from './human/HumanDropdown';
import { logger } from '@/services/logger';

type LibrarianModalProps = UseLibrarianReturn & {
  isVisible: boolean;
};

type Section = 'Conversation' | 'Sync' | 'Train' | 'Human';

export const LibrarianModal: React.FC<LibrarianModalProps> = (props) => {
  const { isVisible, globalIsConnected, setGlobalIsConnected } = props;
  
  // Engine state
  const initialEngineId = useMemo(() => getDefaultEngine()?.id || 'gemini-2.5-pro', []);
  const [activeEngineId, setActiveEngineId] = useState(initialEngineId);
  
  // Tab state
  const [activeSection, setActiveSection] = useState<Section>('Conversation');
  
  // Dropdown expansion state for each tab
  const [dropdownState, setDropdownState] = useState({
    Conversation: !globalIsConnected,
    Sync: false,
    Train: false,
    Human: false,
  });

  // Derived state
  const mode = globalIsConnected ? 'Sentient' : 'Wizard';
  const headerIcon = globalIsConnected ? '🤖' : '🧙‍♂️';
  const currentEngine = AVAILABLE_ENGINES.find((e) => e.id === activeEngineId);
  
  const headerText = mode === 'Sentient' ? `Sentient Librarian ${headerIcon}` : `Wizard Mode ${headerIcon}`;
  const statusText = mode === 'Sentient'
    ? `🟢 Connected to: ${currentEngine?.name || 'N/A'}`
    : '🔴 Disconnected. Select an engine.';

  if (!isVisible) return null;

  // ==========================================
  // HANDLERS
  // ==========================================
  
  const handleEngineSelect = (value: string) => {
    if (value === 'disconnect') {
      setGlobalIsConnected(false);
      setDropdownState((prev) => ({ ...prev, Conversation: true }));
      logger.log('ACTION', 'Disconnected from AI Engine');
    } else {
      setActiveEngineId(value);
      setGlobalIsConnected(true);
      setDropdownState((prev) => ({ ...prev, Conversation: false }));
      logger.log('ACTION', `Connected to: ${AVAILABLE_ENGINES.find((e) => e.id === value)?.name}`);
    }
  };

  const handleTabClick = (tabName: Section) => {
    logger.log('ACTION', `Tab clicked: ${tabName}`);
    
    if (activeSection === tabName) {
      // Toggle dropdown for current tab
      setDropdownState((prev) => ({ ...prev, [tabName]: !prev[tabName] }));
    } else {
      // Switch to new tab, close all dropdowns
      setActiveSection(tabName);
      setDropdownState({
        Conversation: false,
        Sync: false,
        Train: false,
        Human: false,
      });
    }
  };

  // ==========================================
  // TAB CONFIGURATION
  // ==========================================
  
  const tabs: { name: Section; label: string }[] = [
    { name: 'Conversation', label: '1. Engines' },
    { name: 'Sync', label: '2. Sync' },
    { name: 'Train', label: '3. Train' },
    { name: 'Human', label: '4. Human' },
  ];

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-end p-4 pointer-events-none">
      <GlassPane
        variant="modal"
        className="w-full md:w-[640px] h-full md:max-h-[85vh] flex flex-col pointer-events-auto"
        noPadding
      >
        {/* Header */}
        <div className="flex justify-between items-start p-4 pb-2 flex-shrink-0">
          <div>
            <h1 className="text-2xl font-extrabold text-cyan-300">{headerText}</h1>
            <p className="text-sm text-gray-400 mt-1">{statusText}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-4 flex-shrink-0">
          {tabs.map(({ name, label }) => (
            <TabButton
              key={name}
              label={label}
              isActive={activeSection === name}
              onClick={() => handleTabClick(name)}
              hasDropdown
              isDropdownOpen={dropdownState[name]}
            />
          ))}
        </div>

        {/* Dropdown Content */}
        {dropdownState[activeSection] && (
          <div className="px-4 pb-2 flex-shrink-0">
            <GlassPane className="mt-2">
              {activeSection === 'Conversation' && (
                <EngineSelectorDropdown
                  isSentient={mode === 'Sentient'}
                  activeEngineId={activeEngineId}
                  onEngineSelect={handleEngineSelect}
                />
              )}
              {activeSection === 'Sync' && (
                <ProtocolDropdown />
              )}
              {activeSection === 'Train' && (
                <TrainDropdown onSaveTraining={props.saveTraining} />
              )}
              {activeSection === 'Human' && (
                <HumanDropdown
                  contacts={props.contacts}
                  onSaveContact={props.saveContact}
                />
              )}
            </GlassPane>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-grow min-h-0 p-4 pt-2 overflow-hidden">
          {activeSection === 'Conversation' && (
            <ConversationPanel
              mode={mode}
              activeEngineId={activeEngineId}
              {...props}
            />
          )}
          {activeSection === 'Sync' && (
            <ProtocolOSPanel
              platforms={props.platforms}
              savePlatform={props.savePlatform}
              deletePlatform={props.deletePlatform}
              saveResource={props.saveResource}
              deleteResource={props.deleteResource}
              saveHandshake={props.saveHandshake}
              deleteHandshake={props.deleteHandshake}
            />
          )}
          {activeSection === 'Train' && (
            <TrainPanel
              trainings={props.trainings}
              updateTraining={props.updateTraining}
              deleteTraining={props.deleteTraining}
              addKnowledgeFile={props.addKnowledgeFile}
              removeKnowledgeFile={props.removeKnowledgeFile}
            />
          )}
          {activeSection === 'Human' && (
            <HumanPanel
              logs={props.logs}
              contacts={props.contacts}
              saveContact={props.saveContact}
              deleteContact={props.deleteContact}
            />
          )}
        </div>
      </GlassPane>
    </div>
  );
};
