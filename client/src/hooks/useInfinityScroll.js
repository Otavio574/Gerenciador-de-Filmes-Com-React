import React, { useState, useEffect, useCallback } from 'react';

// Hook para carregar mais dados
const useInfinityScroll = (fetchMoreData) => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadMore = useCallback(async () => {
    if (!hasMore || loading) return; // Evita carregamentos simultâneos ou desnecessários

    setLoading(true);
    const moreDataAvailable = await fetchMoreData(page);

    if (!moreDataAvailable) {
      setHasMore(false);
    } else {
      setPage(prevPage => prevPage + 1);
    }

    setLoading(false);
  }, [fetchMoreData, hasMore, loading, page]);

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom = window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100;
      if (nearBottom) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMore]);

  return { page, hasMore, loading };
};

export default useInfinityScroll;
