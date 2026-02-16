import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      
      <div className="relative">
        {/* Outer soft background ring */}
        <div className="w-16 h-16 rounded-full bg-maincolor/10 absolute"></div>

        {/* Spinning icon */}
        <Loader2 className="w-16 h-16 text-maincolor animate-spin relative" />
      </div>
    </div>
  );
}
