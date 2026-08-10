import { useEffect, useState } from "react";
import { Sparkles, Wrench, Bug, Rocket } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { releaseNotes } from "@/lib/release-notes";

type Group = {
  label: string;
  icon: typeof Sparkles;
  items: string[];
};

function ReleaseGroup({ label, icon: Icon, items }: Group) {
  if (items.length === 0) return null;
  return (
    <div className="mb-4">
      <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary mb-2">
        <Icon className="w-3.5 h-3.5" />
        {label}
      </h4>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li
            key={item}
            className="text-sm text-muted-foreground leading-relaxed flex gap-2"
          >
            <span className="mt-2 w-1 h-1 rounded-full bg-primary/60 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ReleaseNotesDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const openDialog = () => setOpen(true);
    window.addEventListener("open-release-notes", openDialog);
    return () => window.removeEventListener("open-release-notes", openDialog);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[80vh] flex flex-col gap-0 p-0 overflow-hidden sm:max-w-[620px]">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Rocket className="w-5 h-5 text-primary" />
            Release notes
          </DialogTitle>
          <DialogDescription>
            What's new in ScreenFlow — from launch to today.
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto px-6 py-6 space-y-10">
          {releaseNotes.map((note) => {
            const groups: Group[] = [
              { label: "New", icon: Sparkles, items: note.features },
              { label: "Improvements", icon: Wrench, items: note.improvements },
              { label: "Fixes", icon: Bug, items: note.fixes },
            ];
            return (
              <section key={note.version}>
                <div className="flex items-baseline gap-3 mb-3">
                  <h3 className="text-lg font-bold text-foreground">
                    v{note.version}
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    {note.title} · {note.date}
                  </span>
                </div>
                <div className="space-y-4">
                  {groups.map((group) => (
                    <ReleaseGroup key={group.label} {...group} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
