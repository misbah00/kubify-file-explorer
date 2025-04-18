
import React, { useState } from 'react';
import { FileExplorer } from './FileExplorer';
import { Sidebar } from './FileManagerSidebar';
import { Breadcrumb } from './Breadcrumb';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size?: number;
  modified: Date;
  path: string;
}

const FileManager: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>('/');
  const { toast } = useToast();
  
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      toast({
        title: "Upload Started",
        description: `Uploading ${files.length} file(s)...`,
      });
      // In a real app, we would handle the file upload here
    }
  };

  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="border-b p-4 flex justify-between items-center bg-white">
          <Breadcrumb path={currentPath} onNavigate={setCurrentPath} />
          <div>
            <Button
              onClick={() => document.getElementById('file-upload')?.click()}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Files
            </Button>
            <input
              type="file"
              id="file-upload"
              multiple
              className="hidden"
              onChange={handleUpload}
            />
          </div>
        </div>
        <FileExplorer currentPath={currentPath} onNavigate={setCurrentPath} />
      </div>
    </div>
  );
};

export default FileManager;
