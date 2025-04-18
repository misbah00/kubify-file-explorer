
import React from 'react';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbProps {
  path: string;
  onNavigate: (path: string) => void;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ path, onNavigate }) => {
  const parts = path.split('/').filter(Boolean);
  
  return (
    <div className="flex items-center text-sm">
      <button
        onClick={() => onNavigate('/')}
        className="text-gray-600 hover:text-purple-600"
      >
        Home
      </button>
      {parts.map((part, index) => {
        const currentPath = '/' + parts.slice(0, index + 1).join('/');
        return (
          <React.Fragment key={currentPath}>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            <button
              onClick={() => onNavigate(currentPath)}
              className="text-gray-600 hover:text-purple-600"
            >
              {part}
            </button>
          </React.Fragment>
        );
      })}
    </div>
  );
};
