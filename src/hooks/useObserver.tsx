import { useEffect, useState } from 'react';

/**
 * UseObserver hook - This hook is used to observe the intersection of elements
 * @returns an object containing the intersection entry data of the observed elements
 */
interface useObserverHook {
  (ref: React.MutableRefObject<HTMLElement[]>, observerOptions: IntersectionObserverInit): {
    [key: string]: IntersectionObserverEntry;
  };
}

const useObserver: useObserverHook = (refs, observerOptions) => {
  const [entryData, setEntryData] = useState<{ [key: string]: IntersectionObserverEntry }>({});

  const observerCallback: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      setEntryData((prev) => ({
        ...prev,
        [`entry-${entry.target.id}`]: entry,
      }));
    });
  };

  useEffect(() => {
    // Reset entry data if there are new refs
    setEntryData({});
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    refs.current.forEach((el: any) => {
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, [refs.current.length]);

  return entryData;
};

export default useObserver;
