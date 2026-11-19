import { Skeleton } from "@/registry/mintel/ui/skeleton"

export default function SkeletonExample() {
  return (
    <div className="grid w-full max-w-sm gap-4 rounded-xl border p-5">
      <div className="flex items-center gap-3">
        <Skeleton className="size-10 rounded-full" />
        <div className="grid flex-1 gap-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </div>
      <Skeleton className="h-28 w-full rounded-lg" />
      <div className="grid gap-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
      </div>
    </div>
  )
}
