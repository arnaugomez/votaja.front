import JSConfetti from 'js-confetti';
import { useEffect } from 'react';

export function useConfetti() {
  useEffect(() => new JSConfetti().addConfetti(), []);
}