import { useDeferredValue, useMemo, useState } from 'react';
import {
  LEVEL_FILTERS,
  STATUS_FILTERS,
  buildSearchResults,
  filterTopicsForCatalog,
  getBranchFilters,
  groupTopicsByBranch,
} from '../../lib/learning';

export function useCatalogState(favoriteTopicIds: string[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<(typeof LEVEL_FILTERS)[number]>('Todos');
  const [branchFilter, setBranchFilter] = useState('Todos os ramos');
  const [statusFilter, setStatusFilter] = useState<(typeof STATUS_FILTERS)[number]>('Todos');
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const availableBranchFilters = useMemo(() => getBranchFilters(), []);

  const searchResults = useMemo(() => buildSearchResults(deferredSearchQuery), [deferredSearchQuery]);
  const filteredTopics = useMemo(
    () =>
      filterTopicsForCatalog({
        query: deferredSearchQuery,
        levelFilter,
        branchFilter,
        statusFilter,
        favoriteTopicIds,
      }),
    [branchFilter, deferredSearchQuery, favoriteTopicIds, levelFilter, statusFilter],
  );
  const groupedTopics = useMemo(() => groupTopicsByBranch(filteredTopics), [filteredTopics]);

  return {
    state: {
      branchFilter,
      levelFilter,
      searchQuery,
      statusFilter,
    },
    derived: {
      availableBranchFilters,
      filteredTopics,
      groupedTopics,
      searchResults,
    },
    actions: {
      clearSearch: () => setSearchQuery(''),
      setBranchFilter,
      setLevelFilter,
      setSearchQuery,
      setStatusFilter,
    },
  };
}
