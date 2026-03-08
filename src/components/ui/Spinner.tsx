export default function Spinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-10 w-10 border-3",
  };

  return (
    <div
      className={`
        ${sizeClasses[size]}
        rounded-full border-accent/30 border-t-accent animate-spin
      `}
    />
  );
}
