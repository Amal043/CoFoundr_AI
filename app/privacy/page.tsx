import React from "react";
import { LegalPageTemplate, LegalSection } from "@/components/shared/legal-page-template";

export const metadata = {
  title: "Privacy Policy | CoFoundr AI",
  description: "Learn how CoFoundr AI collects, uses, and safeguards your startup data and personal information.",
};

const SECTIONS: LegalSection[] = [
  {
    id: "introduction",
    title: "Introduction",
    searchText: "introduction cofoundr ai operating system startup founders privacy policy personal data protection",
    content: (
      <div className="space-y-4">
        <p>
          Welcome to <strong>CoFoundr AI</strong>, an AI-native co-founding operating system designed for ambitious startup founders. Our platform assists in validating startup ideas, composing comprehensive market studies, modeling financial projections, and outlining go-to-market strategies using coordinated multi-agent pipelines.
        </p>
        <p>
          This Privacy Policy outlines how we collect, process, utilize, and protect your information when you interact with our platform. Because CoFoundr AI values the confidentiality of your entrepreneurial concepts and personal details, we are committed to upholding high security standards.
        </p>
        <p className="border-l-2 border-violet-500/30 pl-4 py-1 italic text-slate-400">
          Note: This platform is currently operating in beta. The provisions here describe how CoFoundr AI collects, uses, and protects user information in accordance with privacy standard practices.
        </p>
      </div>
    )
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    searchText: "information we collect personal account startup ideas interview responses workspace data uploaded files usage analytics device browser metadata",
    content: (
      <div className="space-y-4">
        <p>
          To generate high-fidelity, customized startup blueprints, CoFoundr AI collects several types of inputs and telemetry. We organize these into the following categories:
        </p>
        <ul className="space-y-2.5 list-disc pl-5">
          <li>
            <strong className="text-white">Account Information:</strong> Basic registration fields such as email addresses, user names, and login credentials when you authenticate.
          </li>
          <li>
            <strong className="text-white">Startup Ideas & Inputs:</strong> The initial textual descriptions, industry sectors, team dynamics, and target markets you input to kickstart a project.
          </li>
          <li>
            <strong className="text-white">AI CEO Interview Transcripts:</strong> The entire conversational record of your boardroom Q&A session with our automated AI CEO.
          </li>
          <li>
            <strong className="text-white">Workspace Data:</strong> Any customized parameters you save or inline-edit in your Notion-style workspace dashboard, including roadmaps, budget numbers, and Business Model Canvas cards.
          </li>
          <li>
            <strong className="text-white">Usage Analytics:</strong> Anonymous telemetry, including click actions, page transitions, execution times for agents, and interaction flows to help improve platform response times.
          </li>
          <li>
            <strong className="text-white">Device & Connection Metadata:</strong> Technical information including IP addresses, browser variants, operating systems, and viewport measurements to ensure responsive render consistency.
          </li>
        </ul>
      </div>
    )
  },
  {
    id: "how-we-use-information",
    title: "How We Use Information",
    searchText: "how we use information generate ai outputs improve user experience maintain workspaces authentication security product improvements core strategy",
    content: (
      <div className="space-y-4">
        <p>
          The information collected is used strictly to power, maintain, and optimize the CoFoundr AI application. Specifically, we utilize your inputs to:
        </p>
        <ol className="space-y-2.5 list-decimal pl-5">
          <li>
            <strong className="text-white">Generate Core Strategies:</strong> Provide customized reports from specialized agents (Research, Product, Finance, and Marketing) consolidated into a single CEO synthesis document.
          </li>
          <li>
            <strong className="text-white">Recalculate Workspace Dependencies:</strong> Fuel the AI Decision Engine so that manual edits to single parameters automatically refresh downstream metrics and plans (e.g., updating marketing channel budgets or pricing tiers).
          </li>
          <li>
            <strong className="text-white">Provide Session Persistence:</strong> Maintain your project stack locally via secure local cache wrappers or sync with remote databases to prevent loss of startup progress.
          </li>
          <li>
            <strong className="text-white">Maintain System Integrity:</strong> Detect, debug, and prevent malicious actions, technical errors, and unauthorized access attempts.
          </li>
          <li>
            <strong className="text-white">Optimize Boardroom Interactions:</strong> Refine our CEO chat interface prompts based on generalized user engagement to speed up the onboarding flow.
          </li>
        </ol>
      </div>
    )
  },
  {
    id: "ai-processing",
    title: "AI Processing & Transmission",
    searchText: "ai processing transmission large language models openai external api endpoints strategies recommendations verification human check",
    content: (
      <div className="space-y-4">
        <p>
          CoFoundr AI leverages advanced large language models (LLMs) to synthesize startup reports. When you start an onboarding session or edit workspace cards, structured parameters of your startup are transmitted to our primary AI API provider:
        </p>
        <ul className="space-y-2.5 list-disc pl-5">
          <li>
            We securely query the <strong className="text-white">OpenAI API (gpt-4o-mini)</strong> to run reasoning steps and extract profile structures.
          </li>
          <li>
            We do not transmit your personal identifiers (such as account passwords or exact personal contact info) to the AI provider. Only the startup concept details, numbers, and answers are sent.
          </li>
        </ul>
        <p className="border-l-2 border-cyan-500/30 pl-4 py-1 italic text-slate-400">
          <strong>Important Security Advisory:</strong> AI models generate outputs based on statistical patterns. These outputs are intended to serve as analytical suggestions and templates. Users must verify all critical financial models, regulatory parameters, and developer roadmaps independently before building or seeking investment.
        </p>
      </div>
    )
  },
  {
    id: "data-storage",
    title: "Data Storage & Control",
    searchText: "data storage control localstorage browser local memory secure database synchronization purge delete startup",
    content: (
      <div className="space-y-4">
        <p>
          CoFoundr AI operates with a focus on local sovereignty. In its default configuration:
        </p>
        <p>
          Your active workspace progress, AI CEO chat logs, and compiled strategic output files are cached directly in your browser&apos;s <strong className="text-white">LocalStorage</strong>. This ensures that you retain direct local control over your business details without having to immediately upload sensitive ideas to cloud repositories.
        </p>
        <p>
          When you register an account, this data is synchronized with our secure database servers to enable cross-device access. You have the right at any time to clear your local storage cache or submit a request to purge all remote database instances associated with your profile.
        </p>
      </div>
    )
  },
  {
    id: "data-security",
    title: "Data Security Measures",
    searchText: "data security measures encryption https tls secure hosting access controls vulnerability scanners firewalls",
    content: (
      <div className="space-y-4">
        <p>
          To protect your business concepts and personal details, we have implemented standard security measures:
        </p>
        <ul className="space-y-2.5 list-disc pl-5">
          <li>
            <strong className="text-white">Transport Layer Security (TLS):</strong> All communication between your web browser and our application servers is fully encrypted using HTTPS.
          </li>
          <li>
            <strong className="text-white">Access Controls:</strong> Database credentials and developer tokens are tightly restricted, requiring multi-factor authentication for server administrative access.
          </li>
          <li>
            <strong className="text-white">Environment Isolation:</strong> Host configurations utilize private VPC subnets and firewalls to shield processing nodes from direct public internet exposure.
          </li>
        </ul>
      </div>
    )
  },
  {
    id: "third-party-services",
    title: "Third-Party Services",
    searchText: "third party services openai vercel supabase hosting analytics databases authorization providers",
    content: (
      <div className="space-y-4">
        <p>
          CoFoundr AI collaborates with selected cloud providers and services to deliver a fast web application. These include:
        </p>
        <ul className="space-y-2.5 list-disc pl-5">
          <li>
            <strong className="text-white">AI Engine Provider:</strong> OpenAI Inc. (data processing via API endpoints).
          </li>
          <li>
            <strong className="text-white">Hosting Platform:</strong> Vercel Inc. (global CDN and serverless computing layers).
          </li>
          <li>
            <strong className="text-white">Database & Auth Support:</strong> Supabase / PostgreSQL (used for secure user sign-ups and project syncing).
          </li>
          <li>
            <strong className="text-white">Analytics:</strong> Anonymous frontend telemetry trackers to monitor site load performance.
          </li>
        </ul>
      </div>
    )
  },
  {
    id: "cookies",
    title: "Cookies & Storage Tokens",
    searchText: "cookies storage tokens persistent session identification tracking analytics settings",
    content: (
      <div className="space-y-4">
        <p>
          We use functional cookies and browser storage keys to simplify your workspace experience. These storage markers:
        </p>
        <ul className="space-y-2 list-disc pl-5">
          <li>Keep you securely authenticated across page reloads.</li>
          <li>Store local workspace preferences (e.g., active theme settings).</li>
          <li>Enable our preloader and demo modes to serve mock templates smoothly.</li>
        </ul>
        <p>
          You can block or delete cookies through your browser settings, though doing so may log you out of your workspace sessions.
        </p>
      </div>
    )
  },
  {
    id: "user-rights",
    title: "Your Rights & Controls",
    searchText: "user rights controls export workspace delete account clear cache correction access data",
    content: (
      <div className="space-y-4">
        <p>
          We believe you should have complete command over your data. You can exercise the following rights directly within CoFoundr AI:
        </p>
        <ol className="space-y-2.5 list-decimal pl-5">
          <li>
            <strong className="text-white">Data Export:</strong> Download your entire workspace strategy package as a clean Markdown file or structured JSON format at any time using our Export Cockpit.
          </li>
          <li>
            <strong className="text-white">Data Correction:</strong> Edit any part of your startup data dynamically using inline text boxes or by modifying parameters in settings.
          </li>
          <li>
            <strong className="text-white">Data Erasure:</strong> Clear your browser storage or delete individual startups from the workspace history. This completely removes the information from local memory.
          </li>
          <li>
            <strong className="text-white">Opt-out:</strong> Deny permission for usage analytics or refuse authentication, in which case the app continues to operate locally.
          </li>
        </ol>
      </div>
    )
  },
  {
    id: "contact",
    title: "Contact Information",
    searchText: "contact information support email questions feedback cofoundr ai team help",
    content: (
      <div className="space-y-4">
        <p>
          If you have any questions, feedback, or concerns regarding this Privacy Policy or how CoFoundr AI handles your startup ideas, feel free to reach out to our team:
        </p>
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] inline-block">
          <p className="text-sm font-semibold text-white">CoFoundr AI Support</p>
          <p className="text-xs text-slate-400 mt-1">Email: <a href="mailto:support@cofoundr.ai" className="text-violet-400 hover:underline">support@cofoundr.ai</a></p>
          <p className="text-[10px] text-slate-500 mt-2 font-mono">Response Window: ~24–48 Business Hours</p>
        </div>
      </div>
    )
  }
];

export default function PrivacyPage() {
  return (
    <LegalPageTemplate
      title="Privacy Policy"
      lastUpdated="July 2026"
      tagline="Helping founders build with conviction while protecting their core information."
      estimatedReadingTime="5 min read"
      sections={SECTIONS}
      type="privacy"
    />
  );
}
