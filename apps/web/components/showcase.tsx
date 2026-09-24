"use client";

import * as React from "react";
import { RiArrowRightUpLine, RiCheckLine, RiMoonLine } from "@remixicon/react";

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
} from "@workspace/ui/components/avatar";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { Input } from "@workspace/ui/components/input";
import { Kbd, KbdGroup } from "@workspace/ui/components/kbd";
import { Label } from "@workspace/ui/components/label";
import { Progress } from "@workspace/ui/components/progress";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { Slider } from "@workspace/ui/components/slider";
import { Spinner } from "@workspace/ui/components/spinner";
import { Switch } from "@workspace/ui/components/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import { Toggle } from "@workspace/ui/components/toggle";

/** Each tile renders the real component, not a picture of one. */
function Tile({
  name,
  href,
  children,
}: {
  name: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group ring-glow relative flex w-64 shrink-0 snap-start flex-col overflow-hidden rounded-xl border bg-surface-2 transition-colors pointer-fine:hover:bg-surface-3/50">
      <div
        inert
        className="flex min-h-32 flex-1 items-center justify-center p-6"
      >
        {children}
      </div>
      <a
        href={href}
        className="flex items-center justify-between gap-2 border-t px-3.5 py-2"
      >
        <span className="truncate text-xs font-medium">{name}</span>
        <RiArrowRightUpLine className="size-3.5 shrink-0 text-muted-foreground transition-[opacity,transform] pointer-fine:group-hover:-translate-y-0.5 pointer-fine:group-hover:text-foreground" />
      </a>
    </div>
  );
}

/** Breaks the container so the row bleeds off both edges. */
function Row({ children }: { children: React.ReactNode }) {
  return (
    <div className="-mx-6 mt-6 scrollbar-subtle overflow-x-auto">
      <div className="flex w-max snap-x snap-mandatory gap-4 px-6 pb-2">
        {children}
      </div>
    </div>
  );
}

const CATEGORIES = [
  {
    value: "actions",
    label: "Actions",
    tiles: (
      <>
        <Tile name="Button" href="/docs/components/button">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Button>Continue</Button>
            <Button variant="outline">Cancel</Button>
            <Button variant="ghost" size="icon">
              <RiMoonLine />
            </Button>
          </div>
        </Tile>
        <Tile name="Toggle" href="/docs/components/toggle">
          <Toggle>
            <RiCheckLine />
            Toggle
          </Toggle>
        </Tile>
        <Tile name="Kbd" href="/docs/components/kbd">
          <KbdGroup>
            <Kbd>⌘</Kbd>
            <Kbd>Shift</Kbd>
            <Kbd>P</Kbd>
          </KbdGroup>
        </Tile>
        <Tile name="Badge" href="/docs/components/badge">
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </Tile>
      </>
    ),
  },
  {
    value: "forms",
    label: "Forms",
    tiles: (
      <>
        <Tile name="Switch" href="/docs/components/switch">
          <div className="flex items-center gap-2.5">
            <Switch defaultChecked id="showcase-switch" />
            <Label htmlFor="showcase-switch" className="text-xs">
              Reduced motion
            </Label>
          </div>
        </Tile>
        <Tile name="Slider" href="/docs/components/slider">
          <Slider defaultValue={[62]} className="w-full" />
        </Tile>
        <Tile name="Checkbox" href="/docs/components/checkbox">
          <div className="flex items-center gap-2.5">
            <Checkbox defaultChecked id="showcase-checkbox" />
            <Label htmlFor="showcase-checkbox" className="text-xs">
              Copy source into repo
            </Label>
          </div>
        </Tile>
        <Tile name="Input" href="/docs/components/input">
          <Input placeholder="you@example.com" />
        </Tile>
      </>
    ),
  },
  {
    value: "feedback",
    label: "Feedback",
    tiles: (
      <>
        <Tile name="Progress" href="/docs/components/progress">
          <div className="flex w-full flex-col gap-3">
            <Progress value={38} />
            <Progress value={72} />
          </div>
        </Tile>
        <Tile name="Spinner" href="/docs/components/spinner">
          <Spinner className="size-6" />
        </Tile>
        <Tile name="Skeleton" href="/docs/components/skeleton">
          <div className="flex w-full flex-col gap-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </Tile>
        <Tile name="Avatar" href="/docs/components/avatar">
          <AvatarGroup>
            <Avatar>
              <AvatarFallback>SX</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>FB</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>UI</AvatarFallback>
            </Avatar>
          </AvatarGroup>
        </Tile>
      </>
    ),
  },
];

export function Showcase({ count }: { count: number }) {
  return (
    <Tabs defaultValue="actions">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <p className="text-sm text-muted-foreground">
          <strong className="font-medium text-foreground">{count}</strong>{" "}
          components:
        </p>
        <TabsList className="w-auto">
          {CATEGORIES.map((category) => (
            <TabsTrigger key={category.value} value={category.value}>
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {CATEGORIES.map((category) => (
        <TabsContent key={category.value} value={category.value}>
          <Row>{category.tiles}</Row>
        </TabsContent>
      ))}
    </Tabs>
  );
}
