import { useDeferredValue, useMemo, useState } from 'react';
import { LEVEL_FILTERS, buildSearchResults, filterTopicsForCatalog } from '../../lib/learning';

export function useCatalogState(favoriteTopicIds: string[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<(typeof LEVEL_FILTERS)[number]>('Todos');
  const deferredSearchQuery = useDeferredValue(searchQuery);

  const searchResults = useMemo(() => buildSearchResults(deferredSearchQuery), [deferredSearchQuery]);
  const filteredTopics = useMemo(
    () =>
      filterTopicsForCatalog({
        query: deferredSearchQuery,
        levelFilter,
        favoriteTopicIds,
      }),
    [deferredSearchQuery, favoriteTopicIds, levelFilter],
  );

  return {
    state: {
      levelFilter,
      searchQuery,
    },
    derived: {
      filteredTopics,
      searchResults,
    },
    actions: {
      setLevelFilter,
      setSearchQuery,
      clearSearch: () => setSearchQuery(''),
    },
  };
}
