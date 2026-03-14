import { useState } from "react";

const levels = [
  {
    id: 0,
    amount: "$1",
    raw: 1,
    name: "The Survivor",
    emoji: "🪙",
    color: "#8B4513",
    bg: "#2A1A0A",
    method: "Collect & return recyclable bottles/cans, beg, do a micro-task on TaskRabbit, or sell a found item.",
    pros: ["Zero capital needed", "Immediate cash", "No skills required"],
    cons: ["Physically demanding", "Socially stigmatized", "Unpredictable income"],
    percentile: "Bottom 1%",
    professions: ["Street vendor", "Scrap collector", "Day laborer", "Beggar"],
    examples: ["Unnamed millions in developing nations", "Homeless individuals in urban areas"],
    life: "Survival mode. Every dollar goes toward food or shelter. No savings, no bank account, no safety net. Life is a daily grind of finding the next meal.",
    dailyIncome: "$0–$5/day",
    networth: "Near $0",
  },
  {
    id: 1,
    amount: "$10",
    raw: 10,
    name: "The Hustler",
    emoji: "🔧",
    color: "#A0522D",
    bg: "#1A100A",
    method: "Offer a simple service locally — mow a lawn, wash a car, do laundry, or sell homemade food at a corner.",
    pros: ["Low barrier to entry", "Can start today", "Builds work ethic"],
    cons: ["Time-intensive for small return", "Weather/location dependent", "Hard to scale"],
    percentile: "Bottom 5–10%",
    professions: ["Gig worker", "Street food seller", "Domestic helper", "Car washer"],
    examples: ["Informal economy workers across South Asia, Africa, Latin America"],
    life: "Living paycheck to paycheck. Likely sharing housing. No healthcare. Small joys are big wins. Community is a lifeline.",
    dailyIncome: "$5–$30/day",
    networth: "$0–$500",
  },
  {
    id: 2,
    amount: "$100",
    raw: 100,
    name: "The Grinder",
    emoji: "🛠️",
    color: "#CD853F",
    bg: "#150F05",
    method: "Flip an item on Facebook Marketplace or eBay (buy low, sell high), or do skilled freelance work for one client (writing, design, repair).",
    pros: ["Scalable with practice", "Builds market intuition", "Can work from phone"],
    cons: ["Requires some starting capital or skill", "Competitive market", "Time still trades for money"],
    percentile: "Bottom 20–30%",
    professions: ["Freelancer", "Reseller", "Skilled tradesperson", "Delivery driver"],
    examples: ["Most gig economy workers", "Entry-level freelancers in developing countries"],
    life: "Renting a room or modest apartment. Owns a phone and maybe a bike or old car. Eating decent food, some small luxuries. Stressed about expenses.",
    dailyIncome: "$30–$150/day",
    networth: "$500–$10,000",
  },
  {
    id: 3,
    amount: "$1,000",
    raw: 1000,
    name: "The Operator",
    emoji: "💼",
    color: "#DAA520",
    bg: "#120E02",
    method: "Run a high-ticket freelance project (web dev, consulting, video production) or flip a vehicle/electronics with a good margin.",
    pros: ["Meaningful daily income", "Skill-based moat", "Can be done remotely"],
    cons: ["Requires developed skill or capital", "Client dependency", "Inconsistent without pipeline"],
    percentile: "Top 40–50% globally, bottom 40% in developed nations",
    professions: ["Consultant", "Skilled contractor", "Small business owner", "Senior freelancer"],
    examples: ["Average American worker", "Mid-level tech worker in India", "Small restaurant owner"],
    life: "Renting a decent apartment. Owns a car. Can afford vacations once a year. Some savings. Stress is about career growth, not survival.",
    dailyIncome: "$150–$500/day",
    networth: "$10K–$100K",
  },
  {
    id: 4,
    amount: "$10,000",
    raw: 10000,
    name: "The Professional",
    emoji: "📈",
    color: "#C0C0C0",
    bg: "#0D0D12",
    method: "Close a high-value sales deal, trade options/crypto with significant capital, or deliver a high-stakes consulting engagement.",
    pros: ["Elite earning tier", "Strong professional network", "Compounding opportunities"],
    cons: ["High pressure and stress", "Long ramp-up to reach this level", "Requires significant expertise or capital"],
    percentile: "Top 5–15% in developed nations",
    professions: ["Investment banker", "Surgeon", "Successful entrepreneur", "High-ticket realtor"],
    examples: ["Wall Street analysts", "Senior lawyers", "Successful agency owners"],
    life: "Owns a nice home. Drives a BMW or Tesla. Private schools for kids. Vacations in Europe. Some anxiety about maintaining lifestyle.",
    dailyIncome: "$1K–$5K/day",
    networth: "$100K–$1M",
  },
  {
    id: 5,
    amount: "$100,000",
    raw: 100000,
    name: "The Elite",
    emoji: "🏆",
    color: "#FFD700",
    bg: "#0A0A08",
    method: "Secure a large M&A deal fee, have a major stock position move favorably, or close a real estate transaction on a luxury property.",
    pros: ["Life-changing single-day gain", "Wealth compounds at this level", "Access to exclusive networks"],
    cons: ["Requires being already wealthy or deeply connected", "High risk exposure", "Rare for most mortals"],
    percentile: "Top 1–2% globally",
    professions: ["Hedge fund manager", "Tech executive", "Private equity partner", "Celebrity"],
    examples: ["Mid-level VCs", "Startup founders post-funding", "Top 1% earners"],
    life: "Multiple properties. Business class flights. Kids in elite universities. Philanthropy starts here. Money is no longer a daily concern.",
    dailyIncome: "$5K–$50K/day",
    networth: "$1M–$10M",
  },
  {
    id: 6,
    amount: "$1,000,000",
    raw: 1000000,
    name: "The Mogul",
    emoji: "🚀",
    color: "#00CED1",
    bg: "#020D0D",
    method: "Execute a startup exit, have a major equity stake acquired, or benefit from a significant market-moving event on a large leveraged position.",
    pros: ["Generational wealth potential", "Complete financial freedom", "Influence and access"],
    cons: ["Extremely rare event", "Needs years of groundwork", "Tax complexity, legal overhead"],
    percentile: "Top 0.1%",
    professions: ["Startup founder", "Major investor", "C-suite executive", "Entertainer/Athlete"],
    examples: ["Series B founders", "Top hedge fund traders", "Mid-tier celebrities"],
    life: "Private jets occasionally. Multiple luxury homes. Art collections. Staff and assistants. Invited to Davos. Identity shifts from earner to builder.",
    dailyIncome: "$50K–$500K/day",
    networth: "$10M–$100M",
  },
  {
    id: 7,
    amount: "$10,000,000",
    raw: 10000000,
    name: "The Titan",
    emoji: "🌐",
    color: "#7B68EE",
    bg: "#05020F",
    method: "IPO of your company, major acquisition exit, or a blockbuster entertainment deal (film, music, sports contract).",
    pros: ["Dynastic wealth", "Can fund entire movements", "Legacy-level impact"],
    cons: ["Takes years/decades to build", "Target for lawsuits and attention", "Isolation from 'normal' life"],
    percentile: "Top 0.01%",
    professions: ["Tech founder", "Sports superstar", "Billionaire's lieutenant", "Top VC partner"],
    examples: ["Instagram founders at acquisition", "Top NBA players", "Country-level entrepreneurs"],
    life: "Private jets are standard. Security detail. Yachts. Charity foundations. Your children's children won't need to work. Life is curated.",
    dailyIncome: "$500K–$5M/day",
    networth: "$100M–$1B",
  },
  {
    id: 8,
    amount: "$100,000,000",
    raw: 100000000,
    name: "The Oligarch",
    emoji: "🏰",
    color: "#FF6B35",
    bg: "#0F0500",
    method: "Your company's stock surges on a major product launch, regulatory win, or market event. A single percentage point on a $10B company = $100M.",
    pros: ["Economy-scale influence", "Political access", "Perpetual wealth machine"],
    cons: ["Constant public scrutiny", "Political and legal threats", "Relationships become transactional"],
    percentile: "Top 0.001% — fewer than 100,000 people globally",
    professions: ["Major tech CEO", "Media mogul", "Resource billionaire", "Finance titan"],
    examples: ["Regional billionaires", "Fortune 500 CEOs", "Inherited wealth dynasties"],
    life: "Private islands. Political influence. Your phone call gets answered by world leaders. Art as investment. Meaning becomes the new currency.",
    dailyIncome: "$5M–$50M/day",
    networth: "$1B–$10B",
  },
  {
    id: 9,
    amount: "$1,000,000,000",
    raw: 1000000000,
    name: "The God-Mode",
    emoji: "🌌",
    color: "#FF2D55",
    bg: "#0F0005",
    method: "Tesla stock rises 1% on a single day. At $200B+ net worth, that's $2B in a day. Elon Musk has gained/lost $10B+ in single days via equity moves.",
    pros: ["Reshape civilization", "Fund space programs, cure diseases", "Literally own the news cycle"],
    cons: ["Target of governments", "No privacy whatsoever", "Wealth becomes abstract and meaningless"],
    percentile: "Top 0.000001% — ~2,800 people on Earth",
    professions: ["Founder of civilization-scale companies", "Generational tech visionary", "Resource monopolist"],
    examples: ["Elon Musk", "Jeff Bezos", "Bernard Arnault", "Mark Zuckerberg"],
    life: "You don't live life — you architect it. Buy Twitter for sport. Launch rockets for fun. Governments negotiate with you. Money is just a scoreboard.",
    dailyIncome: "$50M–$5B/day",
    networth: "$100B+",
  },
];

