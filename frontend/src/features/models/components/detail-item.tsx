export const DetailItem = ({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) => (
    <div className="space-y-2">
        <p className="text-[10px] font-black uppercase text-muted-foreground/50 tracking-widest flex items-center gap-2">
            {icon} {label}
        </p>
        <p className="text-md font-bold text-foreground leading-tight">{value}</p>
    </div>
);