"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Bot, Brain, Send, User, Sidebar as SidebarIcon, CheckSquare, RefreshCw } from "lucide-react";
import Link from "next/link";

import { Sidebar, type StartupProfile } from "./sidebar";
import { ProgressTracker, type InterviewProgress } from "./progress-tracker";
import { SuggestedReplies } from "./suggested-replies";
import { WelcomeScreen } from "./welcome-screen";
import { ThinkingSteps } from "./thinking-steps";
import { getActiveStartup, listStartups, saveActiveStartupWorkspace } from "@/lib/demo/startup-manager";
import { GenerationModal } from "./generation-modal";
import { WorkspaceData } from "@/types/workspace";

interface Message {
  id: string;
  role: "system" | "user" | "assistant";
  content: string;
  timestamp: string;
}

const INITIAL_PROFILE: StartupProfile = {
  name: "-",
  audience: "-",
  pricing: "-",
  country: "-",
  businessType: "-",
  timeline: "-",
  teamSize: "-",
};

const INITIAL_PROGRESS: InterviewProgress = {
  idea: "pending",
  problem: "pending",
  audience: "pending",
  businessModel: "pending",
  revenue: "pending",
  launch: "pending",
};

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestedReplies, setSuggestedReplies] = useState<string[]>([]);
  const [profile, setProfile] = useState<StartupProfile>(INITIAL_PROFILE);
  const [progress, setProgress] = useState<InterviewProgress>(INITIAL_PROGRESS);
  const percentage = Math.round(
    (Object.values(progress).filter((s) => s === "completed").length / 6) * 100
  );

  // Mobile layout toggles
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [mobileProgressOpen, setMobileProgressOpen] = useState(false);

  const [workspaceComplete, setWorkspaceComplete] = useState(false);
  const [showGenerationModal, setShowGenerationModal] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isGenerating]);

  // Load chat and profile from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem("cofoundr_chat_messages");
    const savedProfile = localStorage.getItem("cofoundr_chat_profile");
    const savedProgress = localStorage.getItem("cofoundr_chat_progress");
    const savedSuggestions = localStorage.getItem("cofoundr_chat_suggestions");

    setWorkspaceComplete(!!localStorage.getItem("cofoundr_workspace_outputs"));

    let loadedMessages: Message[] = [];
    if (savedMessages) {
      loadedMessages = JSON.parse(savedMessages);
      setMessages(loadedMessages);
    }
    if (savedProfile) setProfile(JSON.parse(savedProfile));
    if (savedProgress) setProgress(JSON.parse(savedProgress));
    if (savedSuggestions) setSuggestedReplies(JSON.parse(savedSuggestions));

    if (loadedMessages.length === 0) {
      const activeStartup = getActiveStartup();
      if (activeStartup && activeStartup.idea) {
        handleSelectStarter(activeStartup.idea);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save state helper
  const saveState = (
    newMessages: Message[],
    newProfile: StartupProfile,
    newProgress: InterviewProgress,
    newSuggestions: string[]
  ) => {
    localStorage.setItem("cofoundr_chat_messages", JSON.stringify(newMessages));
    localStorage.setItem("cofoundr_chat_profile", JSON.stringify(newProfile));
    localStorage.setItem("cofoundr_chat_progress", JSON.stringify(newProgress));
    localStorage.setItem("cofoundr_chat_suggestions", JSON.stringify(newSuggestions));

    // Save to active startup object list
    const activeId = localStorage.getItem("cofoundr_active_startup_id");
    if (activeId) {
      const list = listStartups();
      const idx = list.findIndex((s) => s.id === activeId);
      if (idx !== -1) {
        list[idx].chatMessages = newMessages;
        list[idx].progress = newProgress as unknown as Record<string, string>;
        list[idx].percentage = Math.round(
          (Object.values(newProgress).filter((s) => s === "completed").length / 6) * 100
        );
        list[idx].interviewAnswers = {
          ...list[idx].interviewAnswers,
          targetAudience: newProfile.audience,
          revenueModel: newProfile.pricing,
        };
        localStorage.setItem("cofoundr_startups", JSON.stringify(list));
      }
    }
  };

  // Reset interview
  const resetInterview = () => {
    if (window.confirm("Are you sure you want to restart your interview with the AI CEO?")) {
      setMessages([]);
      setProfile(INITIAL_PROFILE);
      setProgress(INITIAL_PROGRESS);
      setSuggestedReplies([]);
      localStorage.removeItem("cofoundr_chat_messages");
      localStorage.removeItem("cofoundr_chat_profile");
      localStorage.removeItem("cofoundr_chat_progress");
      localStorage.removeItem("cofoundr_chat_suggestions");
    }
  };

  // Extract metadata in background
  const runProfileExtraction = async (currentMessages: Message[]) => {
    try {
      const response = await fetch("/api/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: currentMessages.map(({ role, content }) => ({ role, content })),
        }),
      });

      if (!response.ok) throw new Error("Failed to extract profile");

      const data = await response.json();
      if (data.profile) setProfile(data.profile);
      if (data.progress) setProgress(data.progress);
      if (data.suggestedReplies) setSuggestedReplies(data.suggestedReplies);

      saveState(
        currentMessages,
        data.profile || profile,
        data.progress || progress,
        data.suggestedReplies || []
      );
    } catch (err) {
      console.error("Extraction error:", err);
    }
  };

  // Submit message
  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isGenerating) return;

    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMessage: Message = {
      id: Math.random().toString(36).substring(7),
      role: "user",
      content: text,
      timestamp: time,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue("");
    setIsGenerating(true);
    setSuggestedReplies([]); // Hide suggestions while thinking

    // Create placeholder for assistant response
    const assistantMsgId = Math.random().toString(36).substring(7);
    const assistantPlaceholder: Message = {
      id: assistantMsgId,
      role: "assistant",
      content: "",
      timestamp: time,
    };

    setMessages((prev) => [...prev, assistantPlaceholder]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map(({ role, content }) => ({ role, content })),
        }),
      });

      if (!response.ok) throw new Error("Failed to generate response");
      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let streamedContent = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const token = decoder.decode(value, { stream: true });
        streamedContent += token;

        setMessages((prev) =>
          prev.map((msg) => (msg.id === assistantMsgId ? { ...msg, content: streamedContent } : msg))
        );
      }

      // Now run extraction on completed message history
      const finalAssistantMessage: Message = {
        id: assistantMsgId,
        role: "assistant",
        content: streamedContent,
        timestamp: time,
      };

      const finalMessages = [...updatedMessages, finalAssistantMessage];
      await runProfileExtraction(finalMessages);
    } catch (err) {
      console.error(err);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMsgId
            ? { ...msg, content: "I encountered a processing error. Let's try that answer again." }
            : msg
        )
      );
    } finally {
      setIsGenerating(false);
    }
  };

  // Start interview with onboarding starter
  const handleSelectStarter = async (starterText: string) => {
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const introMessage: Message = {
      id: "intro-msg",
      role: "assistant",
      content:
        "Hi! I'm your AI CEO.\n\nI'll help transform your idea into an investor-ready startup.\n\nBefore we begin, I'd like to understand your vision.\n\nLet's start with one question.\n\nWhat startup are you hoping to build?",
      timestamp: time,
    };

    const userMessage: Message = {
      id: "starter-msg",
      role: "user",
      content: starterText,
      timestamp: time,
    };

    const initialHistory = [introMessage, userMessage];
    setMessages(initialHistory);
    setIsGenerating(true);

    // Render placeholder
    const assistantMsgId = Math.random().toString(36).substring(7);
    const assistantPlaceholder: Message = {
      id: assistantMsgId,
      role: "assistant",
      content: "",
      timestamp: time,
    };
    setMessages((prev) => [...prev, assistantPlaceholder]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: initialHistory.map(({ role, content }) => ({ role, content })),
        }),
      });

      if (!response.ok) throw new Error("Failed");
      if (!response.body) throw new Error("No body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let streamedContent = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const token = decoder.decode(value, { stream: true });
        streamedContent += token;

        setMessages((prev) =>
          prev.map((msg) => (msg.id === assistantMsgId ? { ...msg, content: streamedContent } : msg))
        );
      }

      const finalAssistantMessage: Message = {
        id: assistantMsgId,
        role: "assistant",
        content: streamedContent,
        timestamp: time,
      };

      const finalHistoryWithResponse = [...initialHistory, finalAssistantMessage];
      await runProfileExtraction(finalHistoryWithResponse);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerationComplete = (outputs: Record<string, string>, workspaceData: WorkspaceData) => {
    localStorage.setItem("cofoundr_workspace_outputs", JSON.stringify(outputs));
    localStorage.setItem("cofoundr_workspace_data", JSON.stringify(workspaceData));

    // Save back to active startup list
    saveActiveStartupWorkspace(workspaceData, outputs);

    setWorkspaceComplete(true);
    setShowGenerationModal(false);

    window.location.href = "/dashboard";
  };

  // Helper to parse simple bold, lists, and code blocks
  const renderMarkdown = (text: string) => {
    if (!text) return null;
    const blocks = text.split("```");
    return blocks.map((block, index) => {
      if (index % 2 === 1) {
        const lines = block.split("\n");
        const code = lines.slice(1).join("\n").trim();
        return (
          <pre
            key={index}
            className="my-3 overflow-x-auto rounded-xl border border-white/10 bg-[#04060f] p-4 text-xs font-mono text-cyan-300"
          >
            <code>{code || block}</code>
          </pre>
        );
      }

      const lines = block.split("\n");
      return lines.map((line, lineIndex) => {
        const trimmed = line.trim();
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          const content = trimmed.replace(/^[-*]\s+/, "");
          return (
            <li key={`${index}-${lineIndex}`} className="ml-4 list-disc text-sm text-slate-300 mb-1.5">
              {renderBold(content)}
            </li>
          );
        }
        return (
          <p key={`${index}-${lineIndex}`} className="text-sm text-slate-300 leading-6 mb-2.5 min-h-[1rem]">
            {renderBold(line)}
          </p>
        );
      });
    });
  };

  const renderBold = (text: string) => {
    const parts = text.split(/\*\*([^*]+)\*\*/g);
    return parts.map((part, idx) => {
      if (idx % 2 === 1) {
        return (
          <strong key={idx} className="font-bold text-white">
            {part}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-ink pt-20">
      {/* Header bar */}
      <div className="flex h-14 items-center justify-between border-b border-white/10 bg-[#080c1c]/90 px-4 backdrop-blur-md sm:px-6">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="grid size-9 place-items-center rounded-xl border border-white/10 bg-white/[0.02] text-slate-400 hover:text-white transition">
            <ArrowLeft className="size-4" />
          </Link>
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Bot className="size-4 text-cyan-300" /> AI CEO Boardroom
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Reset Button */}
          {messages.length > 0 && (
            <button
              onClick={resetInterview}
              title="Restart Interview"
              className="grid size-9 place-items-center rounded-xl border border-white/10 bg-white/[0.02] text-slate-400 hover:text-white transition"
            >
              <RefreshCw className="size-4" />
            </button>
          )}

          {/* Toggle buttons for Mobile viewports */}
          <button
            onClick={() => setMobileSidebarOpen((prev) => !prev)}
            className="grid size-9 place-items-center rounded-xl border border-white/10 bg-white/[0.02] text-slate-400 hover:text-white transition lg:hidden"
            aria-label="Toggle Sidebar Blueprint"
          >
            <SidebarIcon className="size-4" />
          </button>
          <button
            onClick={() => setMobileProgressOpen((prev) => !prev)}
            className="grid size-9 place-items-center rounded-xl border border-white/10 bg-white/[0.02] text-slate-400 hover:text-white transition lg:hidden"
            aria-label="Toggle Progress Tracker"
          >
            <CheckSquare className="size-4" />
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="relative flex flex-1 overflow-hidden">
        {/* Left Side: Sidebar Blueprint (Desktop View) */}
        <div className="hidden w-[300px] border-r border-white/10 p-4 lg:block">
          <Sidebar profile={profile} />
        </div>

        {/* Center: Main Chat View */}
        <div className="flex flex-1 flex-col overflow-hidden bg-gradient-to-b from-[#090d1f]/35 to-transparent">
          {messages.length === 0 ? (
            <div className="flex-1 overflow-y-auto px-4 py-8 sm:px-6">
              <WelcomeScreen onSelectStarter={handleSelectStarter} />
            </div>
          ) : (
            <>
              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 space-y-6">
                {messages.map((msg, index) => {
                  const isUser = msg.role === "user";
                  return (
                    <motion.div
                      key={msg.id || index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex gap-3 max-w-[85%] sm:max-w-[70%] ${
                          isUser ? "flex-row-reverse" : "flex-row"
                        }`}
                      >
                        {/* Avatar */}
                        <div
                          className={`grid size-9 shrink-0 place-items-center rounded-xl border text-white ${
                            isUser
                              ? "border-violet-500/20 bg-gradient-to-br from-violet-600 to-indigo-600"
                              : "border-white/10 bg-slate-900"
                          }`}
                        >
                          {isUser ? (
                            <User className="size-4.5" />
                          ) : (
                            <Bot className="size-4.5 text-cyan-300" />
                          )}
                        </div>

                        {/* Bubble */}
                        <div className="flex flex-col">
                          <div
                            className={`rounded-2xl px-4 py-3.5 shadow-md ${
                              isUser
                                ? "bg-gradient-to-br from-blue-600 to-violet-600 text-white rounded-tr-none"
                                : "border border-white/10 bg-[#0b1022]/85 text-slate-100 backdrop-blur-md rounded-tl-none"
                            }`}
                          >
                            {msg.content === "" && !isUser ? (
                              <ThinkingSteps />
                            ) : (
                              <div>{renderMarkdown(msg.content)}</div>
                            )}
                          </div>
                          <span
                            className={`mt-1 text-[10px] text-slate-500 ${
                              isUser ? "text-right" : "text-left"
                            }`}
                          >
                            {msg.timestamp}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
                <div ref={chatEndRef} />
              </div>

              {/* Input Area / Suggestions */}
              <div className="border-t border-white/10 bg-[#070b19]/75 p-4 backdrop-blur-md">
                <div className="mx-auto max-w-4xl">
                  {/* Clickable Suggested Replies */}
                  {suggestedReplies.length > 0 && !isGenerating && (
                    <SuggestedReplies
                      replies={suggestedReplies}
                      onSelectReply={handleSendMessage}
                      disabled={isGenerating}
                    />
                  )}

                  {/* Action or Input Area */}
                  {percentage === 100 ? (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2.5 text-left bg-cyan-950/15 border border-cyan-500/10 p-4.5 rounded-2xl">
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                          AI CEO Onboarding Alignment Complete!
                        </h4>
                        <p className="text-[10px] text-slate-400 font-semibold mt-1">
                          {workspaceComplete 
                            ? "Your startup workspace strategy is generated and synced."
                            : "Your startup blueprint variables are locked. Launch orchestration agents."}
                        </p>
                      </div>
                      {workspaceComplete ? (
                        <Link
                          href="/dashboard"
                          className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 text-xs font-extrabold shadow-md hover:-translate-y-0.5 transition flex items-center gap-1.5 shrink-0"
                        >
                          Go to Dashboard
                          <ArrowRight className="size-4" />
                        </Link>
                      ) : (
                        <button
                          onClick={() => setShowGenerationModal(true)}
                          className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2.5 text-xs font-extrabold shadow-md hover:-translate-y-0.5 transition flex items-center gap-1.5 shrink-0"
                        >
                          <Brain className="size-4 animate-pulse" />
                          Generate Startup Strategy
                        </button>
                      )}
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSendMessage(inputValue);
                      }}
                      className="relative flex items-center"
                    >
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type your response to the CEO..."
                        disabled={isGenerating}
                        className="w-full rounded-2xl border border-white/10 bg-slate-950/60 py-3.5 pl-4 pr-12 text-sm text-slate-200 placeholder:text-slate-500 focus:border-violet-500/80 focus:outline-none focus:ring-1 focus:ring-violet-500/80 disabled:opacity-50"
                      />
                      <button
                        type="submit"
                        disabled={!inputValue.trim() || isGenerating}
                        className="absolute right-3 grid size-9 place-items-center rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white transition hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-40"
                      >
                        <Send className="size-4" />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right Side: Progress Tracker (Desktop View) */}
        <div className="hidden w-[280px] border-l border-white/10 p-4 lg:block">
          <ProgressTracker progress={progress} />
        </div>

        {/* Mobile Slide-over Drawer: Sidebar */}
        <AnimatePresence>
          {mobileSidebarOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileSidebarOpen(false)}
                className="absolute inset-0 z-40 bg-black lg:hidden"
              />
              {/* Drawer content */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute inset-y-0 left-0 z-50 w-[290px] p-4 bg-ink lg:hidden"
              >
                <Sidebar profile={profile} />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Mobile Slide-over Drawer: Progress Tracker */}
        <AnimatePresence>
          {mobileProgressOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileProgressOpen(false)}
                className="absolute inset-0 z-40 bg-black lg:hidden"
              />
              {/* Drawer content */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute inset-y-0 right-0 z-50 w-[270px] p-4 bg-ink lg:hidden"
              >
                <ProgressTracker progress={progress} />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {showGenerationModal && (
        <GenerationModal
          profile={profile}
          onComplete={handleGenerationComplete}
        />
      )}
    </div>
  );
}
