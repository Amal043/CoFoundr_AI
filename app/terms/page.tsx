import React from "react";
import { LegalPageTemplate, LegalSection } from "@/components/shared/legal-page-template";

export const metadata = {
  title: "Terms & Conditions | CoFoundr AI",
  description: "Review the terms, conditions, and disclaimers for utilizing the CoFoundr AI workspace and boardroom tool.",
};

const SECTIONS: LegalSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    searchText: "acceptance of terms binding agreement access platform use website service privacy policy",
    content: (
      <div className="space-y-4">
        <p>
          By accessing, browsing, or using the <strong>CoFoundr AI</strong> platform, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions, along with our Privacy Policy.
        </p>
        <p>
          If you do not agree to these terms, you must immediately cease all access and use of the platform. These terms constitute a binding legal agreement between you and CoFoundr AI.
        </p>
        <p className="border-l-2 border-violet-500/30 pl-4 py-1 italic text-slate-400">
          This system is currently in beta. By accessing it, you agree that features are provided for evaluation and feedback purposes to help refine platform capability.
        </p>
      </div>
    )
  },
  {
    id: "description-of-service",
    title: "Description of Service",
    searchText: "description of service cofoundr ai operating system startup multi agent boardroom research finance marketing product pitch deck investor package",
    content: (
      <div className="space-y-4">
        <p>
          CoFoundr AI provides a coordinated multi-agent simulation interface designed to help founders flesh out business structures. The services include:
        </p>
        <ul className="space-y-2.5 list-disc pl-5">
          <li>An interactive AI CEO boardroom interview chat.</li>
          <li>A dynamic, inline-editable startup workspace with a Business Model Canvas and roadmap.</li>
          <li>Automated strategy generation covering market research, MVP scoping, pricing structures, and GTM plans.</li>
          <li>An Investor Package center displaying pitch decks, email templates, and data exports.</li>
        </ul>
        <p>
          We reserve the right to modify, update, or discontinue features of this platform at any time without prior notification.
        </p>
      </div>
    )
  },
  {
    id: "user-responsibilities",
    title: "User Responsibilities",
    searchText: "user responsibilities accurate information credentials security password session tokens browser cache law compliance",
    content: (
      <div className="space-y-4">
        <p>
          As a user of CoFoundr AI, you agree to fulfill the following operational responsibilities:
        </p>
        <ul className="space-y-2.5 list-disc pl-5">
          <li>
            <strong className="text-white">Accurate Inputs:</strong> Provide authentic, truthful details about your startup ideas to ensure the generation of relevant strategies.
          </li>
          <li>
            <strong className="text-white">Credential Protection:</strong> Maintain the absolute confidentiality of any session tokens, account logins, or local browser storage state files. You are responsible for all activity conducted under your session.
          </li>
          <li>
            <strong className="text-white">Compliance:</strong> Ensure that your startup ideas, files, and workspace edits comply with all local, state, and international regulations.
          </li>
        </ul>
      </div>
    )
  },
  {
    id: "ai-disclaimer",
    title: "AI Disclaimer & Advisory",
    searchText: "ai disclaimer advisory suggestions estimates forecasts no professional legal financial tax investment advice check verify",
    content: (
      <div className="space-y-4">
        <p>
          CoFoundr AI leverages state-of-the-art artificial intelligence models to synthesize plans. Accordingly:
        </p>
        <p className="font-semibold text-white">
          All generated analyses, SWOT matrices, financial charts, pricing structures, GTM plans, and roadmap lists are automated suggestions and predictions.
        </p>
        <ul className="space-y-2.5 list-disc pl-5">
          <li>
            <strong className="text-white">No Professional Advice:</strong> The platform does not provide legal, financial, accounting, tax, or investment advice.
          </li>
          <li>
            <strong className="text-white">Verification Required:</strong> You remain solely responsible for validating all details, checking market facts, testing assumptions, and auditing financial models before making business commitments.
          </li>
          <li>
            <strong className="text-white">Model Limitation:</strong> LLM agents may occasionally produce incomplete, inaccurate, or outdated context. We assume no responsibility or liability for decisions made based on AI-generated data.
          </li>
        </ul>
      </div>
    )
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property Rights",
    searchText: "intellectual property ownership startup ideas user content platform code assets styles prompts trademarks patents",
    content: (
      <div className="space-y-4">
        <p>
          We respect the proprietary nature of early-stage business concepts. The ownership boundaries are set as follows:
        </p>
        <ul className="space-y-2.5 list-disc pl-5">
          <li>
            <strong className="text-white">Your Ownership:</strong> You retain full ownership, title, and intellectual property rights to your startup concepts, workspace text modifications, and custom inputs.
          </li>
          <li>
            <strong className="text-white">Platform Ownership:</strong> CoFoundr AI owns all software, codebase, custom CSS/styling frameworks, icons, illustrations, page layouts, agent prompt files, and structural metadata.
          </li>
        </ul>
        <p>
          You are granted a limited, non-exclusive, revocable license to access the platform and export your compiled strategic reports for personal and presentation uses.
        </p>
      </div>
    )
  },
  {
    id: "acceptable-use",
    title: "Acceptable Use Policy",
    searchText: "acceptable use abuse scraper malicious attack denial of service reverse engineer spam illegal content security testing",
    content: (
      <div className="space-y-4">
        <p>
          To maintain workspace security for all users, you agree not to engage in any of the following prohibited behaviors:
        </p>
        <ol className="space-y-2.5 list-decimal pl-5">
          <li>Attempting to bypass security barriers, run unauthorized vulnerability scans, or reverse-engineer our agent architectures.</li>
          <li>Engaging in denial-of-service (DoS) attacks or spamming our API processing routes.</li>
          <li>Using automated scraper scripts to bulk-download generated strategic packages.</li>
          <li>Submitting illegal, harassing, copyright-infringing, or malicious material to the boardroom chat.</li>
        </ol>
      </div>
    )
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of Liability",
    searchText: "limitation of liability no guarantee startup success funding profit loss damages warranty disclaimer",
    content: (
      <div className="space-y-4">
        <p>
          CoFoundr AI is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis, without warranties of any kind, whether express or implied.
        </p>
        <p>
          To the maximum extent permitted by law, CoFoundr AI and its developers shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from:
        </p>
        <ul className="space-y-2 list-disc pl-5">
          <li>Your reliance on AI-generated strategies or dashboard metrics.</li>
          <li>Any failed startup launches, business closures, or loss of potential profits.</li>
          <li>Inability to secure venture funding, accelerator placement, or customer conversion rates.</li>
          <li>Any server outages, data loss, or local browser storage corruption.</li>
        </ul>
      </div>
    )
  },
  {
    id: "service-availability",
    title: "Service Availability & Beta State",
    searchText: "service availability beta state downtime modifications browser storage limits data loss notice updates",
    content: (
      <div className="space-y-4">
        <p>
          As a platform in beta:
        </p>
        <p>
          CoFoundr AI may experience temporary downtime, server updates, or performance adjustments. We do not guarantee uninterrupted system access or persistent storage preservation. 
        </p>
        <p>
          Users are strongly encouraged to periodically download and back up their strategic materials using the Markdown or JSON export options.
        </p>
      </div>
    )
  },
  {
    id: "termination",
    title: "Termination of Access",
    searchText: "termination suspend cancel block access terms violation account deletion logs history purge",
    content: (
      <div className="space-y-4">
        <p>
          We reserve the right, in our sole discretion and without liability, to suspend, terminate, or restrict your access to the CoFoundr AI boardroom and workspace sections at any time, with or without notice, if we detect behavior that violates these Terms & Conditions.
        </p>
        <p>
          You may terminate this agreement at any time by ceasing all use of the platform and clearing your browser storage files.
        </p>
      </div>
    )
  },
  {
    id: "changes",
    title: "Changes to Terms",
    searchText: "changes updates modifications terms conditions last updated date revision history",
    content: (
      <div className="space-y-4">
        <p>
          We may update these Terms & Conditions from time to time to reflect modifications in AI compliance regulations, cloud architectures, or workspace features.
        </p>
        <p>
          Any revisions will be posted with an updated &quot;Last Updated&quot; date at the top of this document. Continued use of the platform following these modifications constitutes your acceptance of the revised Terms.
        </p>
      </div>
    )
  },
  {
    id: "contact",
    title: "Contact Information",
    searchText: "contact information support email placeholder legal notices business support help",
    content: (
      <div className="space-y-4">
        <p>
          If you have any questions, clarifications, or support requests regarding our Terms & Conditions, please contact us at:
        </p>
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] inline-block">
          <p className="text-sm font-semibold text-white">CoFoundr AI Legal & Compliance</p>
          <p className="text-xs text-slate-400 mt-1">Email: <a href="mailto:support@cofoundr.ai" className="text-violet-400 hover:underline">support@cofoundr.ai</a></p>
          <p className="text-[10px] text-slate-500 mt-2 font-mono">Response Window: ~24–48 Business Hours</p>
        </div>
      </div>
    )
  }
];

export default function TermsPage() {
  return (
    <LegalPageTemplate
      title="Terms & Conditions"
      lastUpdated="July 2026"
      tagline="Review the terms, agreements, and AI disclaimers governing your CoFoundr AI workspace sessions."
      estimatedReadingTime="6 min read"
      sections={SECTIONS}
      type="terms"
    />
  );
}
