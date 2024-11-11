import { useState } from 'react';
import MainLayout from './components/Layout/MainLayout';
import DiagramCanvas from './components/Canvas/DiagramCanvas';
import Toolbar from './components/Toolbar/Toolbar';
import PropertyPanel from './components/PropertyPanel/PropertyPanel';

interface DiagramElement {
  id: string;
  type: 'task' | 'event' | 'gateway';
  position: { x: number; y: number };
  size: { width: number; height: number };
  text: string;
}

function App() {
  const [elements, setElements] = useState<DiagramElement[]>([]);

  const handleAddElement = (type: 'task' | 'event' | 'gateway') => {
    const newElement: DiagramElement = {
      id: `element-${Date.now()}`,
      type,
      position: { x: 100, y: 100 },
      size: { width: 100, height: 100 },
      text: type.charAt(0).toUpperCase() + type.slice(1)
    };
    setElements([...elements, newElement]);
  };

  return (
    <MainLayout>
      <div className="flex flex-col h-full">
        <Toolbar onAddElement={handleAddElement} />
        <div className="flex flex-1 gap-4">
          <DiagramCanvas 
            elements={elements}
            onElementsChange={setElements}
          />
          <PropertyPanel />
        </div>
      </div>
    </MainLayout>
  );
}

export default App;