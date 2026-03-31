import { useEffect, useState } from 'react';
import { Question } from '../types';
import { loadQuestionsByLessonId } from './queries';

export function useLessonQuestions(lessonId?: string | null) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    if (!lessonId) {
      setQuestions([]);
      setIsLoading(false);
      return;
    }

    setQuestions([]);
    setIsLoading(true);

    loadQuestionsByLessonId(lessonId)
      .then((nextQuestions) => {
        if (!isMounted) {
          return;
        }

        setQuestions(nextQuestions);
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
    questions,
    isLoading,
  };
}
