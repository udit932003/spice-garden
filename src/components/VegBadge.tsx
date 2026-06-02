export default function VegBadge({ isVeg }: { isVeg: boolean }) {
  const color = isVeg ? "border-green-600" : "border-red-600";
  const dot = isVeg ? "bg-green-600" : "bg-red-600";
  return (
    <span
      className={`grid h-4 w-4 place-items-center rounded-sm border ${color}`}
      title={isVeg ? "Vegetarian" : "Non-vegetarian"}
    >
      <span className={`h-2 w-2 rounded-full ${dot}`} />
    </span>
  );
}
