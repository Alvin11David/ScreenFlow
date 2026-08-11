import { useState, useEffect } from "react";
import { Command } from "cmdk";
import { Search, Laptop, CreditCard, HelpCircle } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { APP_URL } from "@/lib/utils";

export function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    const openFromNavbar = () => setOpen(true);
    document.addEventListener("keydown", down);
    window.addEventListener("open-command-palette", openFromNavbar);
    return () => {
      document.removeEventListener("keydown", down);
      window.removeEventListener("open-command-palette", openFromNavbar);
    };
  }, []);

  function close() {
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 overflow-hidden shadow-2xl bg-background/95 backdrop-blur-xl border-white/10 sm:max-w-[600px] gap-0">
        <Command className="w-full flex flex-col bg-transparent">
          <div className="flex items-center border-b border-white/10 px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Command.Input
              placeholder="Type a command or search..."
              className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2">
            <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
              No results found.
            </Command.Empty>
            <Command.Group heading="Suggestions" className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
              <Command.Item
                className="flex cursor-pointer items-center rounded-sm px-2 py-2.5 text-sm hover:bg-white/10 aria-selected:bg-white/10 transition-colors"
                onSelect={() => {
                  close();
                  window.open(APP_URL, "_blank", "noopener,noreferrer");
                }}
              >
                <Laptop className="mr-2 h-4 w-4" />
                <span>Go to ScreenFlow App</span>
              </Command.Item>
              <Command.Item
                className="flex cursor-pointer items-center rounded-sm px-2 py-2.5 text-sm hover:bg-white/10 aria-selected:bg-white/10 transition-colors"
                onSelect={() => { close(); window.location.href = "/#pricing"; }}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Pricing Plans</span>
              </Command.Item>
              <Command.Item
                className="flex cursor-pointer items-center rounded-sm px-2 py-2.5 text-sm hover:bg-white/10 aria-selected:bg-white/10 transition-colors"
                onSelect={() => { close(); window.location.href = "/#faq"; }}
              >
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>FAQ</span>
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
