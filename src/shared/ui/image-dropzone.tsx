import { useEffect, useRef, useState } from "react"
import { ImagePlus, X } from "lucide-react"

import { cn } from "@/shared/lib/cn"

interface ImageDropzoneProps {
  /** Called with the selected file, or null when cleared. */
  onChange?: (file: File | null) => void
  /** Accepted MIME types for the file input. */
  accept?: string
  /** Preview image shown before the user picks a file. */
  defaultPreview?: string
  /** Placeholder text shown in the empty state. */
  placeholder?: string
  className?: string
}

export function ImageDropzone({
  onChange,
  accept = "image/jpeg,image/png",
  defaultPreview,
  placeholder = "Drag & drop an image here, or click to browse",
  className,
}: ImageDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const objectUrl = useRef<string | null>(null)
  const [preview, setPreview] = useState<string | null>(defaultPreview ?? null)
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    return () => {
      if (objectUrl.current) URL.revokeObjectURL(objectUrl.current)
    }
  }, [])

  function setFile(file: File | null) {
    if (objectUrl.current) {
      URL.revokeObjectURL(objectUrl.current)
      objectUrl.current = null
    }
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file)
      objectUrl.current = url
      setPreview(url)
      onChange?.(file)
    } else {
      setPreview(defaultPreview ?? null)
      onChange?.(null)
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Upload image"
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          inputRef.current?.click()
        }
      }}
      onDragOver={(e) => {
        e.preventDefault()
        setDragging(true)
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault()
        setDragging(false)
        setFile(e.dataTransfer.files?.[0] ?? null)
      }}
      className={cn(
        "group relative flex min-h-52 cursor-pointer items-center justify-center rounded-lg border border-border bg-background p-4 outline-none transition-colors hover:bg-muted/40 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
        dragging && "border-primary bg-primary/5",
        className,
      )}
    >
      {preview ? (
        <>
          <img
            src={preview}
            alt="Upload preview"
            className="max-h-64 w-auto rounded-md object-contain"
          />
          <button
            type="button"
            aria-label="Remove image"
            onClick={(e) => {
              e.stopPropagation()
              setFile(null)
            }}
            className="absolute top-2 right-2 flex size-7 items-center justify-center rounded-full bg-background/90 text-muted-foreground opacity-0 shadow-sm ring-1 ring-border transition-opacity group-hover:opacity-100 hover:text-destructive focus-visible:opacity-100"
          >
            <X className="size-4" />
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <ImagePlus className="size-8" />
          <p className="text-sm">{placeholder}</p>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />
    </div>
  )
}
