"use client"

export function GeometricBackground({ variant = "grid" }: { variant?: "grid" | "dots" | "waves" }) {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#050510]">
      {variant === "grid" && (
        <div 
            className="absolute inset-0 opacity-[0.03]" 
            style={{ 
                backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, 
                backgroundSize: '40px 40px' 
            }} 
        />
      )}
      
      {variant === "dots" && (
        <div 
            className="absolute inset-0 opacity-[0.05]" 
            style={{ 
                backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`, 
                backgroundSize: '24px 24px' 
            }} 
        />
      )}

      {/* Subtle organic gradient orbs for depth */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-mckinsey-900/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-mckinsey-900/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
    </div>
  )
}
