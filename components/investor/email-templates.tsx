"use client";

import { useState } from "react";
import { Copy, Check, Mail } from "lucide-react";
import { WorkspaceData } from "@/types/workspace";

interface EmailTemplatesProps {
  workspace: WorkspaceData;
}

type EmailTab = "cold" | "followup" | "meeting" | "short" | "long";

export function EmailTemplates({ workspace }: EmailTemplatesProps) {
  const [activeEmailTab, setActiveEmailTab] = useState<EmailTab>("cold");
  const [copied, setCopied] = useState(false);

  const name = workspace.overview.name;
  const tagline = workspace.overview.tagline;
  const problem = workspace.overview.problem;
  const solution = workspace.overview.solution;
  const audience = workspace.overview.targetUsers;
  const pricing = workspace.overview.businessModel;
  const funding = workspace.finance.fundingNeed;

  const emails: Record<EmailTab, { subject: string; body: string; label: string }> = {
    cold: {
      label: "Cold Outreach",
      subject: `Investment Opportunity: ${name} — ${tagline.substring(0, 45)}`,
      body: `Subject: Investment Opportunity: ${name} — ${tagline.substring(0, 45)}

Hi [Investor Name],

I hope this email finds you well.

I've been following your investments in the ${workspace.overview.industry} space, particularly your interest in early-stage tech, and wanted to reach out regarding what we are building at ${name}.

${name} is ${tagline.toLowerCase()}

The Problem: ${problem}
Our Solution: ${solution}

We are targeting ${audience} with a robust ${pricing}. 

We are currently raising a pre-seed round of ${funding} to expand core agent orchestrations, launch public developer integrations, and hire key engineering talent.

I'd love to share our investor deck and schedule a brief 10-minute call to discuss our roadmap. Do you have any availability this Thursday afternoon?

Best regards,

[Founder Name]
Co-Founder, ${name}
[Phone Number] | [Website Link]`,
    },
    followup: {
      label: "Follow-up",
      subject: `Re: Investment Opportunity: ${name}`,
      body: `Subject: Re: Investment Opportunity: ${name}

Hi [Investor Name],

I wanted to follow up on my previous note regarding ${name}. I know you have a busy schedule, so I wanted to keep this brief.

Since my last email, our AI CEO co-founder has completed our operational audit. We have finalized our 12-month projections target of ${workspace.finance.revenueProjection.split("\n")[0] || "$50k MRR"} and locked in our Week 1 to 4 roadmap milestones.

We'd love to loop you in on our pre-seed target of ${funding}.

I have attached our executive summary and pitch deck below. Let me know if you have 10 minutes next week for a quick sync.

Best regards,

[Founder Name]
Co-Founder, ${name}`,
    },
    meeting: {
      label: "Meeting Request",
      subject: `Meeting Request: ${name} x [Investor Firm]`,
      body: `Subject: Meeting Request: ${name} x [Investor Firm]

Hi [Investor Name],

Thank you for your response.

I would love to set up a call to dive deeper into our 12-month GTM roadmap and detail our Business Model Canvas.

Here are a few times that work well for me (EST timezone):
- Monday, [Date] at 2:00 PM
- Wednesday, [Date] at 10:00 AM
- Thursday, [Date] at 3:30 PM

Please let me know if any of these options work for you, or feel free to send over your Calendly link.

Looking forward to our conversation.

Best regards,

[Founder Name]
Co-Founder, ${name}`,
    },
    short: {
      label: "Short Version (One-Pager)",
      subject: `Quick Pitch: ${name} (${tagline.substring(0, 30)}...)`,
      body: `Subject: Quick Pitch: ${name}

Hi [Investor Name],

${name} is ${tagline.toLowerCase()}

In short:
- **Problem**: ${problem.substring(0, 100)}...
- **Solution**: ${solution.substring(0, 100)}...
- **Market**: Targeting ${audience}.
- **Ask**: Raising ${funding} to fund core product dev milestones.

Would love to send over our 10-slide deck if this aligns with your current investment thesis.

Best,

[Founder Name]
Co-Founder, ${name}`,
    },
    long: {
      label: "Long Version (Full Brief)",
      subject: `Investment Proposal Brief: ${name}`,
      body: `Subject: Investment Proposal Brief: ${name}

Hi [Investor Name],

I am reaching out regarding a pre-seed investment opportunity in ${name}.

**Overview**
${name} is building the future of startup orchestration: ${tagline}

**The Problem**
${problem}

**Our Solution & Product**
${solution}
Our MVP includes:
${workspace.product.mvpFeatures}

**Business Model & Financial Projections**
We operate on a ${pricing}.
12-Month Projections: ${workspace.finance.revenueProjection}

**Funding Ask & Use of Funds**
We are raising ${funding} to complete our dev roadmap:
${workspace.product.devRoadmap}

I have attached our full Business Model Canvas and Executive Summary. Let me know if you would be open to a call to discuss this further.

Best regards,

[Founder Name]
Co-Founder, ${name}`,
    },
  };

  const handleCopy = () => {
    const text = emails[activeEmailTab].body;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Category selector */}
      <div className="flex flex-wrap gap-2">
        {(Object.keys(emails) as EmailTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveEmailTab(tab);
              setCopied(false);
            }}
            className={`rounded-xl px-4 py-2.5 text-xs font-semibold border transition ${
              activeEmailTab === tab
                ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-300 shadow-sm"
                : "border-white/5 bg-slate-950/20 text-slate-400 hover:border-white/10 hover:text-slate-200"
            }`}
          >
            {emails[tab].label}
          </button>
        ))}
      </div>

      {/* Code Text Panel */}
      <div className="relative rounded-3xl border border-white/10 bg-slate-950/50 p-6 z-10 flex flex-col justify-between min-h-[300px]">
        <div className="flex justify-between items-center border-b border-white/[0.06] pb-3 mb-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Mail className="size-3.5" />
            Subject Line
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-[10px] font-bold text-cyan-300 hover:text-white transition"
          >
            {copied ? (
              <>
                <Check className="size-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="size-3.5" />
                <span>Copy Copy</span>
              </>
            )}
          </button>
        </div>

        <div className="flex-1">
          <p className="text-xs text-slate-400 font-bold mb-3">
            Subject: {emails[activeEmailTab].subject}
          </p>
          <pre className="text-[11px] leading-6 font-mono text-slate-300 whitespace-pre-wrap select-all selection:bg-cyan-500/25">
            {emails[activeEmailTab].body}
          </pre>
        </div>
      </div>
    </div>
  );
}
