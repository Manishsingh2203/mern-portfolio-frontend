
import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

export const useScrollAnimation = (threshold = 0.3) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold, once: true });

  return {
    ref,
    isInView
  };
};