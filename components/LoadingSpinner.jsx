export default function LoadingSpinner() {
  return (
    <div className="flex justify-center py-6">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-sky-200 border-t-sky-500"></div>
    </div>
  );
}