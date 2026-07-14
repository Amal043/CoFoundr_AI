"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Edit2, Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface FieldCardProps {
  id?: string;
  label: string;
  value: string;
  onSave: (newValue: string) => void;
  type?: "input" | "textarea";
  highlight?: boolean;
  className?: string;
}

export function FieldCard({
  id,
  label,
  value,
  onSave,
  type = "textarea",
  highlight = false,
  className = "",
}: FieldCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [showSavedState, setShowSavedState] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync state if external value changes
  useEffect(() => {
    setEditValue(value);
  }, [value]);

  // Focus editor on activation
  useEffect(() => {
    if (isEditing) {
      if (type === "textarea" && textareaRef.current) {
        textareaRef.current.focus();
        // Set cursor to end
        const len = textareaRef.current.value.length;
        textareaRef.current.setSelectionRange(len, len);
      } else if (type === "input" && inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [isEditing, type]);

  const triggerSave = useCallback(() => {
    setIsEditing(false);
    if (editValue.trim() !== value.trim()) {
      onSave(editValue);
      setShowSavedState(true);
      setTimeout(() => setShowSavedState(false), 2000);
    }
  }, [editValue, value, onSave]);

  // Click outside to save
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        if (isEditing) {
          triggerSave();
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isEditing, triggerSave]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setEditValue(value);
      setIsEditing(false);
    }
    if (e.key === "Enter" && type === "input") {
      triggerSave();
    }
    if (e.key === "Enter" && e.ctrlKey && type === "textarea") {
      triggerSave();
    }
  };

  const hasValue = value && value !== "-";

  return (
    <div
      ref={containerRef}
      id={id}
      className={cn(
        "group relative rounded-2xl border transition-all duration-300 p-5 pl-6 overflow-hidden",
        isEditing
          ? "border-violet-500/50 bg-[#090d20]/90 shadow-glow"
          : highlight
          ? "border-cyan-500/40 bg-cyan-950/10 shadow-[0_0_20px_rgba(34,211,238,0.05)]"
          : "border-white/5 bg-slate-950/30 hover:border-white/10 hover:bg-white/[0.01]",
        className
      )}
    >
      {/* Notion Hover Left Border Accent Indicator */}
      <span className={cn(
        "absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-blue-500 to-violet-500 transition-all duration-300 origin-left scale-x-0 group-hover:scale-x-100",
        isEditing && "scale-x-100"
      )} />
      {/* Label and Status Indicators */}
      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-500">
        <span className="flex items-center gap-1.5">
          {highlight && <Sparkles className="size-3 text-cyan-300 animate-pulse" />}
          {label}
        </span>
        <div className="flex items-center gap-2">
          {showSavedState && (
            <span className="flex items-center gap-1 text-[9px] font-semibold text-emerald-400 capitalize transition">
              <Check className="size-3" /> Auto-saved
            </span>
          )}
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="opacity-0 group-hover:opacity-100 flex items-center gap-1 text-[9px] font-semibold text-cyan-400 hover:text-white transition"
              aria-label={`Edit ${label}`}
            >
              <Edit2 className="size-3" /> Edit
            </button>
          )}
        </div>
      </div>

      {/* Editor or Content block */}
      <div className="mt-3.5">
        {isEditing ? (
          type === "input" ? (
            <input
              ref={inputRef}
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full rounded-xl border border-white/15 bg-[#050712] px-3.5 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
            />
          ) : (
            <div className="flex flex-col gap-2">
              <textarea
                ref={textareaRef}
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={Math.max(3, editValue.split("\n").length)}
                className="w-full rounded-xl border border-white/15 bg-[#050712] px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 font-sans leading-relaxed"
              />
              <span className="text-[10px] text-slate-500 text-right font-medium">
                Press <kbd className="rounded border border-white/10 px-1 font-mono">Ctrl</kbd> +{" "}
                <kbd className="rounded border border-white/10 px-1 font-mono">Enter</kbd> to save, or click outside.
              </span>
            </div>
          )
        ) : (
          <div
            onClick={() => setIsEditing(true)}
            className={cn(
              "text-sm leading-7 cursor-text min-h-[1.5rem] transition-colors duration-200",
              hasValue ? "text-slate-300 font-sans" : "text-slate-600 hover:text-slate-400 font-medium"
            )}
          >
            {hasValue
              ? value.split("\n").map((line, i) => (
                  <p key={i} className="mb-2">
                    {line}
                  </p>
                ))
              : "+ Click to add details..."}
          </div>
        )}
      </div>
    </div>
  );
}
