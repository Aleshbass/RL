import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from '@/hooks/useWindowSize';

export const ConfettiSuccess = () => {
  const { width, height } = useWindowSize();
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    // Auto-disable confetti after 5 seconds for performance
    const timer = setTimeout(() => {
      setIsActive(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!isActive) return null;

  return (
    <Confetti
      width={width}
      height={height}
      recycle={false}
      numberOfPieces={200}
      gravity={0.15}
      colors={['#10b981', '#f59e0b', '#3b82f6', '#8b5cf6', '#ec4899']}
    />
  );
};

export default ConfettiSuccess;
