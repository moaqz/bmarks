export function BookmarkCardSkeleton() {
  return (
    <div className="flex border bg-gray-2 rounded border-gray-3 px-4 py-3 gap-3">
      <div className="inline-flex items-start flex-shrink-0">
        <div className="size-8 bg-gray-3 rounded-lg animate-pulse"></div>
      </div>

      <div className="w-full space-y-3">
        <div className="bg-gray-3 animate-pulse rounded-lg w-1/2 h-2"></div>
        <div className="space-y-2">
          <div className="w-full h-2 bg-gray-3 animate-pulse rounded-lg"></div>
          <div className="w-1/2 h-2 bg-gray-3 animate-pulse rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}
