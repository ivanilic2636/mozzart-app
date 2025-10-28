export default function SkeletonRow() {
  return (
    <li className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="h-3 w-24 rounded bg-gray-200 animate-pulse" />
        <div className="h-3 w-32 rounded bg-gray-200 animate-pulse" />
      </div>
      <div className="mt-3 flex items-center gap-3">
        <div className="h-5 w-40 rounded bg-gray-200 animate-pulse" />
        <div className="h-6 w-16 rounded bg-gray-200 animate-pulse" />
        <div className="h-5 w-40 rounded bg-gray-200 animate-pulse" />
      </div>
      <div className="mt-3 flex items-center gap-2">
        <div className="h-5 w-20 rounded-full bg-gray-200 animate-pulse" />
        <div className="h-3 w-24 rounded bg-gray-200 animate-pulse" />
        <div className="h-3 w-28 rounded bg-gray-200 animate-pulse" />
      </div>
    </li>
  );
}
