
import React from 'react';
import { Folder, HardDrive, Star, Trash2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export const Sidebar = () => {
  return (
    <div className="w-64 bg-sidebar border-r flex flex-col h-full">
      <div className="p-4">
        <h1 className="text-xl font-semibold text-sidebar-primary">File Manager</h1>
      </div>
      
      <nav className="flex-1">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {[
              { icon: HardDrive, label: 'All Files', path: '/' },
              { icon: Star, label: 'Starred', path: '/starred' },
              { icon: Trash2, label: 'Trash', path: '/trash' },
            ].map((item) => (
              <button
                key={item.label}
                className="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-sidebar-accent group text-sidebar-foreground"
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="p-4 border-t">
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-sidebar-foreground">
            <span>Storage</span>
            <span>75% used</span>
          </div>
          <Progress value={75} className="h-2" />
          <p className="text-xs text-sidebar-foreground">15.5 GB of 20 GB used</p>
        </div>
      </div>
    </div>
  );
};
