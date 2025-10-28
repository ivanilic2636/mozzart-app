import MatchList from "./components/Match/MatchList";

export default function App() {
  return (
    <main className="min-h-dvh bg-white text-gray-900">
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg md:text-xl font-semibold">Live Matches</h1>
          <span className="text-xs md:text-sm text-gray-600">
            Mozzart Task – Part II
          </span>
        </div>
      </header>
      <section className="mx-auto max-w-5xl px-4 py-4">
        <MatchList />
      </section>
    </main>
  );
}
