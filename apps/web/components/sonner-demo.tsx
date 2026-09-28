"use client";

import { toast } from "sonner";
import { Button } from "@workspace/ui/components/button";

export function SonnerDemo() {
  return (
    <Button onClick={() => toast("Event has been created")}>Show toast</Button>
  );
}

export function SonnerActionDemo() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast("Message deleted", {
          description: "The message has been removed.",
          action: { label: "Undo", onClick: () => {} },
        })
      }
    >
      Show toast with action
    </Button>
  );
}

export function SonnerTypesDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button size="sm" onClick={() => toast.success("Saved")}>
        Success
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => toast.info("Heads up")}
      >
        Info
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => toast.warning("Warning")}
      >
        Warning
      </Button>
      <Button
        size="sm"
        variant="destructive"
        onClick={() => toast.error("Failed")}
      >
        Error
      </Button>
    </div>
  );
}
