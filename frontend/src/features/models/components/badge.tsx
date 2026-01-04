export const Badge = ({ label, icon }: { label: string; icon?: React.ReactNode }) => (
    <span className="flex items-center gap-2 px-5 py-2 rounded-full bg-muted border border-border text-[11px] font-bold uppercase tracking-tighter">
        {icon} {label}
    </span>
);