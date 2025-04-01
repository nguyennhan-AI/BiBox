  'use client';
  import React, { useRef, useState,ChangeEvent } from 'react';
  import { FileUp, FolderUp } from "lucide-react";
  import { useParams } from 'next/navigation';
  import { Button } from "@/components/ui/button";
  import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import axios from 'axios';
  import useStore from '../zustand/zustandstore';
  import { toast } from 'sonner';



  const UploadButton = () => {
    const {setAct} = useStore();
    const params = useParams(); 
    const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug ?? null;
    const [selectedFiles, setSelectedFiles] = useState<File | null>(null);
    const [selectedFolders,setSelectedFolders] = useState<FileList | null>(null);
    const [treeData, setTreeData] = useState<TreeNode | null>(null);
    const [loadedFileName,setLoadedFileName] = useState('');

    interface TreeNode {
      data: {
        file?: File,
        name: string;
        type: 'file' | 'directory';
        size: number;
        filetype: string;
      };
      children?: TreeNode[];
    }
    function buildTreeFromFiles(files: FileList | null): TreeNode | null {
      if (!files) return null;

      const root: TreeNode = {
        data: { name: "root", type: "directory", size: 0, filetype: '' },
        children: []
      };

      for (const file of files) {
        const pathParts = file.webkitRelativePath.split("/");
        let currentLevel = root;

        for (let i = 0; i < pathParts.length; i++) {
          const part = pathParts[i];
          if (i === pathParts.length - 1) {
            currentLevel.children!.push({
              data: { name: part, type: "file", size: file.size, filetype: file.type ,file:file}
            });
            let parent = currentLevel;
            while (parent) {
              parent.data.size += file.size;
              parent = findParent(root, parent);
            }
          } else {
            let existingNode = currentLevel.children!.find(
              (child) => child.data.name === part && child.data.type === "directory"
            );
            if (!existingNode) {
              existingNode = {
                data: { name: part, type: "directory", size: 0, filetype: '' },
                children: []
              };
              currentLevel.children!.push(existingNode);
            }
            currentLevel = existingNode;
          }
        }
      }
      return root.children!.length > 0 ? root.children![0] : null;
    }
    function findParent(root: TreeNode, target: TreeNode): TreeNode | null {
      if (!root.children) return null;
      for (const child of root.children) {
        if (child === target) return root;
        const parent = findParent(child, target);
        if (parent) return parent;
      }
      return null;
    }


    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
        const file= event.target.files[0];
        setSelectedFiles(file);
        setLoadedFileName(file.name);
      }
    };


    const folderInputRef = useRef<HTMLInputElement>(null);
    const handleFolderChange = (event: ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      const tree = buildTreeFromFiles(files);
      setTreeData(tree);
      setSelectedFolders(files);
    };

    const handleButtonClick = () => {
      fileInputRef.current?.click();
    };
    const handleButtonClick1 = () => {
      folderInputRef.current?.click();
    };

    async function uploadFolder(root: TreeNode | null, parent_ID: null | string) {
      try {
        if (!root || !root.data) return;
        const isFolder = root.data.type === 'directory';
        console.log("Folder sizeeeeeeeeeeeeeeeeeee,", root.data.size);
        const res = await axios.post('https://storage-app.spsohcmut.xyz/api/v1/files/add', {
          "description": '',
          "has_password": false,
          "is_folder": isFolder,
          "is_secure": false,
          "name": root.data.name,
          "parent_folder_id": parent_ID,
          "password": '',
          "storage_detail": {
            "mime_type": root.data.filetype,
            "size": root.data.size,
          },
          "tags": []
        });
        // setAct();
        const ID_parent = res.data.data.id;
        if (root.data.type === 'file' && root.data.file) {
          setLoadedFileName(root.data.name);
          const presignedUrl = res.data.data.put_object_url;
          const toastId = toast.loading(`Uploading ${root.data.name}: 0%`);
          const uploadResponse = await axios.put(presignedUrl, root.data.file, { 
            headers: {
              "Content-Type": root.data.filetype
            },
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / (progressEvent.total || 1)
              );
              toast.loading(`Uploading ${root.data.name}: ${percentCompleted}%`, { id: toastId });
            },
          });
    
          if (uploadResponse.status === 200) {
            toast.success(`${root.data.name} uploaded successfully!`, { id: toastId });
            const patchResponse = await axios.patch(`https://storage-app.spsohcmut.xyz/api/v1/files/${ID_parent}/uploaded`);
            console.log(patchResponse.status === 201);
          } else {
            toast.error(`Failed to upload ${root.data.name}`, { id: toastId });
          }
        }
        if (root.children && root.children.length > 0) {
          for (const child of root.children) {
            await uploadFolder(child, ID_parent);
          }
        }
        setAct();
      } 
      catch (error) {
        console.error('Error uploading:', error);
        throw error;
      }
    }


    //File submit
    const handleSubmitFile = async () => {
      if (!selectedFiles) {
        console.error('No file selected!');
        return;
      }
      const parent_folder_id = slug === undefined ? null : slug;
      const res = await axios.post('https://storage-app.spsohcmut.xyz/api/v1/files/add',
      {
        "description": '',
        "has_password": false,
        "is_folder": false,
        "is_secure": false,
        "name": selectedFiles?.name,
        "parent_folder_id": parent_folder_id,
        "password": '',
        "storage_detail": {
          "mime_type": selectedFiles?.type,
          "size": selectedFiles?.size
        },
        "tags": [ 
        ]
      });
      const presignedUrl = res.data.data.put_object_url;
      const toastId = toast.loading(`Uploading ${selectedFiles.name}: 0%`);
      const uploadResponse = await axios.put(presignedUrl, selectedFiles, { 
        headers: {
          "Content-Type": selectedFiles?.type
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          toast.loading(`Uploading ${selectedFiles.name}: ${percentCompleted}%`, { id: toastId });
        },
      });

      if (uploadResponse.status === 200) {
        toast.success(`${selectedFiles.name} uploaded successfully!`, { id: toastId });
        setAct();
        const patchResponse = await axios.patch(`https://storage-app.spsohcmut.xyz/api/v1/files/${res.data.data.id}/uploaded`)
        console.log(patchResponse.status===201);   
      } else {
        toast.error(`Failed to upload ${selectedFiles.name}`, { id: toastId });
      }
    };

    const resetInputs = () => {
      setSelectedFiles(null);
      setSelectedFolders(null);
      setTreeData(null);
      setLoadedFileName('');
      if (fileInputRef.current) fileInputRef.current.value = '';
      if (folderInputRef.current) folderInputRef.current.value = '';
    }; 

    const handleUpload = async () => {
      if (selectedFiles && fileInputRef.current) {
        await handleSubmitFile();
        resetInputs();
      } else if (treeData) {
        const parent_folder_id = slug === undefined ? null : slug;
        await uploadFolder(treeData, parent_folder_id);
        resetInputs();
      }
    };


    return (
      <Dialog>
        <DialogTrigger asChild>
          <button className="w-[130px] mt-5 h-[38px] bg-[#7DAFAF] rounded-2xl items-center hover:bg-black">
            <div className="text-black text-center hover:text-white font-semibold">UPLOAD</div>
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload your files and folders</DialogTitle>
            <DialogDescription>Choose file or folder</DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="folder-upload" className="sr-only">
                Folder
              </Label>
              <Input placeholder="Upload your Folder" readOnly value={selectedFolders ? `${selectedFolders.length} files selected` : ""}/>
            </div>
            <Button type="button" size="sm" className="px-3" onClick={handleButtonClick1}>
              <FolderUp />
            </Button>
            <input type="file" ref={folderInputRef} className='hidden' onChange={handleFolderChange} webkitdirectory="true" />

            <div className="grid flex-1 gap-2">
              <Label htmlFor="file-upload" className="sr-only">
                File
              </Label>
              <Input placeholder="Upload your File" readOnly value={selectedFiles?.name || ""} />
            </div>
            <Button type="button" size="sm" className="px-3" onClick={handleButtonClick}>
              <FileUp />
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                className="border border-transparent hover:border-black rounded-md hover:shadow-md transition-all"
                onClick={()=>{
                  handleUpload();

                }}
              >
                Upload
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  export default UploadButton;
