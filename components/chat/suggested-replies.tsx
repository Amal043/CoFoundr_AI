"use client";

import { motion } from "framer-motion";

interface SuggestedRepliesProps {
  replies: string[];
  onSelectReply: (reply: string) => void;
  disabled?: boolean;
}

export function SuggestedReplies({ replies, onSelectReply, disabled = false }: SuggestedRepliesProps) {
  if (!replies || replies.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 py-3">
      {replies.map((reply, index) => (
        <motion.button
          key={reply}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25, delay: index * 0.05 }}
          onClick={() => !disabled && onSelectReply(reply)}
          disabled={disabled}
          className="rounded-full border border-white/10 bg-slate-900/60 px-4 py-1.5 text-xs text-slate-300 transition duration-300 hover:border-violet-400/50 hover:bg-violet-500/10 hover:text-white disabled:pointer-events-none disabled:opacity-50"
        >
          {reply}
        </motion.button>
      ))}
    </div>
  );
}
