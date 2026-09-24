import { Skeleton } from "@workspace/ui/components/skeleton";

export default function DocsLoadingPage() {
  return (
    <div className="flex w-full min-w-0 flex-col gap-4 py-4">
      <Skeleton className="h-9 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-11/12" />
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-4 w-3/5" />
    </div>
  );
}
