import OpenAI from "openai";
import { CEO_SYSTEM_PROMPT } from "../prompts/ceo";
import { EXTRACTOR_SYSTEM_PROMPT } from "../prompts/extractor";

const apiKey = process.env.OPENAI_API_KEY;

export const openai = apiKey && apiKey !== "YOUR_OPENAI_API_KEY" ? new OpenAI({ apiKey }) : null;

export interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

// -------------------------------------------------------------
// Real OpenAI Implementations
// -------------------------------------------------------------

export async function getRealChatStream(messages: Message[]) {
  if (!openai) throw new Error("OpenAI client not initialized");

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "system", content: CEO_SYSTEM_PROMPT }, ...messages],
    stream: true,
  });

  return response;
}

export async function getRealProfileExtraction(messages: Message[]) {
  if (!openai) throw new Error("OpenAI client not initialized");

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: EXTRACTOR_SYSTEM_PROMPT },
      ...messages.filter((m) => m.role !== "system"),
    ],
    response_format: { type: "json_object" },
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error("Empty extraction response");

  return JSON.parse(content);
}

// -------------------------------------------------------------
// Mock / Simulation Implementations (Used when API Key is missing)
// -------------------------------------------------------------

const MOCK_QUESTIONS = [
  {
    triggerIndex: 1, // After user replies to Q1 (Idea)
    question: "Got it. A solid idea. To make this real, we need to understand the problem. What specific pain point or problem are you solving for your target market?",
    suggestions: ["Inefficient manual workflows", "High transaction fees", "Lack of accessible learning resources", "Complicated compliance audits"],
  },
  {
    triggerIndex: 3, // After user replies to Q2 (Problem)
    question: "Clear problem statement. Now, who exactly is your customer? Tell me about your target audience. Are you selling to enterprise teams, small business owners, creators, or everyday consumers?",
    suggestions: ["B2B enterprise teams", "Gen Z creators", "Freelancers & small businesses", "College students & educators"],
  },
  {
    triggerIndex: 5, // After user replies to Q3 (Audience)
    question: "Excellent. Let's touch on where you're operating. What primary country or market are you targeting for launch?",
    suggestions: ["United States", "India", "European Union", "Global Launch"],
  },
  {
    triggerIndex: 7, // After user replies to Q4 (Country)
    question: "Understood. Location shapes your regulations and pricing. That leads to the business type and business model. What type of platform are we building (e.g. B2B SaaS, double-sided marketplace, mobile app, agency)?",
    suggestions: ["B2B SaaS platform", "Peer-to-peer Marketplace", "Mobile-first consumer app", "D2C E-commerce"],
  },
  {
    triggerIndex: 9, // After user replies to Q5 (Business Type)
    question: "Makes sense. How do you plan to monetize this? Do you want to charge flat subscriptions, take a percentage commission on sales, offer a freemium model, or charge based on usage?",
    suggestions: ["Subscription billing", "Usage-based/Pay-as-you-go", "Commission fee per transaction", "Freemium with premium features"],
  },
  {
    triggerIndex: 11, // After user replies to Q6 (Revenue/Pricing)
    question: "A viable revenue stream is critical. Next up, execution. What is your expected launch timeline, and what is your current team size or technical background? Are you a solo non-technical builder, or do you have co-founders?",
    suggestions: ["Launch in 3 months / Solo founder", "Launch in 6 months / 2 co-founders", "Bootstrapping with technical partner", "Ready in 1 month / Agency team"],
  },
  {
    triggerIndex: 13, // After user replies to Q7 (Timeline/Team)
    question: "That gives us a clear operational timeline. Finally, let's talk about the competition. What is your unique value proposition (UVP)? What will make you stand out from incumbents in this space?",
    suggestions: ["10x faster execution", "AI-native intelligence", "Affordable pricing model", "Highly specialized workflow integration"],
  },
  {
    triggerIndex: 15, // Complete
    question: "Fantastic! We've completed our initial interview. I have mapped your startup profile in the sidebar. Let me know if you want to revise any assumptions, or head to the dashboard to begin our deep-dive analysis.",
    suggestions: ["Go to Dashboard", "Change business model to subscriptions", "Change launch timeline to 1 month"],
  },
];

