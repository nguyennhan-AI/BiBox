"use client"

import * as React from "react"

import { Progress } from "@/components/ui/progress"

export function ProgressDemo({subSize}:{subSize:number|null}) {
  const [progress, setProgress] = React.useState(0)
  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(subSize||0), 500)
    return () => clearTimeout(timer)
  }, [subSize])

  return <Progress value={progress} className="w-full" />
}
