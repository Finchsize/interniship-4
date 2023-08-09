export function Status() {
  return (
    <div className="flex flex-row gap-4 rounded-full border-2 border-neutral-300 px-5 py-1.5">
      <div className="flex items-center gap-2 text-green-800">
        <div className="relative flex items-center justify-center">
          <span className="h-2 w-2 rounded-full bg-green-800" />
          <span className="absolute h-2 w-2 animate-ping rounded-full bg-green-800" />
        </div>
        <p>Active</p>
      </div>
      <div className="flex items-center justify-center gap-2">
        <span className="font-icons text-lg">group</span>
        <p>110</p>
      </div>
    </div>
  );
}
