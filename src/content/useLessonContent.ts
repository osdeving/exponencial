import { useEffect, useState } from 'react';
import { loadLessonContentById } from './queries';

export function useLessonContent(lessonId?: string | null) {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    if (!lessonId) {
      setContent('');
      setIsLoading(false);
      return;
    }

    setContent('');
    setIsLoading(true);

    loadLessonContentById(lessonId)
      .then((nextContent) => {
        if (!isMounted) {
          return;
        }

        setContent(nextContent);
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [lessonId]);

  return {
    content,
    isLoading,
  };
}
