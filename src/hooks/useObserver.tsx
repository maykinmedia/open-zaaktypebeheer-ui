import { useEffect, useState } from 'react';

// Move types
type useObserverHookData = { [key: string]: IntersectionObserverEntry };
interface useObserverHook {
  (
    ref: React.MutableRefObject<HTMLElement[]>,
    observerOptions: IntersectionObserverInit
  ): useObserverHookData;
}

const useObserver: useObserverHook = (ref, observerOptions) => {
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
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    ref.current.forEach((el: any) => {
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ref]);

  return entryData;
};

export default useObserver;
