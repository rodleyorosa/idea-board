import type { LucideIcon } from "lucide-react";

interface TaskFieldProps {
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}

export function TaskField({
  icon: Icon,
  iconBgColor,
  iconColor,
  label,
  required = false,
  children,
}: TaskFieldProps) {
  return (
    <div className="group">
      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
        <div
          className={`w-5 h-5 ${iconBgColor} rounded-lg flex items-center justify-center group-hover:opacity-90 transition-opacity`}
        >
          <Icon className={`w-3 h-3 ${iconColor}`} />
        </div>
        <span>{label}</span>
        {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}
