import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const levels = [
  {
    id: 0, amount: "$1/day", name: "The Survivor", emoji: "🪙",
    accent: "#F5C842", dimAccent: "#7A6010",
    method: "Collect recyclable bottles and cans, do micro-tasks on TaskRabbit, beg, or sell a found item.",
    pros: ["Zero capital needed", "Immediate cash", "No skills required"],
    cons: ["Physically demanding", "Socially stigmatised", "Unpredictable income"],
    percentile: "Bottom 1% globally",
    professions: "Street vendor, scrap collector, day laborer, beggar",
    examples: "Homeless individuals in urban areas; informal workers in developing nations",
    life: "Survival mode. Every dollar goes toward food or shelter. No savings, no bank account, no safety net. Life is a daily grind of finding the next meal.",
    dailyIncome: "$0–$5/day", networth: "~$0", shadow: false,
  },
  {
    id: 1, amount: "$10/day", name: "The Hustler", emoji: "🔧",
    accent: "#E8935A", dimAccent: "#6B3D1E",
    method: "Offer simple local services — mow a lawn, wash cars, sell homemade food, or assist with moving.",
    pros: ["Low barrier to entry", "Can start today", "Builds work ethic"],
    cons: ["Time-intensive for small return", "Weather & location dependent", "Nearly impossible to scale"],
    percentile: "Bottom 5–10% globally",
    professions: "Gig worker, street food seller, domestic helper, car washer",
    examples: "Informal economy workers across South Asia, Africa, Latin America",
    life: "Living paycheck to paycheck. Sharing housing. No healthcare. Small joys are big wins. Community is a lifeline.",
    dailyIncome: "$5–$30/day", networth: "$0–$500", shadow: false,
  },
  {
    id: 2, amount: "$100/day", name: "The Grinder", emoji: "🛠️",
    accent: "#D4A843", dimAccent: "#6B4F10",
    method: "Flip items on Facebook Marketplace or eBay (buy low, sell high), or do basic skilled freelance work — writing, design, repairs.",
    pros: ["Scalable with practice", "Builds market intuition", "Can operate from a phone"],
    cons: ["Needs some starting capital or skill", "Competitive market", "Time directly trades for money"],
    percentile: "Bottom 20–30% globally",
    professions: "Freelancer, reseller, skilled tradesperson, delivery driver",
    examples: "Most gig economy workers; entry-level freelancers in developing countries",
    life: "Renting a room or modest apartment. Owns a phone, maybe a bike. Eating decent food with a few small luxuries. Always stressed about expenses.",
    dailyIncome: "$30–$150/day", networth: "$500–$10K", shadow: false,
  },
  {
    id: 3, amount: "$1,000/day", name: "The Operator", emoji: "💼",
    accent: "#5BB8F5", dimAccent: "#1A4A70",
    method: "Land a high-ticket freelance project — web development, consulting, video production — or flip a vehicle or electronics at a strong margin.",
    pros: ["Meaningful daily income", "Skill-based competitive moat", "Remote-friendly"],
    cons: ["Requires a developed skill or capital", "Client dependency", "Income inconsistent without a pipeline"],
    percentile: "Top 40–50% globally; bottom 40% in developed nations",
    professions: "Consultant, skilled contractor, small business owner, senior freelancer",
    examples: "Average American white-collar worker, mid-level tech worker in India, small restaurant owner",
    life: "Renting a decent apartment. Owns a car. Can afford one vacation a year. Some savings. Stress is about career growth, not survival.",
    dailyIncome: "$150–$500/day", networth: "$10K–$100K", shadow: false,
  },
  {
    id: 4, amount: "$10,000/day", name: "The Professional", emoji: "📈",
    accent: "#5DE8A0", dimAccent: "#1A5E3A",
    method: "Close a high-value sales deal, trade options or crypto with significant capital, or deliver a high-stakes consulting engagement.",
    pros: ["Elite earning tier", "Strong professional network", "Opportunities that compound"],
    cons: ["High pressure and stress", "Years of ramp-up required", "Needs significant expertise or capital"],
    percentile: "Top 5–15% in developed nations",
    professions: "Investment banker, surgeon, successful entrepreneur, high-ticket realtor",
    examples: "Wall Street analysts, senior lawyers, successful agency founders",
    life: "Owns a nice home. Drives a BMW or Tesla. Private school for kids. European vacations. Anxiety about maintaining the lifestyle.",
    dailyIncome: "$1K–$5K/day", networth: "$100K–$1M", shadow: false,
  },
  {
    id: 5, amount: "$100,000/day", name: "The Elite", emoji: "🏆",
    accent: "#C084FC", dimAccent: "#5B2A7A",
    method: "Secure a large M&A advisory fee, have a major stock position move favorably, or close a transaction on a luxury real estate portfolio.",
    pros: ["Life-changing single-day gain", "Wealth begins to compound aggressively", "Access to exclusive networks"],
    cons: ["Requires being already wealthy or deeply connected", "High risk exposure", "Rare event — even for top earners"],
    percentile: "Top 1–2% globally",
    professions: "Hedge fund manager, tech executive, private equity partner, celebrity",
    examples: "Mid-tier VCs, startup founders post-Series B, top 1% earners",
    life: "Multiple properties. Business class as standard. Kids in elite universities. Philanthropy begins. Money is no longer a daily concern.",
    dailyIncome: "$5K–$50K/day", networth: "$1M–$10M", shadow: false,
  },
  {
    id: 6, amount: "$1,000,000/day", name: "The Mogul", emoji: "🚀",
    accent: "#38D9D9", dimAccent: "#0A5555",
    method: "Execute a startup exit, have a major equity stake acquired, or benefit from a significant market-moving event on a large leveraged position.",
    pros: ["Generational wealth potential", "Complete financial freedom", "Influence and access at the highest levels"],
    cons: ["Extremely rare — needs years of groundwork", "Tax complexity and legal overhead", "Requires being in the right circle"],
    percentile: "Top 0.1%",
    professions: "Startup founder, major investor, C-suite executive, top entertainer or athlete",
    examples: "Series B/C founders at exit, top hedge fund traders, mid-tier celebrities",
    life: "Private jets occasionally. Multiple luxury homes. Art collections. Staff and assistants. Invited to Davos. Identity shifts from earner to builder.",
    dailyIncome: "$50K–$500K/day", networth: "$10M–$100M", shadow: false,
  },
  {
    id: 7, amount: "$10,000,000/day", name: "The Titan", emoji: "🌐",
    accent: "#FF7B7B", dimAccent: "#6B1A1A",
    method: "IPO of your company, major acquisition exit, or a blockbuster deal in entertainment, sports, or media.",
    pros: ["Dynastic wealth", "Can fund industries or movements", "Legacy-level historical impact"],
    cons: ["Takes decades to build to this point", "Target for lawsuits and public attention", "Increasing isolation from ordinary life"],
    percentile: "Top 0.01%",
    professions: "Tech founder, sports superstar, billionaire lieutenant, top VC partner",
    examples: "Instagram founders at acquisition, top NBA players, country-level entrepreneurs",
    life: "Private jets are standard. Security detail. Yachts. Charity foundations. Your grandchildren will never need to work. Life is fully curated.",
    dailyIncome: "$500K–$5M/day", networth: "$100M–$1B", shadow: false,
  },
  {
    id: 8, amount: "$100,000,000/day", name: "The Oligarch", emoji: "🏰",
    accent: "#BF7FFF", dimAccent: "#4A1A6B",
    method: "Your company's stock surges on a major product launch, regulatory win, or market event. A single percentage point on a $10B company = $100M.",
    pros: ["Economy-scale influence", "Political access at the highest levels", "A self-perpetuating wealth machine"],
    cons: ["Constant public scrutiny", "Political and legal threats from governments", "All relationships become transactional"],
    percentile: "Top 0.001% — fewer than 100,000 people globally",
    professions: "Major tech CEO, media mogul, resource billionaire, finance titan",
    examples: "Regional billionaires, Fortune 500 CEOs, inherited wealth dynasties",
    life: "Private islands. Political influence. World leaders return your calls. Art as investment vehicle. Meaning becomes the new currency.",
    dailyIncome: "$5M–$50M/day", networth: "$1B–$10B", shadow: false,
  },
  {
    id: 9, amount: "$1,000,000,000/day", name: "The God-Mode", emoji: "🌌",
    accent: "#7EB8FF", dimAccent: "#1A3A6B",
    method: "Tesla stock rises 1% in a single trading session. At $200B+ net worth, that's $2B in a day. Elon Musk has gained or lost $10B+ in a single session from equity moves alone.",
    pros: ["Reshape entire civilisations", "Can fund space programs or eradicate diseases", "You are the news cycle"],
    cons: ["Target of governments worldwide", "Zero privacy, zero normal life", "Wealth becomes completely abstract — a number, not a reality"],
    percentile: "Top 0.000001% — ~2,800 people on Earth",
    professions: "Founder of civilisation-scale companies, generational tech visionary, resource monopolist",
    examples: "Elon Musk, Jeff Bezos, Bernard Arnault, Mark Zuckerberg",
    life: "You don't live life — you architect it. Buy platforms for sport. Launch rockets for fun. Governments negotiate with you. Money is just a scoreboard now.",
    dailyIncome: "$50M–$5B/day", networth: "$100B+", shadow: false,
  },
  {
    id: 10, amount: "Immeasurable", name: "The Architecture", emoji: "🏛️",
    accent: "#FFB347", dimAccent: "#6B4010",
    shadowLabel: "SHADOW TIER I",
    method: "BlackRock, Vanguard and State Street — the 'Big Three' — collectively manage over $24 trillion in assets (2025). They are the largest shareholders in ~88% of S&P 500 companies simultaneously. Their daily 'gain' isn't measured in dollars but in systemic influence: every board vote across Apple, Microsoft, ExxonMobil, JPMorgan, and 500 others. They don't own the money — they wield it on behalf of millions of ordinary investors, which makes them simultaneously accountable to everyone and to no one.",
    pros: ["Control corporate governance at civilisational scale", "Simultaneously invested in competing companies — no one can win without them", "Quiet power: no single person to blame or unseat"],
    cons: ["Owned by the public — theoretically answerable to fund shareholders", "Massive regulatory and antitrust exposure growing globally", "Power is structural, not personal — hard to 'use' directly"],
    percentile: "3 institutions. Not on any wealth percentile chart.",
    professions: "Asset management executive, index fund architect, institutional steward",
    examples: "Larry Fink (BlackRock CEO), Salim Ramji (Vanguard CEO), Ron O'Hanley (State Street CEO)",
    life: "These are institutions, not individuals. The CEOs earn $10M–$30M/year — wealthy, but not billionaires. The true power is structural: they sit on every board, vote on every CEO, influence every major corporate policy — quietly, legally, continuously.",
    dailyIncome: "N/A — influence, not income", networth: "$24T+ AUM (managed)",
    shadow: true,
    factNote: "VERIFIED FACT: BlackRock, Vanguard and State Street are the top 3 institutional shareholders in 88% of S&P 500 companies (Harvard Business Review, 2019). Combined AUM exceeds $24 trillion as of 2025.",
  },
  {
    id: 11, amount: "Centuries old", name: "The Dynasty", emoji: "⚜️",
    accent: "#F28B82", dimAccent: "#6B1A16",
    shadowLabel: "SHADOW TIER II",
    method: "The Rothschilds built the first truly international banking network in the early 1800s — five sons, five European capitals, one family cipher. They financed Wellington at Waterloo, funded post-revolutionary France, and bankrolled the Suez Canal purchase. Their model: never own the economy — finance it. Today Rothschild & Co operates as a top global advisory bank. The Rockefellers perfected the dynasty trust in 1952, locking wealth across generations via charitable foundations that wield enormous soft power over universities, hospitals, and policy think-tanks.",
    pros: ["Wealth preserved across 6–10 generations via trusts and foundations", "Influence embedded in institutions — universities, museums, central banks", "They wrote the playbook everyone else follows"],
    cons: ["Fortune diluted across hundreds of descendants", "Public scrutiny and conspiracy mythology follows the name", "Peak influence was the 19th century — modern power has shifted"],
    percentile: "Historically uncategorisable. Today: ultra-wealthy family offices.",
    professions: "Private banker, foundation trustee, advisory firm partner, estate manager",
    examples: "Rothschild & Co (Paris/London), Rockefeller Brothers Fund, Edmond de Rothschild Group (Geneva)",
    life: "Old money does not show. No flashy yachts, no Twitter presence. Dinners with central bank governors, seats on museum boards, quiet stakes in private equity. Influence maintained not by spending, but by being indispensable to institutions that outlast any individual.",
    dailyIncome: "Private. Rothschilds ~$400B–$1.2T (disputed)",
    networth: "Deliberately opaque",
    shadow: true,
    factNote: "FACT/ESTIMATE: Rothschild family collective wealth is estimated at $400B+ with some sources citing up to $1.2T, though unverified due to private structures. Rockefeller collective is ~$10.3B per Forbes. Real power today is institutional, not liquid.",
  },
  {
    id: 12, amount: "Unknown", name: "The Unnamed", emoji: "👁️",
    accent: "#A8C8FF", dimAccent: "#1A2E55",
    shadowLabel: "SHADOW TIER III",
    method: "This is where documented fact ends and structural reality begins. Vanguard is owned by its own funds — which are owned by its investors — creating a recursive loop with no single human owner. The 'Big Three' themselves own each other: Vanguard is the largest shareholder of BlackRock; BlackRock is a top shareholder of State Street. Who ultimately controls Vanguard? Tens of millions of ordinary pension holders — teachers, nurses, retirees — who have no idea they 'own' the world's most powerful asset manager. Power at this level is not held by a person. It is a self-sustaining system.",
    pros: ["No single point of failure — no one person can be removed", "Accountability is so diffuse it is functionally zero", "The system perpetuates itself regardless of who runs it"],
    cons: ["This is the conspiracy theorist's nightmare: the answer is boring — it's pension funds", "No villain, no secret room, no shadowy cabal to expose", "The real power is emergent, not intentional — impossible to reform easily"],
    percentile: "This tier has no inhabitants. It is a structure, not a person.",
    professions: "Does not apply. This is systemic, not individual.",
    examples: "The recursive ownership loop: Vanguard funds → own Vanguard → own BlackRock → own State Street → own Vanguard funds. The snake eating its own tail.",
    life: "There is no 'life at this level' because no single human being occupies it. The terrifying and anti-climactic truth: the entity that most influences global capital allocation is owned by ordinary people who invest in index funds, managed by salaried executives who report to boards, regulated (loosely) by governments. The shadow is cast by everyone — and therefore by no one.",
    dailyIncome: "The system manages ~$24T in assets daily",
    networth: "Systemic, not personal",
    shadow: true,
    factNote: "VERIFIED: Vanguard's unique mutual ownership structure is confirmed on their own corporate site and by the SEC. The cross-ownership loop is documented in public filings. This is not conspiracy — it is legal, public, and structurally bizarre.",
  },
];

