"use client";

interface ChoiceCardProps {
  icon: string;
  label: string;
  sub?: string;
  selected?: boolean;
  onClick: () => void;
}

export default function ChoiceCard({ icon, label, sub, selected, onClick }: ChoiceCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-150 active:scale-[0.98] ${
        selected
          ? "bg-orange-500/10 border-orange-500 text-white"
          : "bg-zinc-900 border-zinc-700 hover:border-zinc-500 text-zinc-200"
      }`}
    >
      <span className="text-2xl">{icon}</span>
      <div>
        <p className="font-bold text-base">{label}</p>
        {sub && <p className="text-zinc-400 text-xs mt-0.5">{sub}</p>}
      </div>
    </button>
  );
}
