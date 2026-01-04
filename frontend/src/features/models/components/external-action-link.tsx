import { Button } from "@/components/ui/button";
import { ExternalLinkIcon } from "lucide-react";

export const ExternalActionLink = ({ label, href }: { label: string; href: string }) => (
    <Button variant="outline" className="w-full justify-between rounded-2xl border-border/40 hover:border-emerald-500/50 hover:bg-emerald-500/5 h-12 text-xs font-bold" asChild>
        <a href={href} target="_blank" rel="noopener noreferrer">
            {label} <ExternalLinkIcon className="h-4 w-4 opacity-30" />
        </a>
    </Button>
);