'use client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import FolderHover from "./FolderHover"
import FileHover from "./FIleHover"
import { useEffect, useState } from "react"
import axios from "axios"

interface FolderInfo {
    created_at: string,
    description: string,
    has_password: boolean,
    id: string,
    is_folder: boolean,
    is_secure: boolean,
    name: string,
    opened_at: string,
    owner_id: string,
    parent_folder_id: string,
    updated_at: string
}

export function AccordionDemo({id}: {id: string|undefined}) {
  const [folderInfo, setFolderInfo] = useState<FolderInfo | null>(null);
  const [subFolders, setSubFolders] = useState<any[]>([]);
  useEffect(() => {
    const handle = async () => {
      try {
        const res = await axios.get(`https://storage-app.spsohcmut.xyz/api/v1/files/${id}/metadata`)
        setFolderInfo(res.data.data);

        const resp = await axios.get(`https://storage-app.spsohcmut.xyz/api/v1/files/${id}/sub-file`, {
          params: {
            sort_by: "created_at",
            is_asc: true,
            offset: 0,
            limit: 10,
          }
        });
        setSubFolders(resp.data.data.data);
      } catch (error) {
        console.error("Error fetching file data:", error);
      }
    };
    handle();
  }, [id])

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="1">
        <AccordionTrigger 
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <FolderHover name={folderInfo?.name || "Loading..."} />
        </AccordionTrigger>
        <AccordionContent className="px-3">
          {subFolders.map((sub, index) => (
            sub.is_folder ? 
              <AccordionDemo key={sub.id || index} id={sub.id} /> :
              <FileHover key={sub.id || index} name={sub.name} />
          ))}
        </AccordionContent>
      </AccordionItem>
   </Accordion>
  )
}