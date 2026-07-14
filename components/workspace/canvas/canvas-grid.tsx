"use client";

import { Sparkles } from "lucide-react";
import { WorkspaceCanvas } from "@/types/workspace";
import { FieldCard } from "../editor/field-card";

interface CanvasGridProps {
  canvas: WorkspaceCanvas;
  onSaveField: (key: keyof WorkspaceCanvas, val: string) => void;
}

export function CanvasGrid({ canvas, onSaveField }: CanvasGridProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Sparkles className="size-5 text-cyan-300" />
          Business Model Canvas
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          The 9 key elements of your startup model. Click any card to edit.
        </p>
      </div>

      {/* Grid container */}
      <div className="grid gap-4 lg:grid-cols-5 lg:grid-rows-2 min-h-[500px]">
        {/* 1. Key Partners */}
        <div className="lg:row-span-2">
          <FieldCard
            label="Key Partners"
            value={canvas.partners}
            onSave={(val) => onSaveField("partners", val)}
            className="h-full flex flex-col"
          />
        </div>

        {/* Column 2: Activities & Resources */}
        <div className="flex flex-col gap-4 lg:row-span-2">
          <FieldCard
            label="Key Activities"
            value={canvas.activities}
            onSave={(val) => onSaveField("activities", val)}
            className="flex-1"
          />
          <FieldCard
            label="Key Resources"
            value={canvas.resources}
            onSave={(val) => onSaveField("resources", val)}
            className="flex-1"
          />
        </div>

        {/* 3. Value Propositions */}
        <div className="lg:row-span-2">
          <FieldCard
            label="Value Propositions"
            value={canvas.valuePropositions}
            onSave={(val) => onSaveField("valuePropositions", val)}
            highlight
            className="h-full flex flex-col border-cyan-500/20"
          />
        </div>

        {/* Column 4: Relationships & Channels */}
        <div className="flex flex-col gap-4 lg:row-span-2">
          <FieldCard
            label="Customer Relationships"
            value={canvas.relationships}
            onSave={(val) => onSaveField("relationships", val)}
            className="flex-1"
          />
          <FieldCard
            label="Channels"
            value={canvas.channels}
            onSave={(val) => onSaveField("channels", val)}
            className="flex-1"
          />
        </div>

        {/* 5. Customer Segments */}
        <div className="lg:row-span-2">
          <FieldCard
            label="Customer Segments"
            value={canvas.segments}
            onSave={(val) => onSaveField("segments", val)}
            className="h-full flex flex-col"
          />
        </div>
      </div>

      {/* Bottom Row: Cost Structure & Revenue Streams */}
      <div className="grid gap-4 sm:grid-cols-2">
        <FieldCard
          label="Cost Structure"
          value={canvas.costs}
          onSave={(val) => onSaveField("costs", val)}
          className="min-h-[140px]"
        />
        <FieldCard
          label="Revenue Streams"
          value={canvas.revenues}
          onSave={(val) => onSaveField("revenues", val)}
          highlight
          className="min-h-[140px] border-violet-500/20"
        />
      </div>
    </div>
  );
}
