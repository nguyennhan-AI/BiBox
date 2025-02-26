import React from 'react';
import { FileUp, FolderUp } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const UploadButton = () => {
    return (
        <Dialog>
          <DialogTrigger asChild>
            <button className="w-[130px] mt-5 h-[38px] bg-[#7DAFAF] rounded-2xl items-center hover:bg-black">
                            <div className='text-black text-center hover:text-white  font-semibold'>UPLOAD</div>
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Upload your files and folders</DialogTitle>
              <DialogDescription>
                Choose file or folder
              </DialogDescription>
            </DialogHeader> 
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                  Link
                </Label>
                <Input 
                  placeholder="Upload your Folder"
                  readOnly
                />
              </div>
              <Button type="submit" size="sm" className="px-3">
                <span className="sr-only">upload folder</span>
                <FolderUp/>
              </Button>
              <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                  Link
                </Label>
                <Input
                  placeholder="Upload your File"
                  readOnly
                />
              </div>
              <Button type="submit" size="sm" className="px-3">
                <span className="sr-only">upload folder</span>
                <FileUp />
              </Button>
            </div>
            
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary" className=' border border-transparent hover:border-black rounded-md hover:shadow-md transition-all'>
                  Upload
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )
};

export default UploadButton;