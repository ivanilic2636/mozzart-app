type Props = { message?: string; onRetry?: () => void };

export default function ErrorBanner({ message, onRetry }: Props) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <span className="inline-block h-2 w-2 rounded-full bg-red-500" />
        <span>{message ?? "Something went wrong while loading matches."}</span>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-lg border border-red-300 bg-white/80 px-3 py-1 text-sm text-red-700 hover:bg-red-100"
        >
          Try again
        </button>
      )}
    </div>
  );
}
