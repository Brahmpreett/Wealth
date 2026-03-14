import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const levels = [
  {
    id: 0,
    amount: "$1/day",
    name: "The Survivor",
    emoji: "🪙",
    accentHex: "#8B6914",
    method:
      "Collect recyclable bottles and cans, do micro-tasks on TaskRabbit, beg, or sell a found item.",
    pros: ["Zero capital needed", "Immediate cash", "No skills required"],
    cons: [
      "Physically demanding",
      "Socially stigmatised",
      "Unpredictable income",
    ],
    percentile: "Bottom 1% globally",
    professions: "Street vendor, scrap collector, day laborer, beggar",
    examples:
      "Homeless individuals in urban areas; informal workers in developing nations",
    life: "Survival mode. Every dollar goes toward food or shelter. No savings, no bank account, no safety net. Life is a daily grind of finding the next meal.",
    dailyIncome: "$0–$5/day",
    networth: "~$0",
    shadow: false,
  },
  {
    id: 1,
    amount: "$10/day",
    name: "The Hustler",
    emoji: "🔧",
    accentHex: "#A0522D",
    method:
      "Offer simple local services — mow a lawn, wash cars, sell homemade food, or assist with moving.",
    pros: ["Low barrier to entry", "Can start today", "Builds work ethic"],
    cons: [
      "Time-intensive for small return",
      "Weather & location dependent",
      "Nearly impossible to scale",
    ],
    percentile: "Bottom 5–10% globally",
    professions: "Gig worker, street food seller, domestic helper, car washer",
    examples:
      "Informal economy workers across South Asia, Africa, Latin America",
    life: "Living paycheck to paycheck. Sharing housing. No healthcare. Small joys are big wins. Community is a lifeline.",
    dailyIncome: "$5–$30/day",
    networth: "$0–$500",
    shadow: false,
  },
  {
    id: 2,
    amount: "$100/day",
    name: "The Grinder",
    emoji: "🛠️",
    accentHex: "#8B5E00",
    method:
      "Flip items on Facebook Marketplace or eBay (buy low, sell high), or do basic skilled freelance work — writing, design, repairs.",
    pros: [
      "Scalable with practice",
      "Builds market intuition",
      "Can operate from a phone",
    ],
    cons: [
      "Needs some starting capital or skill",
      "Competitive market",
      "Time directly trades for money",
    ],
    percentile: "Bottom 20–30% globally",
    professions: "Freelancer, reseller, skilled tradesperson, delivery driver",
    examples:
      "Most gig economy workers; entry-level freelancers in developing countries",
    life: "Renting a room or modest apartment. Owns a phone, maybe a bike. Eating decent food with a few small luxuries. Always stressed about expenses.",
    dailyIncome: "$30–$150/day",
    networth: "$500–$10K",
    shadow: false,
  },
  {
    id: 3,
    amount: "$1,000/day",
    name: "The Operator",
    emoji: "💼",
    accentHex: "#2E5E8E",
    method:
      "Land a high-ticket freelance project — web development, consulting, video production — or flip a vehicle or electronics at a strong margin.",
    pros: [
      "Meaningful daily income",
      "Skill-based competitive moat",
      "Remote-friendly",
    ],
    cons: [
      "Requires a developed skill or capital",
      "Client dependency",
      "Income is inconsistent without a pipeline",
    ],
    percentile: "Top 40–50% globally; bottom 40% in developed nations",
    professions:
      "Consultant, skilled contractor, small business owner, senior freelancer",
    examples:
      "Average American white-collar worker, mid-level tech worker in India, small restaurant owner",
    life: "Renting a decent apartment. Owns a car. Can afford one vacation a year. Some savings. Stress is about career growth, not survival.",
    dailyIncome: "$150–$500/day",
    networth: "$10K–$100K",
    shadow: false,
  },
  {
    id: 4,
    amount: "$10,000/day",
    name: "The Professional",
    emoji: "📈",
    accentHex: "#1A5E3A",
    method:
      "Close a high-value sales deal, trade options or crypto with significant capital, or deliver a high-stakes consulting engagement.",
    pros: [
      "Elite earning tier",
      "Strong professional network",
      "Opportunities that compound",
    ],
    cons: [
      "High pressure and stress",
      "Years of ramp-up required",
      "Needs significant expertise or capital",
    ],
    percentile: "Top 5–15% in developed nations",
    professions:
      "Investment banker, surgeon, successful entrepreneur, high-ticket realtor",
    examples: "Wall Street analysts, senior lawyers, successful agency founders",
    life: "Owns a nice home. Drives a BMW or Tesla. Private school for kids. European vacations. Anxiety about maintaining the lifestyle.",
    dailyIncome: "$1K–$5K/day",
    networth: "$100K–$1M",
    shadow: false,
  },
  {
    id: 5,
    amount: "$100,000/day",
    name: "The Elite",
    emoji: "🏆",
    accentHex: "#7B5EA7",
    method:
      "Secure a large M&A advisory fee, have a major stock position move favorably, or close a transaction on a luxury real estate portfolio.",
    pros: [
      "Life-changing single-day gain",
      "Wealth begins to compound aggressively",
      "Access to exclusive networks",
    ],
    cons: [
      "Requires being already wealthy or deeply connected",
      "High risk exposure",
      "Rare event — even for top earners",
    ],
    percentile: "Top 1–2% globally",
    professions:
      "Hedge fund manager, tech executive, private equity partner, celebrity",
    examples: "Mid-tier VCs, startup founders post-Series B, top 1% earners",
    life: "Multiple properties. Business class as standard. Kids in elite universities. Philanthropy begins. Money is no longer a daily concern.",
    dailyIncome: "$5K–$50K/day",
    networth: "$1M–$10M",
    shadow: false,
  },
  {
    id: 6,
    amount: "$1,000,000/day",
    name: "The Mogul",
    emoji: "🚀",
    accentHex: "#006080",
    method:
      "Execute a startup exit, have a major equity stake acquired, or benefit from a significant market-moving event on a large leveraged position.",
    pros: [
      "Generational wealth potential",
      "Complete financial freedom",
      "Influence and access at the highest levels",
    ],
    cons: [
      "Extremely rare — needs years of groundwork",
      "Tax complexity and legal overhead",
      "Requires being in the right circle",
    ],
    percentile: "Top 0.1%",
    professions:
      "Startup founder, major investor, C-suite executive, top entertainer or athlete",
    examples:
      "Series B/C founders at exit, top hedge fund traders, mid-tier celebrities",
    life: "Private jets occasionally. Multiple luxury homes. Art collections. Staff and assistants. Invited to Davos. Identity shifts from earner to builder.",
    dailyIncome: "$50K–$500K/day",
    networth: "$10M–$100M",
    shadow: false,
  },
  {
    id: 7,
    amount: "$10,000,000/day",
    name: "The Titan",
    emoji: "🌐",
    accentHex: "#8B2000",
    method:
      "IPO of your company, major acquisition exit, or a blockbuster deal in entertainment, sports, or media.",
    pros: [
      "Dynastic wealth",
      "Can fund industries or movements",
      "Legacy-level historical impact",
    ],
    cons: [
      "Takes decades to build to this point",
      "Target for lawsuits and public attention",
      "Increasing isolation from ordinary life",
    ],
    percentile: "Top 0.01%",
    professions:
      "Tech founder, sports superstar, billionaire lieutenant, top VC partner",
    examples:
      "Instagram founders at acquisition, top NBA players, country-level entrepreneurs",
    life: "Private jets are standard. Security detail. Yachts. Charity foundations. Your grandchildren will never need to work. Life is fully curated.",
    dailyIncome: "$500K–$5M/day",
    networth: "$100M–$1B",
    shadow: false,
  },
  {
    id: 8,
    amount: "$100,000,000/day",
    name: "The Oligarch",
    emoji: "🏰",
    accentHex: "#4A0080",
    method:
      "Your company's stock surges on a major product launch, regulatory win, or market event. A single percentage point on a $10B company = $100M.",
    pros: [
      "Economy-scale influence",
      "Political access at the highest levels",
      "A self-perpetuating wealth machine",
    ],
    cons: [
      "Constant public scrutiny",
      "Political and legal threats from governments",
      "All relationships become transactional",
    ],
    percentile: "Top 0.001% — fewer than 100,000 people globally",
    professions:
      "Major tech CEO, media mogul, resource billionaire, finance titan",
    examples:
      "Regional billionaires, Fortune 500 CEOs, inherited wealth dynasties",
    life: "Private islands. Political influence. World leaders return your calls. Art as investment vehicle. Meaning becomes the new currency.",
    dailyIncome: "$5M–$50M/day",
    networth: "$1B–$10B",
    shadow: false,
  },
  {
    id: 9,
    amount: "$1,000,000,000/day",
    name: "The God-Mode",
    emoji: "🌌",
    accentHex: "#1A1A5E",
    method:
      "Tesla stock rises 1% in a single trading session. At $200B+ net worth, that's $2B in a day. Elon Musk has gained or lost $10B+ in a single session from equity moves alone.",
    pros: [
      "Reshape entire civilisations",
      "Can fund space programs or eradicate diseases",
      "You are the news cycle",
    ],
    cons: [
      "Target of governments worldwide",
      "Zero privacy, zero normal life",
      "Wealth becomes completely abstract — a number, not a reality",
    ],
    percentile: "Top 0.000001% — ~2,800 people on Earth",
    professions:
      "Founder of civilisation-scale companies, generational tech visionary, resource monopolist",
    examples: "Elon Musk, Jeff Bezos, Bernard Arnault, Mark Zuckerberg",
    life: "You don't live life — you architect it. Buy platforms for sport. Launch rockets for fun. Governments negotiate with you. Money is just a scoreboard now.",
    dailyIncome: "$50M–$5B/day",
    networth: "$100B+",
    shadow: false,
  },
  {
    id: 10,
    amount: "Immeasurable",
    name: "The Architecture",
    emoji: "🏛️",
    accentHex: "#5A3000",
    shadowLabel: "SHADOW TIER I",
    method:
      "BlackRock, Vanguard and State Street — the 'Big Three' — collectively manage over $24 trillion in assets (2025). They are the largest shareholders in ~88% of S&P 500 companies simultaneously. Their daily 'gain' isn't measured in dollars but in systemic influence: every board vote across Apple, Microsoft, ExxonMobil, JPMorgan, and 500 others. They don't own the money — they wield it on behalf of millions of ordinary investors, which makes them simultaneously accountable to everyone and to no one.",
    pros: [
      "Control corporate governance at civilisational scale",
      "Simultaneously invested in competing companies — no one can win without them",
      "Quiet power: no single person to blame or unseat",
    ],
    cons: [
      "Owned by the public — theoretically answerable to fund shareholders",
      "Massive regulatory and antitrust exposure growing globally",
      "Power is structural, not personal — hard to 'use' directly",
    ],
    percentile: "3 institutions. Not on any wealth percentile chart.",
    professions:
      "Asset management executive, index fund architect, institutional steward",
    examples:
      "Larry Fink (BlackRock CEO), Salim Ramji (Vanguard CEO), Ron O'Hanley (State Street CEO)",
    life: "These are institutions, not individuals. The CEOs earn $10M–$30M/year — wealthy, but not billionaires. The true power is structural: they sit on every board, vote on every CEO, influence every major corporate policy — quietly, legally, continuously.",
    dailyIncome: "N/A — influence, not income",
    networth: "$24T+ AUM (not owned; managed)",
    shadow: true,
    factNote:
      "VERIFIED FACT: BlackRock, Vanguard and State Street are the top 3 institutional shareholders in 88% of S&P 500 companies (Harvard Business Review, 2019). Combined AUM exceeds $24 trillion as of 2025.",
  },
  {
    id: 11,
    amount: "Centuries old",
    name: "The Dynasty",
    emoji: "⚜️",
    accentHex: "#3D0000",
    shadowLabel: "SHADOW TIER II",
    method:
      "The Rothschilds built the first truly international banking network in the early 1800s — five sons, five European capitals, one family cipher. They financed Wellington at Waterloo, funded post-revolutionary France, and bankrolled the Suez Canal purchase. Their model: never own the economy — finance it. Today Rothschild & Co operates as a top global advisory bank. The Rockefellers perfected the dynasty trust in 1952, locking wealth across generations via charitable foundations that also wield enormous soft power over universities, hospitals, and policy think-tanks.",
    pros: [
      "Wealth preserved across 6–10 generations via trusts and foundations",
      "Influence embedded in institutions — universities, museums, central banks",
      "They wrote the playbook everyone else follows",
    ],
    cons: [
      "Fortune has been diluted across hundreds of descendants",
      "Public scrutiny and conspiracy mythology follows the name",
      "Peak influence was the 19th century — modern power has shifted",
    ],
    percentile:
      "Historically uncategorisable. Today: ultra-wealthy family offices, not dominant world powers.",
    professions:
      "Private banker, foundation trustee, advisory firm partner, estate manager",
    examples:
      "Rothschild & Co (Paris/London), Rockefeller Brothers Fund, Edmond de Rothschild Group (Geneva)",
    life: "Old money does not show. No flashy yachts, no Twitter presence. Dinners with central bank governors, seats on museum boards, quiet stakes in private equity. Influence maintained not by spending, but by being indispensable to institutions that outlast any individual.",
    dailyIncome:
      "Private. Rothschilds ~$400B–$1.2T (disputed), Rockefellers ~$10B collective",
    networth: "Deliberately opaque",
    shadow: true,
    factNote:
      "FACT/ESTIMATE: Rothschild family collective wealth is widely estimated at $400B+ with some sources citing up to $1.2T, though this is unverified due to private structures. Rockefeller collective is ~$10.3B per Forbes. Their real power today is institutional, not liquid.",
  },
  {
    id: 12,
    amount: "Unknown",
    name: "The Unnamed",
    emoji: "👁️",
    accentHex: "#1a1a2e",
    shadowLabel: "SHADOW TIER III",
    method:
      "This is where documented fact ends and structural reality begins. Vanguard is owned by its own funds — which are owned by its investors — creating a recursive loop with no single human owner. The 'Big Three' themselves own each other: Vanguard is the largest shareholder of BlackRock; BlackRock is a top shareholder of State Street. Who ultimately controls Vanguard? Tens of millions of ordinary pension holders — teachers, nurses, retirees — who have no idea they 'own' the world's most powerful asset manager. Power at this level is not held by a person. It is a self-sustaining system.",
    pros: [
      "No single point of failure — no one person can be removed",
      "Accountability is so diffuse it is functionally zero",
      "The system perpetuates itself regardless of who runs it",
    ],
    cons: [
      "This is the conspiracy theorist's nightmare: the answer is boring — it's pension funds",
      "No villain, no secret room, no shadowy cabal to expose",
      "The real power is emergent, not intentional — and therefore impossible to reform easily",
    ],
    percentile: "This tier has no inhabitants. It is a structure, not a person.",
    professions: "Does not apply. This is systemic, not individual.",
    examples:
      "The recursive ownership loop: Vanguard funds → own Vanguard → own BlackRock → own State Street → own Vanguard funds. The snake eating its own tail.",
    life: "There is no 'life at this level' because no single human being occupies it. The terrifying and anti-climactic truth: the entity that most influences global capital allocation is owned by ordinary people who invest in index funds, managed by salaried executives who report to boards, regulated (loosely) by governments. The shadow is cast by everyone — and therefore by no one.",
    dailyIncome: "The system manages ~$24T in assets daily",
    networth: "Systemic, not personal",
    shadow: true,
    factNote:
      "VERIFIED: Vanguard's unique mutual ownership structure is confirmed on their own corporate site and by the SEC. The cross-ownership loop is documented in public filings. This is not conspiracy — it is legal, public, and structurally bizarre.",
  },
];

