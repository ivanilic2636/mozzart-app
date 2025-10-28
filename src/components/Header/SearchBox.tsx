type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};

export default function SearchBox({ value, onChange, placeholder }: Props) {
  return (
    <div className="w-full md:w-72">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "Search team…"}
        className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
      />
    </div>
  );
}
