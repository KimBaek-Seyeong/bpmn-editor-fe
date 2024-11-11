import { Circle, Square, Diamond } from 'lucide-react';

interface ToolbarProps {
  onAddElement: (type: 'task' | 'event' | 'gateway') => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onAddElement }) => {
  return (
    <div className="h-16 border-b border-gray-200 bg-white px-4 flex items-center space-x-2">
      <button 
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
        onClick={() => onAddElement('task')}
      >
        <Square className="w-5 h-5" />
        <span>Task</span>
      </button>
      <button 
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
        onClick={() => onAddElement('event')}
      >
        <Circle className="w-5 h-5" />
        <span>Event</span>
      </button>
      <button 
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
        onClick={() => onAddElement('gateway')}
      >
        <Diamond className="w-5 h-5" />
        <span>Gateway</span>
      </button>
    </div>
  );
};

export default Toolbar;