import React, { useState, useEffect, useCallback } from 'react';

// Hook para carregar mais dados
const useInfinityScroll = (fetchMoreData) => {
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const loadMore = useCallback(() => {
    if (hasMore) {
      fetchMoreData(page).then((moreDataAvailable) => {
        if (!moreDataAvailable) {
          setHasMore(false)
        } else {
          setPage(prevPage => prevPage + 1)
        }
      });
    }
  }, [fetchMoreData, hasMore, page])

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom = window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100
      if (nearBottom) {
        loadMore()
      }
    };

    window.addEventListener('scroll', handleScroll) 
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loadMore])

  return { page, hasMore }
}

export default useInfinityScroll
