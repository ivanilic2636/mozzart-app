export function statusBadgeClasses(status: string) {
  const v = status.toLowerCase();
  if (v === "live") return "bg-red-100 text-red-700";
  if (v === "finished") return "bg-gray-100 text-gray-700";
  if (v === "upcoming") return "bg-blue-100 text-blue-700";
  return "bg-indigo-100 text-indigo-800";
}