// ─── Colour tokens ────────────────────────────────────────────────────────────
// Background layers (dark, distinct steps so cards lift off the page)
const BG0 = "#0E0F13";   // page root — deepest
const BG1 = "#161820";   // card surface
const BG2 = "#1E2030";   // inset / nested box
// Text
const TX1 = "#F0EDE6";   // primary — near-white warm
const TX2 = "#B8B4AC";   // secondary — readable mid-tone
const TX3 = "#6E6B65";   // tertiary — muted labels
// Semantic
const GRN = "#4ADE80";   // pros
const RED = "#F87171";   // cons
const BRD = "#2A2D3E";   // default border
// ─────────────────────────────────────────────────────────────────────────────

function Tag({ children, accent }) {
  return (
    <span style={{
      fontFamily: "monospace", fontSize: 11, padding: "3px 10px",
      borderRadius: 20, background: BG2,
      border: `0.5px solid ${BRD}`,
      color: accent || TX2, letterSpacing: 0.5,
    }}>
      {children}
    </span>
  );
}

function SectionLabel({ children, accent }) {
  return (
    <div style={{
      fontFamily: "monospace", fontSize: 10, letterSpacing: 5,
      textTransform: "uppercase", color: accent || TX3,
      marginBottom: 8,
    }}>
      {children}
    </div>
  );
}

