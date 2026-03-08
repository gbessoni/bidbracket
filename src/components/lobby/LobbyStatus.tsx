import Spinner from "@/components/ui/Spinner";

export default function LobbyStatus() {
  return (
    <div className="flex flex-col items-center gap-3 py-4">
      <Spinner size="md" />
      <p className="text-text-secondary text-sm">
        Waiting for the admin to start the draft...
      </p>
    </div>
  );
}
