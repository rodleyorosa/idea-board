import { Zap } from "lucide-react";
import { priorityConfig } from "../../constants";
import type { TaskPriority } from "../../types";

interface PrioritySelectorProps {
  value: TaskPriority;
  onChange: (priority: TaskPriority) => void;
}

export function PrioritySelector({ value, onChange }: PrioritySelectorProps) {
  return (
    <div className="group">
      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
        <div className="w-5 h-5 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
          <Zap className="w-3 h-3 text-orange-600" />
        </div>
        <span>Priority</span>
      </label>
      <div className="grid grid-cols-3 gap-3">
        {priorityConfig.map((config) => (
          <button
            key={config.value}
            type="button"
            onClick={() => onChange(config.value)}
            className={`px-4 py-3 rounded-xl border-2 font-semibold text-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
              value === config.value ? config.activeColor : config.color
            }`}
          >
            <span className="text-lg">{config.icon}</span>
            <span>{config.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
