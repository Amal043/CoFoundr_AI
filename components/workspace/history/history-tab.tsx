"use client";

import { Clock, RotateCcw, ShieldCheck } from "lucide-react";
import { HistoryRecord, WorkspaceVersion } from "@/types/decision-engine";
import { getHistory, getVersions } from "@/lib/decision-engine/history";
import { useState, useEffect } from "react";

interface HistoryTabProps {
  onRollback: (versionId: string) => void;
}

export function HistoryTab({ onRollback }: HistoryTabProps) {
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const [versions, setVersions] = useState<WorkspaceVersion[]>([]);

  // Load history stack on mount and when LocalStorage events fire
  const loadData = () => {
    setHistory(getHistory());
    setVersions(getVersions());
  };

  useEffect(() => {
    loadData();
    // Simple custom event or polling for history updates
    const interval = setInterval(loadData, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleRevert = (logId: string) => {
    // Find version matching this logId
    const version = versions.find((v) => v.logId === logId);
    if (version) {
      if (confirm("Are you sure you want to revert the workspace to this historical version? This will restore all fields to their state at that time.")) {
        onRollback(version.id);
      }
    }
  };

  if (history.length === 0) {
    return (
      <div className="grid min-h-[300px] place-items-center text-center">
        <div>
          <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-white/[0.02] text-slate-600 border border-white/5">
            <Clock className="size-5.5" />
          </span>
          <h3 className="mt-4 text-sm font-bold text-slate-300">No Change History Yet</h3>
          <p className="mt-1 text-xs text-slate-500 max-w-xs leading-5">
            Once you edit any startup fields and the decision engine compiles changes, they will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Clock className="size-5 text-cyan-300" />
          Workspace Change History
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Inspect, compare, and rollback to previous version snapshots.
        </p>
      </div>

      <div className="relative pl-6 mt-8">
        {/* Connector vertical timeline line */}
        <div className="absolute left-[29px] top-6 bottom-6 w-px bg-white/[0.08]" />

        <div className="space-y-8">
          {history.map((record) => {
            const hasVersion = versions.some((v) => v.logId === record.id);
            const isRevertedLog = record.userAction.startsWith("Undone:");

            return (
              <div key={record.id} className="relative flex gap-5 items-start group z-10">
                {/* Node icon bubble */}
                <div
                  className={`grid size-8 place-items-center rounded-xl border shrink-0 transition-transform ${
                    isRevertedLog
                      ? "text-amber-400 bg-amber-400/10 border-amber-400/25"
                      : "text-cyan-300 bg-cyan-400/10 border-cyan-400/20"
                  }`}
                >
                  <Clock className="size-3.5" />
                </div>

                {/* History details card */}
                <div className="flex-1 rounded-2xl border border-white/5 bg-[#080d20]/30 p-5 hover:border-white/10 hover:bg-[#0c122f]/50 transition">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
                    <div>
                      <h4 className="text-xs font-bold text-slate-200">{record.userAction}</h4>
                      <p className="text-[9px] text-slate-500 font-semibold mt-1 flex items-center gap-1">
                        <Clock className="size-3" /> {record.timestamp}
                      </p>
                    </div>

                    {/* Revert button */}
                    {hasVersion && !isRevertedLog && (
                      <button
                        onClick={() => handleRevert(record.id)}
                        className="shrink-0 flex items-center gap-1.5 rounded-lg border border-white/15 hover:border-violet-500 bg-white/[0.02] hover:bg-violet-950/20 px-3 py-1.5 text-[9px] font-bold text-slate-300 hover:text-white transition"
                      >
                        <RotateCcw className="size-3 text-violet-400" />
                        <span>Restore Snapshot</span>
                      </button>
                    )}
                  </div>

                  {/* Badges details */}
                  {(record.affectedAgents.length > 0 || record.updatedSections.length > 0) && (
                    <div className="mt-3.5 flex flex-wrap gap-2 items-center">
                      {record.affectedAgents.map((ag) => (
                        <span key={ag} className="rounded-full bg-violet-950/30 border border-violet-500/20 text-[9px] font-bold px-2.5 py-0.5 uppercase tracking-wider text-violet-300">
                          {ag} rerun
                        </span>
                      ))}
                      {record.updatedSections.map((sec) => (
                        <span key={sec} className="rounded-full bg-white/[0.02] border border-white/10 text-[9px] font-medium px-2 py-0.5 text-slate-400">
                          {sec} updated
                        </span>
                      ))}
                    </div>
                  )}

                  {/* CEO Review verdicts summary text */}
                  {record.ceoSummary && (
                    <div className="mt-4 rounded-xl border border-white/[0.04] bg-[#05081a]/40 p-3.5">
                      <p className="text-[9px] uppercase font-bold tracking-wider text-cyan-300 flex items-center gap-1">
                        <ShieldCheck className="size-3" /> CEO Review Feedback
                      </p>
                      <p className="mt-1.5 text-xs text-slate-400 leading-relaxed font-medium">
                        {record.ceoSummary}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
