
import React from 'react';
import { FileItem } from './FileManager';
import { File, Folder } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface FileExplorerProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const FileExplorer: React.FC<FileExplorerProps> = ({ currentPath, onNavigate }) => {
  // Mock data - in a real app, this would come from an API
  const items: FileItem[] = [
    {
      id: '1',
      name: 'Documents',
      type: 'folder',
      modified: new Date(),
      path: '/documents'
    },
    {
      id: '2',
      name: 'Images',
      type: 'folder',
      modified: new Date(),
      path: '/images'
    },
    {
      id: '3',
      name: 'report.pdf',
      type: 'file',
      size: 1024 * 1024,
      modified: new Date(),
      path: '/report.pdf'
    }
  ];

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '-';
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${Math.round(bytes / Math.pow(1024, i))} ${sizes[i]}`;
  };

  return (
    <div className="flex-1 overflow-auto p-4">
      <table className="w-full">
        <thead>
          <tr className="text-left border-b">
            <th className="pb-2 font-medium">Name</th>
            <th className="pb-2 font-medium">Size</th>
            <th className="pb-2 font-medium">Modified</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr
              key={item.id}
              className="group hover:bg-gray-50 cursor-pointer"
              onClick={() => item.type === 'folder' && onNavigate(item.path)}
            >
              <td className="py-2 flex items-center">
                {item.type === 'folder' ? (
                  <Folder className="h-5 w-5 mr-2 text-purple-600" />
                ) : (
                  <File className="h-5 w-5 mr-2 text-blue-600" />
                )}
                {item.name}
              </td>
              <td className="py-2 text-gray-600">{formatFileSize(item.size)}</td>
              <td className="py-2 text-gray-600">
                {formatDistanceToNow(item.modified, { addSuffix: true })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
