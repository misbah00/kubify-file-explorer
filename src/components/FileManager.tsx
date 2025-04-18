
import React, { useState } from 'react';
import { FileExplorer } from './FileExplorer';
import { Sidebar } from './FileManagerSidebar';
import { Breadcrumb } from './Breadcrumb';
import { Upload, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

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
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      toast({
        title: "Upload Started",
        description: `Uploading ${files.length} file(s)...`,
      });
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="border-b p-4 flex justify-between items-center bg-white">
          <div className="flex items-center gap-4">
            <Breadcrumb path={currentPath} onNavigate={setCurrentPath} />
            <span className="text-sm text-gray-500">Welcome, {user?.username}</span>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => document.getElementById('file-upload')?.click()}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Files
            </Button>
            <Button
              variant="outline"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
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