const styles = {
  root: {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    background: "#060608",
    minHeight: "100vh",
    color: "#E8E0D0",
  },
  wrap: {
    maxWidth: 880,
    margin: "0 auto",
    padding: "0 20px 80px",
  },
  header: {
    textAlign: "center",
    padding: "48px 0 28px",
    borderBottom: "0.5px solid #1a1a1a",
    marginBottom: 28,
  },
  supertitle: {
    fontSize: 11,
    letterSpacing: 6,
    color: "#444",
    fontFamily: "monospace",
    textTransform: "uppercase",
    marginBottom: 12,
  },
  mainTitle: {
    fontSize: "clamp(26px, 5vw, 46px)",
    fontWeight: 300,
    color: "#F0E8D8",
    lineHeight: 1.15,
    margin: 0,
  },
  subtitle: {
    fontSize: 13,
    color: "#444",
    marginTop: 8,
    fontFamily: "monospace",
    letterSpacing: 2,
  },
};

function NavButton({ level, isSelected, onClick, isShadow }) {
  const label =
    level.amount === "Immeasurable" ||
    level.amount === "Centuries old" ||
    level.amount === "Unknown"
      ? `${level.emoji} ${level.name}`
      : level.amount;
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: "monospace",
        fontSize: 11,
        letterSpacing: 1,
        padding: "5px 11px",
        borderRadius: 4,
        cursor: "pointer",
        border: `0.5px solid ${level.accentHex}88`,
        color: isSelected ? "#000" : level.accentHex,
        background: isSelected ? level.accentHex : "transparent",
        opacity: isSelected ? 1 : 0.6,
        fontStyle: isShadow ? "italic" : "normal",
        transition: "all 0.2s",
      }}
    >
      {label}
    </button>
  );
}

