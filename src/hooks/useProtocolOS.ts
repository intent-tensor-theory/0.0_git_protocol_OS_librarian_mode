// ============================================
// PROTOCOL OS STATE HOOK
// ============================================

import { useState, useCallback, useEffect } from 'react';
import type { Platform, Resource, Handshake } from '@/types';
import { platformStorage } from '@/services/storage';
import { logger } from '@/services/logger';

export const useProtocolOS = () => {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load from storage on mount
  useEffect(() => {
    const stored = platformStorage.get();
    setPlatforms(stored);
    setIsLoading(false);
    if (stored.length > 0) {
      logger.log('INFO', `Loaded ${stored.length} platforms from storage`);
    }
  }, []);

  // ==========================================
  // STORAGE HELPERS
  // ==========================================

  const saveToStorage = useCallback((data: Platform[]) => {
    // Sort alphabetically at all levels
    const sorted = [...data].sort((a, b) => a.baseName.localeCompare(b.baseName));
    sorted.forEach((p) => {
      p.resources.sort((a, b) => a.baseName.localeCompare(b.baseName));
      p.resources.forEach((r) => {
        r.handshakes.sort((a, b) => a.baseName.localeCompare(b.baseName));
      });
    });
    platformStorage.set(sorted);
    return sorted;
  }, []);

  // ==========================================
  // PLATFORM CRUD
  // ==========================================

  const savePlatform = useCallback((platform: Platform) => {
    setPlatforms((prev) => {
      const existing = prev.find((p) => p.id === platform.id);
      let updated: Platform[];
      
      if (existing) {
        updated = prev.map((p) => (p.id === platform.id ? platform : p));
        logger.log('INFO', `Platform '${platform.baseName}' updated`);
      } else {
        updated = [...prev, platform];
        logger.log('INFO', `Platform '${platform.baseName}' created`);
      }
      
      return saveToStorage(updated);
    });
  }, [saveToStorage]);

  const deletePlatform = useCallback((platformId: string) => {
    setPlatforms((prev) => {
      const platform = prev.find((p) => p.id === platformId);
      if (platform) {
        logger.log('INFO', `Deleting platform: '${platform.baseName}'`);
      }
      const updated = prev.filter((p) => p.id !== platformId);
      return saveToStorage(updated);
    });
  }, [saveToStorage]);

  // ==========================================
  // RESOURCE CRUD
  // ==========================================

  const saveResource = useCallback((platformId: string, resource: Resource) => {
    setPlatforms((prev) => {
      const updated = prev.map((p) => {
        if (p.id === platformId) {
          const existing = p.resources.find((r) => r.id === resource.id);
          const resources = existing
            ? p.resources.map((r) => (r.id === resource.id ? resource : r))
            : [...p.resources, resource];
          
          logger.log('INFO', `Resource '${resource.baseName}' ${existing ? 'updated' : 'created'}`);
          return { ...p, resources };
        }
        return p;
      });
      return saveToStorage(updated);
    });
  }, [saveToStorage]);

  const deleteResource = useCallback((platformId: string, resourceId: string) => {
    setPlatforms((prev) => {
      const updated = prev.map((p) => {
        if (p.id === platformId) {
          const resource = p.resources.find((r) => r.id === resourceId);
          if (resource) {
            logger.log('INFO', `Deleting resource: '${resource.baseName}'`);
          }
          return { ...p, resources: p.resources.filter((r) => r.id !== resourceId) };
        }
        return p;
      });
      return saveToStorage(updated);
    });
  }, [saveToStorage]);

  // ==========================================
  // HANDSHAKE CRUD
  // ==========================================

  const saveHandshake = useCallback((
    platformId: string,
    resourceId: string,
    handshake: Handshake
  ) => {
    setPlatforms((prev) => {
      const updated = prev.map((p) => {
        if (p.id === platformId) {
          const resources = p.resources.map((r) => {
            if (r.id === resourceId) {
              const existing = r.handshakes.find((h) => h.id === handshake.id);
              const handshakes = existing
                ? r.handshakes.map((h) => (h.id === handshake.id ? handshake : h))
                : [...r.handshakes, handshake];
              
              logger.log('INFO', `Handshake '${handshake.baseName}' ${existing ? 'updated' : 'created'}`);
              return { ...r, handshakes };
            }
            return r;
          });
          return { ...p, resources };
        }
        return p;
      });
      return saveToStorage(updated);
    });
  }, [saveToStorage]);

  const deleteHandshake = useCallback((
    platformId: string,
    resourceId: string,
    handshakeId: string
  ) => {
    setPlatforms((prev) => {
      const updated = prev.map((p) => {
        if (p.id === platformId) {
          const resources = p.resources.map((r) => {
            if (r.id === resourceId) {
              const handshake = r.handshakes.find((h) => h.id === handshakeId);
              if (handshake) {
                logger.log('INFO', `Deleting handshake: '${handshake.baseName}'`);
              }
              return { ...r, handshakes: r.handshakes.filter((h) => h.id !== handshakeId) };
            }
            return r;
          });
          return { ...p, resources };
        }
        return p;
      });
      return saveToStorage(updated);
    });
  }, [saveToStorage]);

  // ==========================================
  // HELPERS
  // ==========================================

  const getPlatformById = useCallback((id: string): Platform | undefined => {
    return platforms.find((p) => p.id === id);
  }, [platforms]);

  const getResourceById = useCallback((platformId: string, resourceId: string): Resource | undefined => {
    const platform = platforms.find((p) => p.id === platformId);
    return platform?.resources.find((r) => r.id === resourceId);
  }, [platforms]);

  const getHandshakeById = useCallback((
    platformId: string,
    resourceId: string,
    handshakeId: string
  ): Handshake | undefined => {
    const resource = getResourceById(platformId, resourceId);
    return resource?.handshakes.find((h) => h.id === handshakeId);
  }, [getResourceById]);

  return {
    // State
    platforms,
    isLoading,
    
    // Platform actions
    savePlatform,
    deletePlatform,
    
    // Resource actions
    saveResource,
    deleteResource,
    
    // Handshake actions
    saveHandshake,
    deleteHandshake,
    
    // Helpers
    getPlatformById,
    getResourceById,
    getHandshakeById,
  };
};

export type UseProtocolOSReturn = ReturnType<typeof useProtocolOS>;
