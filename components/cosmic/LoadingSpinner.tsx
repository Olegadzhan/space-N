export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-space-black flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-neon-blue mb-6"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="animate-ping rounded-full h-16 w-16 border-t-4 border-b-4 border-cosmic-pink"></div>
          </div>
        </div>
        <h2 className="text-2xl font-orbitron text-neon-blue mb-2">Loading Cosmic Data...</h2>
        <p className="text-gray-400">Preparing your interstellar journey</p>
      </div>
    </div>
  )
}
