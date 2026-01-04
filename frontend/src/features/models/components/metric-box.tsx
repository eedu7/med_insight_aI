export const MetricBox = ({ label, value }: { label: string; value: number }) => (
    <div className="bg-muted/30 p-6 rounded-3xl border border-border/50 backdrop-blur-md">
        <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-2">{label}</p>
        <p className="text-3xl font-mono font-bold text-foreground">{(value * 100).toFixed(2)}%</p>
    </div>
);