function ProConList({ items, type, accent }) {
  const isPos = type === "pros";
  const colour = isPos ? GRN : RED;
  return (
    <div style={{
      background: BG2, borderRadius: 8, padding: 16,
      border: `0.5px solid ${BRD}`,
      borderTop: `2px solid ${colour}`,
    }}>
      <SectionLabel accent={colour}>{isPos ? "Pros" : "Cons"}</SectionLabel>
      {items.map((item, i) => (
        <div key={i} style={{
          display: "flex", gap: 8, marginBottom: 7,
          fontSize: 13, lineHeight: 1.6,
          color: TX2, fontFamily: "monospace",
          alignItems: "flex-start",
        }}>
          <span style={{ color: colour, fontSize: 10, marginTop: 4, flexShrink: 0 }}>
            {isPos ? "▲" : "▼"}
          </span>
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

function InfoBox({ label, content, accent }) {
  return (
    <div style={{ background: BG2, borderRadius: 8, padding: 16, border: `0.5px solid ${BRD}` }}>
      <SectionLabel accent={accent}>{label}</SectionLabel>
      <div style={{ fontSize: 13, color: TX2, fontFamily: "monospace", lineHeight: 1.65 }}>
        {content}
      </div>
    </div>
  );
}

export default function WealthLadderShadow() {
  const [current, setCurrent] = useState(0);
  const level = levels[current];
  const firstShadowIdx = levels.findIndex(l => l.shadow);

  return (
    <div style={{ background: BG0, minHeight: "100vh", color: TX1, fontFamily: "'Georgia', 'Times New Roman', serif" }}>
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "0 20px 80px" }}>

        {/* ── Header ── */}
        <div style={{ textAlign: "center", padding: "48px 0 28px", borderBottom: `0.5px solid ${BRD}`, marginBottom: 28 }}>
          <div style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: 6, color: TX3, textTransform: "uppercase", marginBottom: 12 }}>
            The Wealth Ladder — Shadow Edition
          </div>
          <h1 style={{ fontSize: "clamp(26px,5vw,46px)", fontWeight: 300, color: TX1, lineHeight: 1.15, margin: 0 }}>
            From{" "}
            <span style={{ fontStyle: "italic", color: level.accent }}>survival</span>
            {" "}to{" "}
            <span style={{ fontStyle: "italic", color: level.accent }}>shadow</span>
          </h1>
          <div style={{ fontFamily: "monospace", fontSize: 12, color: TX3, marginTop: 8, letterSpacing: 2 }}>
            13 levels · Beggar to the hand behind the hand
          </div>
        </div>

        {/* ── Tier nav ── */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", marginBottom: 28, paddingBottom: 20, borderBottom: `0.5px solid ${BRD}` }}>
          {levels.map((l, i) => {
            const isActive = current === i;
            return (
              <span key={i}>
                {i === firstShadowIdx && (
                  <div style={{ width: "100%", textAlign: "center", fontFamily: "monospace", fontSize: 10, letterSpacing: 5, color: TX3, padding: "8px 0 6px" }}>
                    — beyond the scoreboard —
                  </div>
                )}
                <button
                  onClick={() => setCurrent(i)}
                  style={{
                    fontFamily: "monospace", fontSize: 11, letterSpacing: 0.5,
                    padding: "5px 12px", borderRadius: 4, cursor: "pointer",
                    border: `1px solid ${isActive ? l.accent : BRD}`,
                    color: isActive ? BG0 : l.accent,
                    background: isActive ? l.accent : "transparent",
                    fontStyle: l.shadow ? "italic" : "normal",
                    transition: "all 0.18s",
                    opacity: isActive ? 1 : 0.7,
                  }}
                >
                  {["Immeasurable","Centuries old","Unknown"].includes(l.amount) ? `${l.emoji} ${l.name}` : l.amount}
                </button>
              </span>
            );
          })}
        </div>

        {/* ── Shadow disclaimer ── */}
        {level.shadow && (
          <div style={{
            fontFamily: "monospace", fontSize: 12, color: TX2,
            background: BG1, borderRadius: 8, padding: "12px 16px",
            marginBottom: 20, lineHeight: 1.7, border: `0.5px solid ${BRD}`,
            borderLeft: `3px solid ${level.accent}`,
          }}>
            <span style={{ color: level.accent, fontWeight: 600 }}>Editorial note: </span>
            {level.factNote}
          </div>
        )}

        {/* ── Main card ── */}
        <div style={{
          borderRadius: 12, padding: "28px 28px 24px",
          border: `1px solid ${level.accent}44`,
          background: BG1,
        }}>
          {/* Level header */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: 4, color: level.accent, textTransform: "uppercase", marginBottom: 8 }}>
              {level.shadow
                ? `${level.shadowLabel} · ${level.percentile}`
                : `Level ${level.id + 1} · ${level.percentile}`}
            </div>
            <div style={{ fontSize: "clamp(22px,4vw,34px)", fontWeight: 300, color: TX1, letterSpacing: -0.5 }}>
              {level.emoji} {level.name}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
              <Tag accent={level.accent}>Daily gain: {level.amount}</Tag>
              <Tag>Income: {level.dailyIncome}</Tag>
              <Tag>Net worth: {level.networth}</Tag>
            </div>
          </div>

          {/* Method */}
          <SectionLabel accent={level.accent}>The Method</SectionLabel>
          <div style={{
            background: BG2, borderRadius: 8, padding: "16px 18px",
            marginBottom: 18, border: `0.5px solid ${BRD}`,
            borderLeft: `3px solid ${level.accent}`,
          }}>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: TX1, margin: 0 }}>
              {level.method}
            </p>
          </div>

          {/* Pros / Cons */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 }}>
            <ProConList items={level.pros} type="pros" accent={level.accent} />
            <ProConList items={level.cons} type="cons" accent={level.accent} />
          </div>

          {/* Info grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 }}>
            <InfoBox label="Professions" content={level.professions} accent={level.accent} />
            <InfoBox label="Examples" content={level.examples} accent={level.accent} />
          </div>

          {/* Life */}
          <SectionLabel>Life at this level</SectionLabel>
          <div style={{
            background: BG2, borderRadius: 8, padding: "18px 20px",
            border: `0.5px solid ${BRD}`,
            borderLeft: `4px solid ${level.accent}`,
            borderBottom: `2px solid ${level.accent}33`,
            fontSize: 15, fontStyle: "italic", lineHeight: 1.85, color: TX2,
          }}>
            "{level.life}"
          </div>

          {/* Nav */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 28 }}>
            <button
              onClick={() => setCurrent(Math.max(0, current - 1))}
              disabled={current === 0}
              style={{
                background: "transparent", color: current === 0 ? TX3 : TX2,
                border: `0.5px solid ${current === 0 ? BRD : "#555"}`,
                borderRadius: 6, padding: "9px 20px", fontSize: 12,
                cursor: current === 0 ? "default" : "pointer",
                fontFamily: "monospace",
              }}
            >← Poorer</button>
            <span style={{ fontFamily: "monospace", fontSize: 11, color: TX3, letterSpacing: 3 }}>
              {current + 1} / {levels.length}
            </span>
            <button
              onClick={() => setCurrent(Math.min(levels.length - 1, current + 1))}
              disabled={current === levels.length - 1}
              style={{
                background: current === levels.length - 1 ? "transparent" : level.accent,
                color: current === levels.length - 1 ? TX3 : BG0,
                border: `0.5px solid ${current === levels.length - 1 ? BRD : level.accent}`,
                borderRadius: 6, padding: "9px 20px", fontSize: 12,
                cursor: current === levels.length - 1 ? "default" : "pointer",
                fontFamily: "monospace", fontWeight: 600,
                transition: "all 0.18s",
              }}
            >{current >= 9 ? "Deeper →" : "Richer →"}</button>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 32, fontFamily: "monospace", fontSize: 10, letterSpacing: 4, color: TX3 }}>
          WEALTH IS RELATIVE · POWER IS STRUCTURAL · TRUTH IS BORING
        </div>
      </div>
    </div>
  );
}