function ProConList({ items, type }) {
  const isPos = type === "pros";
  return (
    <div
      style={{
        background: "#0a0a0a",
        borderRadius: 8,
        padding: 16,
        border: "0.5px solid #1a1a1a",
        borderTop: `2px solid ${isPos ? "#4CAF50" : "#E53935"}`,
      }}
    >
      <div
        style={{
          fontFamily: "monospace",
          fontSize: 10,
          letterSpacing: 3,
          color: isPos ? "#4CAF50" : "#E53935",
          textTransform: "uppercase",
          marginBottom: 10,
        }}
      >
        {isPos ? "Pros" : "Cons"}
      </div>
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 7,
            fontSize: 13,
            lineHeight: 1.55,
            color: "#999",
            fontFamily: "monospace",
          }}
        >
          <span
            style={{
              color: isPos ? "#4CAF50" : "#E53935",
              fontSize: 10,
              marginTop: 3,
              flexShrink: 0,
            }}
          >
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
    <div
      style={{
        background: "#0a0a0a",
        borderRadius: 8,
        padding: 16,
        border: "0.5px solid #1a1a1a",
      }}
    >
      <div
        style={{
          fontFamily: "monospace",
          fontSize: 10,
          letterSpacing: 4,
          color: accent,
          textTransform: "uppercase",
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 13,
          color: "#888",
          fontFamily: "monospace",
          lineHeight: 1.6,
        }}
      >
        {content}
      </div>
    </div>
  );
}

