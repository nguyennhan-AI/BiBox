"use client"
 
import * as React from "react"
 
import { Progress } from "@/components/ui/progress"

const MemoryProgress = () => {
    const [progress, setProgress] = React.useState(13)
    React.useEffect(() => {
        const timer = setTimeout(() => setProgress(66), 500)
        return () => clearTimeout(timer)
      }, [])
     
    return(
        <div>
            <div className="px-5">
                <Progress value={progress} className="w-[90%] "/>
            </div>
            <div className="text-sm text-gray-500">
                ... has been used out of 10 Gb
            </div>
        </div>
    );
};

export default MemoryProgress;