import React from "react";
import FileCard from "./FileCard";
interface PermissionInFile {
  user_id : string,
  permission_type: number,
  user_image:string
}

interface PermissionInFile {
  user_id : string,
  permission_type: number,
  user_image:string
}

interface File {
  created_at : string,
  deleted_at: string,
  description : string,
  id : string,
  is_deleted : boolean,
  is_folder: boolean,
  name : string,
  opened_at : string,
  owner_id : string,
  parent_folder_id : string,
  permission_type : number,
  permissions : PermissionInFile[],
  storage_detail :{
      file_size : number,
      mime_type : string,
  }
  tags : string,
  total_size : number,
  updated_at : string
}
const ListOfFile = ({ files } :{files:File[]}) => {
  return (
    <div className="w-full h-full flex items-center gap-5 flex-wrap">
      {files.map((file, index) => (
        <FileCard 
          key={index}
          fileId = {file.id}
          filename={file.name}
          filetype={file.storage_detail.mime_type}
          file_size={file.storage_detail.file_size}
        />
      ))}
    </div>
  );
};

export default ListOfFile;
