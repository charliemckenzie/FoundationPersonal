import React from 'react';

export interface UseDrawerDragResult {
  dragY: number;
  isDragging: boolean;
  handleDragStart: (e: React.TouchEvent) => void;
  handleDragMove: (e: React.TouchEvent) => void;
  handleDragEnd: () => void;
}

export function useDrawerDrag(open: boolean, onClose: () => void): UseDrawerDragResult {
  const [dragY, setDragY] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const dragStartRef = React.useRef<number>(0);

  React.useEffect(() => {
    if (!open) {
      setDragY(0);
      setIsDragging(false);
    }
  }, [open]);

  const handleDragStart = (e: React.TouchEvent) => {
    dragStartRef.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleDragMove = (e: React.TouchEvent) => {
    const delta = e.touches[0].clientY - dragStartRef.current;
    if (delta > 0) setDragY(delta);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (dragY > 120) {
      setDragY(0);
      onClose();
    } else {
      setDragY(0);
    }
  };

  return { dragY, isDragging, handleDragStart, handleDragMove, handleDragEnd };
}