export default function WealthLevels() {
  const [selected, setSelected] = useState(0);
  const level = levels[selected];

  return (
    <div style={{
      fontFamily: "'Georgia', serif",
      background: "#060608",
      minHeight: "100vh",
      color: "#E8E0D0",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Header */}
      <div style={{
        textAlign: "center",
        padding: "48px 24px 24px",
        borderBottom: "1px solid #1a1a1a",
      }}>
        <div style={{
          fontSize: "11px",
          letterSpacing: "6px",
          color: "#555",
          textTransform: "uppercase",
          marginBottom: "12px",
        }}>The Wealth Ladder</div>
        <h1 style={{
          fontSize: "clamp(28px, 5vw, 52px)",
          fontWeight: "300",
          letterSpacing: "-1px",
          margin: 0,
          color: "#F0E8D8",
        }}>How to Gain <span style={{ color: level.color, transition: "color 0.4s" }}>Wealth</span> in a Day</h1>
        <p style={{ color: "#555", marginTop: "8px", fontSize: "14px" }}>From beggar to billionaire — 10 levels of daily net worth gain</p>
      </div>

      {/* Level Selector */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "6px",
        padding: "20px 16px",
        flexWrap: "wrap",
        borderBottom: "1px solid #111",
      }}>
        {levels.map((l, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            style={{
              background: selected === i ? l.color : "transparent",
              color: selected === i ? "#000" : l.color,
              border: `1px solid ${l.color}`,
              borderRadius: "4px",
              padding: "6px 12px",
              fontSize: "12px",
              fontFamily: "monospace",
              cursor: "pointer",
              transition: "all 0.2s",
              opacity: selected === i ? 1 : 0.5,
            }}
          >
            {l.amount}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        maxWidth: "900px",
        margin: "0 auto",
        width: "100%",
        padding: "40px 24px",
      }}>
        {/* Title Card */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          marginBottom: "36px",
          padding: "28px",
          background: `linear-gradient(135deg, ${level.bg}, #0a0a0a)`,
          border: `1px solid ${level.color}22`,
          borderRadius: "12px",
        }}>
          <div style={{ fontSize: "52px" }}>{level.emoji}</div>
          <div>
            <div style={{
              fontSize: "11px",
              letterSpacing: "5px",
              color: level.color,
              textTransform: "uppercase",
              marginBottom: "6px",
            }}>Level {selected + 1} · {level.percentile}</div>
            <div style={{
              fontSize: "clamp(22px, 4vw, 36px)",
              fontWeight: "300",
              color: "#F0E8D8",
              letterSpacing: "-0.5px",
            }}>{level.name}</div>
            <div style={{
              display: "flex",
              gap: "20px",
              marginTop: "8px",
              fontSize: "13px",
              color: "#666",
            }}>
              <span>Daily gain: <span style={{ color: level.color }}>{level.amount}</span></span>
              <span>Income range: <span style={{ color: "#aaa" }}>{level.dailyIncome}</span></span>
              <span>Net worth: <span style={{ color: "#aaa" }}>{level.networth}</span></span>
            </div>
          </div>
        </div>

        {/* Method */}
        <div style={{
          marginBottom: "24px",
          padding: "24px",
          background: "#0a0a0a",
          border: `1px solid ${level.color}33`,
          borderRadius: "10px",
          borderLeft: `3px solid ${level.color}`,
        }}>
          <div style={{
            fontSize: "10px",
            letterSpacing: "4px",
            color: level.color,
            textTransform: "uppercase",
            marginBottom: "10px",
          }}>The Method</div>
          <p style={{ margin: 0, lineHeight: "1.7", fontSize: "16px", color: "#D0C8B8" }}>
            {level.method}
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}>
          {/* Pros */}
          <div style={{
            padding: "20px",
            background: "#0a0a0a",
            border: "1px solid #1a2a1a",
            borderRadius: "10px",
          }}>
            <div style={{ fontSize: "10px", letterSpacing: "4px", color: "#4CAF50", textTransform: "uppercase", marginBottom: "12px" }}>Pros</div>
            {level.pros.map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "8px" }}>
                <span style={{ color: "#4CAF50", marginTop: "2px", fontSize: "12px" }}>▲</span>
                <span style={{ fontSize: "14px", color: "#B0C8B0", lineHeight: "1.5" }}>{p}</span>
              </div>
            ))}
          </div>

          {/* Cons */}
          <div style={{
            padding: "20px",
            background: "#0a0a0a",
            border: "1px solid #2a1a1a",
            borderRadius: "10px",
          }}>
            <div style={{ fontSize: "10px", letterSpacing: "4px", color: "#F44336", textTransform: "uppercase", marginBottom: "12px" }}>Cons</div>
            {level.cons.map((c, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "8px" }}>
                <span style={{ color: "#F44336", marginTop: "2px", fontSize: "12px" }}>▼</span>
                <span style={{ fontSize: "14px", color: "#C8B0B0", lineHeight: "1.5" }}>{c}</span>
              </div>
            ))}
          </div>

          {/* Professions */}
          <div style={{
            padding: "20px",
            background: "#0a0a0a",
            border: "1px solid #1a1a2a",
            borderRadius: "10px",
          }}>
            <div style={{ fontSize: "10px", letterSpacing: "4px", color: "#7986CB", textTransform: "uppercase", marginBottom: "12px" }}>Typical Professions</div>
            {level.professions.map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "7px" }}>
                <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#7986CB", flexShrink: 0 }}></span>
                <span style={{ fontSize: "14px", color: "#B0B8C8" }}>{p}</span>
              </div>
            ))}
          </div>

          {/* Examples */}
          <div style={{
            padding: "20px",
            background: "#0a0a0a",
            border: "1px solid #2a2a1a",
            borderRadius: "10px",
          }}>
            <div style={{ fontSize: "10px", letterSpacing: "4px", color: level.color, textTransform: "uppercase", marginBottom: "12px" }}>Real Examples</div>
            {level.examples.map((e, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "7px" }}>
                <span style={{ color: level.color, fontSize: "12px", marginTop: "2px" }}>→</span>
                <span style={{ fontSize: "14px", color: "#C8C8B0", lineHeight: "1.5" }}>{e}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Life */}
        <div style={{
          padding: "24px",
          background: "#0a0a0a",
          border: "1px solid #1a1a1a",
          borderRadius: "10px",
          borderBottom: `3px solid ${level.color}`,
        }}>
          <div style={{
            fontSize: "10px",
            letterSpacing: "4px",
            color: "#888",
            textTransform: "uppercase",
            marginBottom: "10px",
          }}>Life at This Level</div>
          <p style={{ margin: 0, lineHeight: "1.8", fontSize: "15px", color: "#A0988A", fontStyle: "italic" }}>
            "{level.life}"
          </p>
        </div>

        {/* Navigation */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "24px",
        }}>
          <button
            onClick={() => setSelected(Math.max(0, selected - 1))}
            disabled={selected === 0}
            style={{
              background: "transparent",
              color: selected === 0 ? "#333" : "#888",
              border: `1px solid ${selected === 0 ? "#222" : "#444"}`,
              borderRadius: "6px",
              padding: "10px 20px",
              fontSize: "13px",
              cursor: selected === 0 ? "default" : "pointer",
              fontFamily: "Georgia, serif",
            }}
          >← Poorer</button>

          <div style={{ textAlign: "center", color: "#444", fontSize: "12px", letterSpacing: "2px" }}>
            {selected + 1} / {levels.length}
          </div>

          <button
            onClick={() => setSelected(Math.min(levels.length - 1, selected + 1))}
            disabled={selected === levels.length - 1}
            style={{
              background: "transparent",
              color: selected === levels.length - 1 ? "#333" : level.color,
              border: `1px solid ${selected === levels.length - 1 ? "#222" : level.color}`,
              borderRadius: "6px",
              padding: "10px 20px",
              fontSize: "13px",
              cursor: selected === levels.length - 1 ? "default" : "pointer",
              fontFamily: "Georgia, serif",
            }}
          >Richer →</button>
        </div>
      </div>

      <div style={{
        textAlign: "center",
        padding: "20px",
        color: "#333",
        fontSize: "11px",
        letterSpacing: "2px",
        borderTop: "1px solid #111",
      }}>
        WEALTH IS RELATIVE · CONTEXT IS EVERYTHING
      </div>
    </div>
  );
}
