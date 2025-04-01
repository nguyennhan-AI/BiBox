import React from "react";
import FolderCard from "./FolderCard";
interface PermissionInFile {
  user_id: string;
  permission_type: number;
  user_image: string;
}

interface File {
  created_at: string;
  deleted_at: string;
  description: string;
  id: string;
  is_deleted: boolean;
  is_folder: boolean;
  name: string;
  opened_at: string;
  owner_id: string;
  parent_folder_id: string;
  permission_type: number;
  permissions: PermissionInFile[];
  storage_detail: {
    file_size: number;
    mime_type: string;
  };
  tags: string;
  total_size: number;
  updated_at: string;
}
const ListOfFolder = ({ folders }: { folders: File[] }) => {
  return (
    <div className="w-full h-full flex items-center gap-10 flex-wrap">
      {folders.map((folder, index) => (
        <FolderCard
          key={index}
          folderId={folder.id}
          foldername={folder.name}
          created_at={folder.created_at}
          is_secured={true}
        />
      ))}
    </div>
  );
};

export default ListOfFolder;
