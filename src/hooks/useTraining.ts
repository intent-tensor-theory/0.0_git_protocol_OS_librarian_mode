// ============================================
// TRAINING STATE HOOK
// ============================================

import { useState, useCallback, useEffect } from 'react';
import type { Training, KnowledgeFile, Contact } from '@/types';
import { trainingStorage, contactStorage } from '@/services/storage';
import { logger } from '@/services/logger';
import { generateId } from '@/utils/serialGenerator';

export const useTraining = () => {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [activeTrainingId, setActiveTrainingId] = useState<string | null>(null);

  // Load from storage on mount
  useEffect(() => {
    setTrainings(trainingStorage.get());
    setContacts(contactStorage.get());
  }, []);

  // ==========================================
  // TRAINING CRUD
  // ==========================================

  const saveTraining = useCallback((training: Omit<Training, 'id' | 'createdAt' | 'updatedAt'>): string => {
    const id = generateId();
    const now = Date.now();
    
    const newTraining: Training = {
      ...training,
      id,
      createdAt: now,
      updatedAt: now,
    };
    
    setTrainings((prev) => {
      const updated = [...prev, newTraining];
      trainingStorage.set(updated);
      return updated;
    });
    
    logger.log('INFO', `Created training: ${training.title}`);
    return id;
  }, []);

  const updateTraining = useCallback((id: string, updates: Partial<Training>) => {
    setTrainings((prev) => {
      const updated = prev.map((t) =>
        t.id === id
          ? { ...t, ...updates, updatedAt: Date.now() }
          : t
      );
      trainingStorage.set(updated);
      return updated;
    });
    logger.log('INFO', `Updated training: ${id}`);
  }, []);

  const deleteTraining = useCallback((id: string) => {
    setTrainings((prev) => {
      const training = prev.find((t) => t.id === id);
      if (training) {
        logger.log('INFO', `Deleted training: ${training.title}`);
      }
      const updated = prev.filter((t) => t.id !== id);
      trainingStorage.set(updated);
      return updated;
    });
    
    if (activeTrainingId === id) {
      setActiveTrainingId(null);
    }
  }, [activeTrainingId]);

  // ==========================================
  // KNOWLEDGE VAULT
  // ==========================================

  const addKnowledgeFile = useCallback((trainingId: string, file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const knowledgeFile: KnowledgeFile = {
          id: generateId(),
          name: file.name,
          content: e.target?.result as string,
          size: file.size,
          uploadedAt: Date.now(),
        };
        
        setTrainings((prev) => {
          const updated = prev.map((t) => {
            if (t.id === trainingId) {
              return {
                ...t,
                knowledgeVault: [...t.knowledgeVault, knowledgeFile],
                updatedAt: Date.now(),
              };
            }
            return t;
          });
          trainingStorage.set(updated);
          return updated;
        });
        
        logger.log('INFO', `Added file to knowledge vault: ${file.name}`);
        resolve();
      };
      
      reader.onerror = () => {
        logger.log('ERROR', `Failed to read file: ${file.name}`);
        reject(new Error('Failed to read file'));
      };
      
      reader.readAsText(file);
    });
  }, []);

  const removeKnowledgeFile = useCallback((trainingId: string, fileName: string) => {
    setTrainings((prev) => {
      const updated = prev.map((t) => {
        if (t.id === trainingId) {
          return {
            ...t,
            knowledgeVault: t.knowledgeVault.filter((f) => f.name !== fileName),
            updatedAt: Date.now(),
          };
        }
        return t;
      });
      trainingStorage.set(updated);
      return updated;
    });
    logger.log('INFO', `Removed file from knowledge vault: ${fileName}`);
  }, []);

  // ==========================================
  // CONTACTS (for Human tab)
  // ==========================================

  const saveContact = useCallback((contact: Omit<Contact, 'id'>) => {
    const id = generateId();
    const newContact: Contact = { ...contact, id };
    
    setContacts((prev) => {
      const updated = [...prev, newContact];
      contactStorage.set(updated);
      return updated;
    });
    
    logger.log('INFO', `Added contact: ${contact.name}`);
    return id;
  }, []);

  const deleteContact = useCallback((id: string) => {
    setContacts((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      contactStorage.set(updated);
      return updated;
    });
  }, []);

  // ==========================================
  // HELPERS
  // ==========================================

  const getTrainingById = useCallback((id: string): Training | undefined => {
    return trainings.find((t) => t.id === id);
  }, [trainings]);

  const getActiveTraining = useCallback((): Training | undefined => {
    if (!activeTrainingId) return undefined;
    return trainings.find((t) => t.id === activeTrainingId);
  }, [trainings, activeTrainingId]);

  return {
    // State
    trainings,
    contacts,
    activeTrainingId,
    
    // Training actions
    saveTraining,
    updateTraining,
    deleteTraining,
    setActiveTrainingId,
    
    // Knowledge vault actions
    addKnowledgeFile,
    removeKnowledgeFile,
    
    // Contact actions
    saveContact,
    deleteContact,
    
    // Helpers
    getTrainingById,
    getActiveTraining,
  };
};

export type UseTrainingReturn = ReturnType<typeof useTraining>;
