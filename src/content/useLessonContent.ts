import { useEffect, useState } from 'react';
import { loadLessonContentById } from './queries';

// Adapta o loader async de Markdown ao ciclo de vida React.
export function useLessonContent(lessonId?: string | null) {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Flag simples para ignorar resposta async depois que a licao/tela mudou.
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
