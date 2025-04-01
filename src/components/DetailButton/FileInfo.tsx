import React, { useEffect, useRef } from 'react';
import "./adjust.css";
import FileType from './FileType';

interface FileInfo {
  created_at: string;
  deleted_at: string,
  description: string;
  id : string,
  is_deleted : boolean,
  is_folder: boolean,
  name: string;
  opened_at : string,
  owner_id :string,
  parent_folder_id: string;
  storage_detail: {
    file_size: number;
    mime_type: string;
  };
  mime_type: string,
  tags:string[],
  total_size :number,
  updated_at: string,
}

interface selectedFilePermissionInter{
  access_secure_file: boolean,
  can_share: true,
  file_id: string,
  permission_type: number,
  user: {
    email: string,
    first_name: string,
    image: string,
    last_name: string
  },
  user_id: string
} 
interface SidebarProps {
  isOpen: boolean;
  fileInfo?: FileInfo | null
  onClose: () => void;
  selectedFilePermission?: selectedFilePermissionInter[];
  parentFolderName: string
}

const FileInfo: React.FC<SidebarProps> = ({ isOpen, fileInfo, onClose,selectedFilePermission,parentFolderName }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  // Xử lý nhấp chuột bên ngoài để đóng FileInfo
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup listener khi component unmount hoặc isOpen thay đổi
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-0 right-0 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } w-96 p-6 z-40 overflow-y-auto `}
    >
      <button
        className="absolute top-4 right-4 text-2xl font-bold text-gray-500 hover:text-gray-700"
        onClick={onClose}
      >
        ×
      </button>
      {fileInfo ? (
        <div className="flex flex-col w-full h-full mt-5 font min-h-screen">
          <div className="flex-[1] flex gap-1 border-b border-gray-300 font-bold text-[18px]">
            <div><FileType fileName={fileInfo.storage_detail.mime_type}></FileType> </div>
            <div className="text-1xl">{fileInfo.name}</div>
          </div>
          <div className="flex-[9] flex flex-col">
            <div className="border-b border-gray-300 flex flex-col gap-3 pt-5">
              <div className="w-full h-[150px] border">cac</div>
              <div className="flex flex-col">
                <div>Người có quyền truy cập</div>
                <div>avatar</div>
              </div>
              <button className="w-[70%] py-2 rounded-2xl border mb-5 hover:bg-gray-200">
                Quản lý quyền truy cập
              </button>
            </div>
            <div className="pt-5 flex flex-col gap-10">
              <div className="flex flex-col">
                <div className="font-bold">Properties</div>
                <div className="flex">
                  <div className="flex-[4] text-gray-400">Name</div>
                  <div className="flex-[6]">{fileInfo.name}</div>
                </div>
                <div className="flex">
                  <div className="flex-[4] text-gray-400">Saved in</div>
                  <div className="flex-[6]">
                    {parentFolderName ? parentFolderName : <span className="text-gray-300">(No parent folder)</span>}
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-[4] text-gray-400">Size</div>
                  <div className="flex-[6]">{(fileInfo.storage_detail.file_size*0.000001).toFixed(4)}MB</div>
                </div>
                <div className="flex">
                  <div className="flex-[4] text-gray-400">Modified</div>
                  <div className="flex-[6]">{fileInfo.updated_at.substring(0,10)}</div>
                </div>
                <div className="flex">
                  <div className="flex-[4] text-gray-400">Type</div>
                  <div className="flex-[6]">{fileInfo.storage_detail.mime_type.split(".").pop()?.toLowerCase()}</div>
                </div>
                <div className="flex">
                  <div className="flex-[4] text-gray-400">Uploaded by</div>
                  <div className="flex-[6]">{selectedFilePermission && selectedFilePermission.length > 0 
                      ? selectedFilePermission[0].user?.email 
                      : 'Unknown'}</div>
                </div>
                <div className="flex">
                  <div className="flex-[4] text-gray-400">Date uploaded</div>
                  <div className="flex-[6]">{fileInfo.created_at.slice(0,10)}</div>
                </div>
                <div className="flex">
                  <div className="flex-[4] text-gray-400">Description</div>
                  <div className="flex-[6]">{fileInfo.description}</div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="font-bold">Tags</div>
                <input
                  className="w-full rounded-xl border-black border p-2"
                  placeholder="Add a tag"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No File Information</p>
      )}
    </div>
  );
};

export default FileInfo;