export default function WealthLadderShadow() {
  const [current, setCurrent] = useState(0);
  const level = levels[current];

  const firstShadowIdx = levels.findIndex((l) => l.shadow);

  return (
    <div style={styles.root}>
      <div style={styles.wrap}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.supertitle}>The Wealth Ladder — Shadow Edition</div>
          <h1 style={styles.mainTitle}>
            From{" "}
            <span style={{ fontStyle: "italic", color: level.accentHex }}>
              survival
            </span>{" "}
            to{" "}
            <span style={{ fontStyle: "italic", color: level.accentHex }}>
              shadow
            </span>
          </h1>
          <div style={styles.subtitle}>
            13 levels · Beggar to the hand behind the hand
          </div>
        </div>

        {/* Nav */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            justifyContent: "center",
            marginBottom: 28,
            padding: "0 0 20px",
            borderBottom: "0.5px solid #111",
          }}
        >
          {levels.map((l, i) => (
            <div key={i}>
              {i === firstShadowIdx && (
                <div
                  style={{
                    width: "100%",
                    textAlign: "center",
                    fontFamily: "monospace",
                    fontSize: 10,
                    letterSpacing: 5,
                    color: "#333",
                    padding: "8px 0 6px",
                    marginBottom: 2,
                  }}
                >
                  — beyond the scoreboard —
                </div>
              )}
              <NavButton
                level={l}
                isSelected={current === i}
                onClick={() => setCurrent(i)}
                isShadow={l.shadow}
              />
            </div>
          ))}
        </div>

        {/* Disclaimer for shadow tiers */}
        {level.shadow && (
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 11,
              color: "#555",
              background: "#0a0a0a",
              borderRadius: 8,
              padding: "12px 16px",
              marginBottom: 20,
              lineHeight: 1.7,
              border: "0.5px solid #1a1a1a",
            }}
          >
            <span style={{ color: "#888", fontWeight: 600 }}>
              Editorial note:{" "}
            </span>
            {level.factNote}
          </div>
        )}

        {/* Main Card */}
        <div
          style={{
            borderRadius: 12,
            padding: "28px 28px 24px",
            border: `0.5px solid ${level.accentHex}33`,
            background: "#0a0a0a",
          }}
        >
          {/* Level header */}
          <div style={{ marginBottom: 22 }}>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 11,
                letterSpacing: 4,
                color: level.accentHex,
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              {level.shadow
                ? `${level.shadowLabel} · ${level.percentile}`
                : `Level ${level.id + 1} · ${level.percentile}`}
            </div>
            <div
              style={{
                fontSize: "clamp(22px, 4vw, 34px)",
                fontWeight: 300,
                color: "#F0E8D8",
                letterSpacing: -0.5,
              }}
            >
              {level.emoji} {level.name}
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                marginTop: 10,
              }}
            >
              {[
                ["Daily gain", level.amount, true],
                ["Income", level.dailyIncome, false],
                ["Net worth", level.networth, false],
              ].map(([label, val, accent]) => (
                <span
                  key={label}
                  style={{
                    fontFamily: "monospace",
                    fontSize: 12,
                    padding: "4px 10px",
                    borderRadius: 20,
                    background: "#060608",
                    border: "0.5px solid #1a1a1a",
                    color: accent ? level.accentHex : "#666",
                  }}
                >
                  {label}:{" "}
                  <strong style={{ color: accent ? level.accentHex : "#888" }}>
                    {val}
                  </strong>
                </span>
              ))}
            </div>
          </div>

          {/* Method */}
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 10,
              letterSpacing: 4,
              color: level.accentHex,
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            The Method
          </div>
          <div
            style={{
              background: "#060608",
              borderRadius: 8,
              padding: 18,
              marginBottom: 18,
              borderLeft: `3px solid ${level.accentHex}`,
              border: `0.5px solid #1a1a1a`,
              borderLeftWidth: 3,
              borderLeftColor: level.accentHex,
            }}
          >
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.75,
                color: "#C8C0B0",
                margin: 0,
              }}
            >
              {level.method}
            </p>
          </div>

          {/* Pros / Cons */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 14,
              marginBottom: 18,
            }}
          >
            <ProConList items={level.pros} type="pros" />
            <ProConList items={level.cons} type="cons" />
          </div>

          {/* Info grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 14,
              marginBottom: 18,
            }}
          >
            <InfoBox
              label="Professions"
              content={level.professions}
              accent={level.accentHex}
            />
            <InfoBox
              label="Examples"
              content={level.examples}
              accent={level.accentHex}
            />
          </div>

          {/* Life */}
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 10,
              letterSpacing: 4,
              color: "#444",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            Life at this level
          </div>
          <div
            style={{
              background: "#060608",
              borderRadius: 8,
              padding: "18px 20px",
              borderLeft: `4px solid ${level.accentHex}`,
              borderBottom: `2px solid ${level.accentHex}22`,
              border: `0.5px solid #1a1a1a`,
              borderLeftWidth: 4,
              borderLeftColor: level.accentHex,
              fontSize: 15,
              fontStyle: "italic",
              lineHeight: 1.8,
              color: "#888",
            }}
          >
            "{level.life}"
          </div>

          {/* Navigation */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 28,
            }}
          >
            <button
              onClick={() => setCurrent(Math.max(0, current - 1))}
              disabled={current === 0}
              style={{
                background: "transparent",
                color: current === 0 ? "#222" : "#666",
                border: `0.5px solid ${current === 0 ? "#1a1a1a" : "#333"}`,
                borderRadius: 6,
                padding: "9px 20px",
                fontSize: 12,
                cursor: current === 0 ? "default" : "pointer",
                fontFamily: "monospace",
              }}
            >
              ← Poorer
            </button>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 11,
                color: "#333",
                letterSpacing: 3,
              }}
            >
              {current + 1} / {levels.length}
            </span>
            <button
              onClick={() =>
                setCurrent(Math.min(levels.length - 1, current + 1))
              }
              disabled={current === levels.length - 1}
              style={{
                background: "transparent",
                color:
                  current === levels.length - 1 ? "#222" : level.accentHex,
                border: `0.5px solid ${current === levels.length - 1 ? "#1a1a1a" : level.accentHex + "88"}`,
                borderRadius: 6,
                padding: "9px 20px",
                fontSize: 12,
                cursor: current === levels.length - 1 ? "default" : "pointer",
                fontFamily: "monospace",
              }}
            >
              {current >= 9 ? "Deeper →" : "Richer →"}
            </button>
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            marginTop: 32,
            fontFamily: "monospace",
            fontSize: 10,
            letterSpacing: 4,
            color: "#222",
          }}
        >
          WEALTH IS RELATIVE · POWER IS STRUCTURAL · TRUTH IS BORING
        </div>
      </div>
    </div>
  );
}