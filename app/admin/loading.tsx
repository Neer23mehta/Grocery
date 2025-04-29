export default function Loading() {
    return (
      <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-gradient-to-br from-[#FFB300] via-[#FF8F00] to-[#FF6F00]">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="w-20 h-20 rounded-full border-4 border-t-transparent border-b-transparent border-l-white border-r-white animate-spin" />
  
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" />
          </div>
  
          <p className="text-white text-lg font-semibold tracking-wide">Loading, please wait...</p>
        </div>
      </div>
    );
  }
  