export function getMockChatResponse(messages: Message[]): { content: string; suggestions: string[] } {
  // Count user messages to see where we are in the interview
  const userMessages = messages.filter((m) => m.role === "user");
  const count = userMessages.length;
  const lastUserMsg = userMessages[count - 1]?.content.toLowerCase() || "";

  // Check for updates/corrections from the user
  if (lastUserMsg.includes("subscription")) {
    return {
      content: "I've noted that you want to switch to a subscription billing model. I've updated our profile. What else should we adjust, or are we ready to move forward?",
      suggestions: ["Let's move to launch timeline", "Change country to United States", "Review current strategy"],
    };
  }

  if (lastUserMsg.includes("dashboard")) {
    return {
      content: "Excellent choice. Let's transition to the workspace. You can now access your individual agent cards for deeper research, product mockups, and financial sheets.",
      suggestions: ["Open Dashboard", "Change timeline to 1 month"],
    };
  }

  // Regular interview sequence based on user message counts
  const nextQ = MOCK_QUESTIONS.find((q) => q.triggerIndex === count * 2 - 1) || MOCK_QUESTIONS[MOCK_QUESTIONS.length - 1];

  return {
    content: nextQ.question,
    suggestions: nextQ.suggestions,
  };
}

export function getMockProfileExtraction(messages: Message[]) {
  const userMessages = messages.filter((m) => m.role === "user");
  const count = userMessages.length;

  const profile = {
    name: "-",
    audience: "-",
    pricing: "-",
    country: "-",
    businessType: "-",
    timeline: "-",
    teamSize: "-",
  };

  const progress = {
    idea: "pending",
    problem: "pending",
    audience: "pending",
    businessModel: "pending",
    revenue: "pending",
    launch: "pending",
  };

  // Populate mock values incrementally based on user responses
  if (count >= 1) {
    const firstVal = userMessages[0].content;
    profile.name = firstVal.includes("tutor")
      ? "EduTutor AI"
      : firstVal.includes("fintech")
      ? "ApexPay"
      : firstVal.includes("logistics")
      ? "LogiFlow"
      : firstVal.split(" ").slice(0, 2).join(" ");
    progress.idea = "completed";
    progress.problem = "in_progress";
  }

  if (count >= 2) {
    progress.problem = "completed";
    progress.audience = "in_progress";
  }

  if (count >= 3) {
    const audVal = userMessages[2]?.content || "";
    profile.audience = audVal.includes("B2B")
      ? "B2B Enterprise"
      : audVal.includes("creator")
      ? "Creators & Influencers"
      : audVal.includes("student")
      ? "Students"
      : "SMEs & Startups";
    progress.audience = "completed";
  }

  if (count >= 4) {
    const cntVal = userMessages[3]?.content || "";
    profile.country = cntVal.includes("United States") || cntVal.includes("US")
      ? "United States"
      : cntVal.includes("India")
      ? "India"
      : cntVal.includes("European")
      ? "European Union"
      : "Global";
    progress.businessModel = "in_progress";
  }

  if (count >= 5) {
    const typeVal = userMessages[4]?.content || "";
    profile.businessType = typeVal.includes("SaaS")
      ? "B2B SaaS"
      : typeVal.includes("Marketplace")
      ? "Marketplace"
      : typeVal.includes("app")
      ? "Mobile App"
      : "SaaS Platform";
    progress.businessModel = "completed";
    progress.revenue = "in_progress";
  }

  if (count >= 6) {
    const revVal = userMessages[5]?.content || "";
    profile.pricing = revVal.includes("Subscription")
      ? "Subscription Model"
      : revVal.includes("Commission")
      ? "Transaction Commission"
      : revVal.includes("Freemium")
      ? "Freemium Plan"
      : "Usage Billing";
    progress.revenue = "completed";
    progress.launch = "in_progress";
  }

  if (count >= 7) {
    const operationalVal = userMessages[6]?.content || "";
    profile.timeline = operationalVal.includes("3")
      ? "3 Months"
      : operationalVal.includes("6")
      ? "6 Months"
      : "1 Month";
    profile.teamSize = operationalVal.includes("Solo")
      ? "Solo Founder"
      : "2-3 Co-founders";
    progress.launch = "completed";
  }

  // Handle manual correction overrides
  const fullText = messages.map((m) => m.content).join(" ").toLowerCase();
  if (fullText.includes("subscription")) {
    profile.pricing = "Subscription Model";
  }
  if (fullText.includes("united states") || fullText.includes("us")) {
    profile.country = "United States";
  }
  if (fullText.includes("1 month")) {
    profile.timeline = "1 Month";
  }

  return {
    profile,
    progress,
    suggestedReplies: getMockChatResponse(messages).suggestions,
  };
}
