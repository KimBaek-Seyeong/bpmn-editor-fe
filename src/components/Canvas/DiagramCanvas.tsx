// DiagramCanvas.tsx
import { useState } from 'react';
import { Circle, Square, Diamond } from 'lucide-react';

interface DiagramElement {
  id: string;
  type: 'task' | 'event' | 'gateway';
  position: { x: number; y: number };
  size: { width: number; height: number };
  text: string;
}

interface DiagramCanvasProps {
  elements: DiagramElement[];
  onElementsChange: (elements: DiagramElement[]) => void;
}

const DiagramCanvas: React.FC<DiagramCanvasProps> = ({ elements, onElementsChange }) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [currentElement, setCurrentElement] = useState<DiagramElement | null>(null);
  const [resizeHandle, setResizeHandle] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, element: DiagramElement, handle?: string) => {
    e.stopPropagation();
    e.preventDefault();
    
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - element.position.x;
    const offsetY = e.clientY - rect.top - element.position.y;
    setDragOffset({ x: offsetX, y: offsetY });
    
    if (handle) {
      setIsResizing(true);
      setResizeHandle(handle);
    } else {
      setIsDragging(true);
    }
    setCurrentElement(element);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!currentElement) return;

    const rect = e.currentTarget.getBoundingClientRect();
    
    if (isDragging) {
      const newX = e.clientX - rect.left - dragOffset.x;
      const newY = e.clientY - rect.top - dragOffset.y;

      onElementsChange(elements.map(el => 
        el.id === currentElement.id 
          ? { ...el, position: { x: newX, y: newY } }
          : el
      ));
    } else if (isResizing && resizeHandle) {
      const elementIndex = elements.findIndex(el => el.id === currentElement.id);
      const element = elements[elementIndex];
      
      const newX = e.clientX - rect.left;
      const newY = e.clientY - rect.top;

      let newSize = { ...element.size };
      let newPosition = { ...element.position };

      switch (resizeHandle) {
        case 'se':
          newSize.width = Math.max(50, newX - element.position.x);
          newSize.height = Math.max(50, newY - element.position.y);
          break;
        case 'sw':
          newSize.width = Math.max(50, element.position.x + element.size.width - newX);
          newSize.height = Math.max(50, newY - element.position.y);
          newPosition.x = newX;
          break;
      }

      onElementsChange(elements.map((el, index) => 
        index === elementIndex 
          ? { ...el, size: newSize, position: newPosition }
          : el
      ));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
    setCurrentElement(null);
    setResizeHandle(null);
  };

  const renderElement = (element: DiagramElement) => {
    switch (element.type) {
      case 'event':
        return <Circle className="w-full h-full stroke-[1.5]" />;
      case 'task':
        return <Square className="w-full h-full stroke-[1.5]" />;
      case 'gateway':
        return <Diamond className="w-full h-full stroke-[1.5]" />;
      default:
        return null;
    }
  };

  return (
    <div 
      className="flex-1 relative bg-white rounded-lg shadow overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      {elements.map((element) => (
        <div
          key={element.id}
          className={`absolute flex flex-col items-center cursor-move select-none
            ${currentElement?.id === element.id ? 'ring-2 ring-blue-500' : ''}`}
          style={{
            left: element.position.x,
            top: element.position.y,
            width: element.size.width,
            height: element.size.height,
          }}
          onMouseDown={(e) => handleMouseDown(e, element)}
        >
          <div className="w-full h-full flex items-center justify-center relative">
            {renderElement(element)}
            
            {/* 리사이즈 핸들은 선택된 요소에만 표시 */}
            {currentElement?.id === element.id && (
              <>
                <div
                  className="absolute bottom-0 right-0 w-2 h-2 bg-blue-500 cursor-se-resize"
                  onMouseDown={(e) => handleMouseDown(e, element, 'se')}
                />
                <div
                  className="absolute bottom-0 left-0 w-2 h-2 bg-blue-500 cursor-sw-resize"
                  onMouseDown={(e) => handleMouseDown(e, element, 'sw')}
                />
              </>
            )}
          </div>
          <span className="mt-1 text-sm font-medium select-none pointer-events-none">
            {element.text}
          </span>
        </div>
      ))}
    </div>
  );
};

export default DiagramCanvas;