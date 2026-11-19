"use client"

import { useEffect, useState } from "react"

import { FileUpload, type UploadFile } from "@/registry/mintel/ui/file-upload"

export default function FileUploadExample() {
  const [files, setFiles] = useState<UploadFile[]>([])

  // Fake upload: advance progress on valid files until they reach 100%.
  useEffect(() => {
    if (!files.some((f) => !f.error && (f.progress ?? 0) < 100)) return
    const timer = setTimeout(() => {
      setFiles((list) => list.map((f) => (f.error ? f : { ...f, progress: Math.min(100, (f.progress ?? 0) + 20) })))
    }, 300)
    return () => clearTimeout(timer)
  }, [files])

  return (
    <FileUpload
      locale="en"
      className="w-full max-w-md"
      files={files}
      onFilesChange={setFiles}
      accept=".pdf,image/*"
      maxSize={5 * 1024 * 1024}
    />
  )
}
