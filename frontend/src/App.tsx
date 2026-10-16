// import { useState } from "react";
// import "./App.css";

// type ScanResult = {
//   level: "High" | "Medium" | "Low";
//   warnings: string[];
// };

// function analyzeMessage(message: string): ScanResult {
//   const text = message.toLowerCase();
//   const warnings: string[] = [];

//   const patterns = [
//     {
//       words: ["otp", "one time password", "verification code"],
//       warning: "The message mentions an OTP or verification code.",
//     },
//     {
//       words: ["urgent", "immediately", "act now", "account blocked"],
//       warning: "The message uses urgency or account-blocking pressure.",
//     },
//     {
//       words: ["upi pin", "share your pin", "bank password"],
//       warning: "The message may be asking for sensitive banking information.",
//     },
//     {
//       words: ["prize", "lottery", "you won", "claim reward"],
//       warning: "The message makes a prize or reward claim.",
//     },
//     {
//       words: ["pay now", "send money", "processing fee"],
//       warning: "The message requests money or a payment.",
//     },
//     {
//       words: ["click here", "http://", "https://", "bit.ly"],
//       warning: "The message contains a link or asks you to click one.",
//     },
//   ];

//   for (const pattern of patterns) {
//     if (pattern.words.some((word) => text.includes(word))) {
//       warnings.push(pattern.warning);
//     }
//   }

//   const level =
//     warnings.length >= 3
//       ? "High"
//       : warnings.length >= 1
//         ? "Medium"
//         : "Low";

//   return { level, warnings };
// }

// function App() {
//   const [message, setMessage] = useState("");
//   const [result, setResult] = useState<ScanResult | null>(null);

//   function handleAnalyze() {
//     if (!message.trim()) {
//       setResult(null);
//       return;
//     }

//     setResult(analyzeMessage(message));
//   }

//   return (
//     <main className="app">
//       <header className="navbar">
//         <a className="brand" href="#home">
//           <span className="brand-icon">S</span>
//           <span>ScamVeda</span>
//         </a>
//         <span className="nav-label">Your digital safety companion</span>
//       </header>

//       <section className="hero" id="home">
//         <div className="eyebrow">YOUR SAFETY, OUR PRIORITY</div>
//         <h1>
//           Think before you click.
//           <br />
//           <span>Check before you trust.</span>
//         </h1>
//         <p>
//           Check suspicious messages for common scam warning signs.
//           Simple, clear explanations help you make safer decisions online.
//         </p>
//       </section>

//       <section className="scanner">
//         <div className="scanner-heading">
//           <div>
//             <span className="section-kicker">MESSAGE CHECKER</span>
//             <h2>Have a suspicious message?</h2>
//             <p>Paste it below to check for warning signs.</p>
//           </div>
//           <span className="shield" aria-hidden="true">🛡️</span>
//         </div>

//         <label htmlFor="message">Suspicious message or URL</label>
//         <textarea
//           id="message"
//           value={message}
//           onChange={(event) => {
//             setMessage(event.target.value);
//             setResult(null);
//           }}
//           maxLength={5000}
//           placeholder="Example: Your account will be blocked. Click this link immediately..."
//           rows={6}
//         />

//         <div className="input-footer">
//           <span>Do not enter passwords, OTPs, or other private information.</span>
//           <span>{message.length}/5000</span>
//         </div>

//         <button
//           className="analyze-button"
//           onClick={handleAnalyze}
//           disabled={!message.trim()}
//         >
//           Analyze Message <span aria-hidden="true">→</span>
//         </button>

//         {result && (
//           <section className="result" aria-live="polite">
//             <span className={`risk risk-${result.level.toLowerCase()}`}>
//               {result.level} indicator level
//             </span>
//             <h3>
//               {result.level === "High"
//                 ? "Several warning signs found"
//                 : result.level === "Medium"
//                   ? "Potential warning signs found"
//                   : "Few known warning signs detected"}
//             </h3>

//             {result.warnings.length > 0 ? (
//               <ul>
//                 {result.warnings.map((warning) => (
//                   <li key={warning}>{warning}</li>
//                 ))}
//               </ul>
//             ) : (
//               <p>
//                 No matching warning patterns were found. This does not mean
//                 the message is safe.
//               </p>
//             )}

//             <p className="safety-tip">
//               <strong>Stay safe:</strong> Do not share OTPs or UPI PINs.
//               Verify unexpected requests using an official website or
//               independently obtained contact details.
//             </p>
//             <p className="prototype-note">
//               Prototype check only — this uses basic keyword rules, not an
//               AI model. It can miss scams and flag legitimate messages.
//             </p>
//           </section>
//         )}
//       </section>

//       <section className="tips">
//         <h2>Stay one step ahead of scams</h2>
//         <div className="tip-grid">
//           <article className="tip-card">
//             <span>🔐</span>
//             <h3>Protect your OTP</h3>
//             <p>Never share an OTP or UPI PIN with another person.</p>
//           </article>
//           <article className="tip-card">
//             <span>🔗</span>
//             <h3>Check links carefully</h3>
//             <p>Verify a website's address before entering any details.</p>
//           </article>
//           <article className="tip-card">
//             <span>⏳</span>
//             <h3>Pause under pressure</h3>
//             <p>Urgent threats and unexpected rewards deserve caution.</p>
//           </article>
//         </div>
//       </section>

//       <footer>
//         <p>ScamVeda · Building safer digital habits in India</p>
//         <p>Early prototype · Always verify suspicious requests independently.</p>
//       </footer>
//     </main>
//   );
// }

// export default App;





import { useState } from "react";
import "./App.css";

type ScanResult = {
  level: "High" | "Medium" | "Low";
  warnings: string[];
};

function analyzeMessage(message: string): ScanResult {
  const text = message.toLowerCase();
  const warnings: string[] = [];

  const patterns = [
    {
      words: ["otp", "one time password", "verification code"],
      warning: "Mentions an OTP or verification code.",
    },
    {
      words: ["urgent", "immediately", "act now", "account blocked"],
      warning: "Uses urgency or account-blocking pressure.",
    },
    {
      words: ["upi pin", "share your pin", "bank password"],
      warning: "May request sensitive banking information.",
    },
    {
      words: ["prize", "lottery", "you won", "claim reward"],
      warning: "Makes an unexpected prize or reward claim.",
    },
    {
      words: ["pay now", "send money", "processing fee"],
      warning: "Requests money or a payment.",
    },
    {
      words: ["click here", "http://", "https://", "bit.ly"],
      warning: "Contains a link or asks you to click one.",
    },
  ];

  for (const pattern of patterns) {
    if (pattern.words.some((word) => text.includes(word))) {
      warnings.push(pattern.warning);
    }
  }

  const level =
    warnings.length >= 3
      ? "High"
      : warnings.length >= 1
        ? "Medium"
        : "Low";

  return { level, warnings };
}

function App() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState("");

  function handleAnalyze() {
    if (!message.trim()) {
      setError("Please paste a message before starting your scan.");
      setResult(null);
      return;
    }

    setError("");
    setResult(analyzeMessage(message));
  }

  function handleClear() {
    setMessage("");
    setResult(null);
    setError("");
  }

  return (
    <main className="app" id="home">
      <header className="navbar">
        <a className="brand" href="#home" aria-label="ScamVeda home">
          <span className="brand-icon">S</span>
          <span>ScamVeda<span className="brand-period">.</span></span>
        </a>

        <nav className="nav-links" aria-label="Main navigation">
          <a className="nav-active" href="#home">Home</a>
          <a href="#scanner">Message scanner</a>
          <a href="#learn">Safety tips</a>
        </nav>

        <span className="nav-trust">
          <span className="status-dot" />
          Your digital safety companion
        </span>
      </header>

      <section className="hero">
        <div className="hero-content">
          <div className="eyebrow">
            <span className="eyebrow-icon">✳</span>
            YOUR SAFETY, OUR PRIORITY
          </div>

          <h1>
            Think before you click.
            <br />
            <span>Check before you trust.</span>
          </h1>

          <p className="hero-description">
            Suspicious message? Don't guess. Check for common scam warning
            signs and learn how to protect yourself online.
          </p>

          <div className="hero-points">
            <span><span className="check-mark">✓</span> Simple explanations</span>
            <span><span className="check-mark">✓</span> Privacy-conscious design</span>
            <span><span className="check-mark">✓</span> Safety-first guidance</span>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="hero-shield">
            <svg viewBox="0 0 100 100" role="presentation">
              <path
                d="M50 9 81 21V45C81 66 67 82 50 91 33 82 19 66 19 45V21Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinejoin="round"
              />
              <path
                d="m35 49 10 10 21-23"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="floating-note note-top">
            <span className="mini-dot" />
            Stay alert online
          </div>
          <div className="floating-note note-bottom">
            <span className="note-check">✓</span>
            Think. Check. Protect.
          </div>
        </div>
      </section>

      <section className="scanner-section" id="scanner">
        <div className="section-intro">
          <span className="section-kicker">THE SCAMVEDA SCAN</span>
          <h2>A second look can protect you.</h2>
          <p>Paste a suspicious SMS, email, chat message, or URL below.</p>
        </div>

        <div className="scanner">
          <div className="scanner-heading">
            <div className="scanner-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M12 3 20 6V12C20 17 16.5 20 12 22 7.5 20 4 17 4 12V6Z" />
                <path d="m8.5 12 2.3 2.3 4.8-5" />
              </svg>
            </div>
            <div>
              <h3>Message security check</h3>
              <p>Your scan looks for common warning signs.</p>
            </div>
            <span className="prototype-badge">BETA</span>
          </div>

          <label htmlFor="message">Suspicious message or URL</label>
          <textarea
            id="message"
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
              setResult(null);
              setError("");
            }}
            maxLength={5000}
            placeholder={"Paste the message here...\n\nExample: Your account will be blocked. Click this link immediately to claim your reward."}
            rows={6}
            aria-describedby="input-help"
          />

          <div className="input-footer" id="input-help">
            <span>Never paste passwords, OTPs, or private banking details.</span>
            <span className="character-count">{message.length}/5000</span>
          </div>

          {error && <p className="form-error" role="alert">{error}</p>}

          <div className="scanner-actions">
            <button
              className="analyze-button"
              onClick={handleAnalyze}
              disabled={!message.trim()}
            >
              Analyze message <span aria-hidden="true">→</span>
            </button>
            <button
              className="clear-button"
              onClick={handleClear}
              disabled={!message && !result && !error}
            >
              Clear
            </button>
          </div>

          <div className="privacy-note">
            <span aria-hidden="true">ⓘ</span>
            <p>
              <strong>Privacy note:</strong> This prototype analyses text in
              your browser. It does not send the message to a server.
            </p>
          </div>

          {result && (
            <section
              className={`result result-${result.level.toLowerCase()}`}
              aria-live="polite"
            >
              <div className="result-top">
                <div>
                  <span className="result-label">SCAN SUMMARY</span>
                  <h3>
                    {result.level === "High"
                      ? "Multiple warning signs detected"
                      : result.level === "Medium"
                        ? "Potential warning signs detected"
                        : "Few known warning signs detected"}
                  </h3>
                </div>
                <span className={`risk risk-${result.level.toLowerCase()}`}>
                  <span className="risk-dot" />
                  {result.level} indicator level
                </span>
              </div>

              <div className="result-count">
                <strong>{result.warnings.length}</strong>
                <span>
                  {result.warnings.length === 1
                    ? "warning pattern matched"
                    : "warning patterns matched"}
                </span>
              </div>

              <div className="result-divider" />

              <h4>What caught our attention</h4>
              {result.warnings.length > 0 ? (
                <ul className="warning-list">
                  {result.warnings.map((warning) => (
                    <li key={warning}>
                      <span className="warning-icon" aria-hidden="true">!</span>
                      {warning}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-warning">
                  No matching patterns were found by this basic checker.
                  Scams can still use language that these rules do not detect.
                </p>
              )}

              <div className="safety-tip">
                <span className="tip-icon" aria-hidden="true">✓</span>
                <div>
                  <strong>Your next step</strong>
                  <p>
                    Never share OTPs or UPI PINs. Verify unexpected requests
                    through an official app or website you open yourself.
                    Never rely on contact details provided in a suspicious message.
                  </p>
                </div>
              </div>

              <p className="prototype-note">
                Rule-based prototype, not a trained AI model. These indicators
                are not proof of fraud or legitimacy. Always verify independently.
              </p>
            </section>
          )}
        </div>
      </section>

      <section className="tips-section" id="learn">
        <div className="tips-heading">
          <div>
            <span className="section-kicker">A LITTLE CAUTION GOES A LONG WAY</span>
            <h2>Three habits. Better protection.</h2>
          </div>
          <p>Pause for a moment before you respond to an unexpected message.</p>
        </div>

        <div className="tip-grid">
          <article className="tip-card">
            <div className="tip-card-icon icon-blue" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <rect x="5" y="10" width="14" height="11" rx="2" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
              </svg>
            </div>
            <span className="tip-number">01 / KEEP IT PRIVATE</span>
            <h3>Protect your OTP</h3>
            <p>Never share an OTP, UPI PIN, or banking password with anyone.</p>
          </article>

          <article className="tip-card">
            <div className="tip-card-icon icon-teal" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M10 13a5 5 0 0 0 7.1 0l2-2a5 5 0 0 0-7.1-7.1l-1.2 1.2" />
                <path d="M14 11a5 5 0 0 0-7.1 0l-2 2a5 5 0 0 0 7.1 7.1l1.2-1.2" />
              </svg>
            </div>
            <span className="tip-number">02 / VERIFY FIRST</span>
            <h3>Inspect every link</h3>
            <p>Check the domain carefully. Visit official sites independently instead of trusting message links.</p>
          </article>

          <article className="tip-card">
            <div className="tip-card-icon icon-amber" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
            </div>
            <span className="tip-number">03 / DON'T RUSH</span>
            <h3>Pause under pressure</h3>
            <p>Threats, urgent demands, and unexpected rewards are reasons to slow down and verify.</p>
          </article>
        </div>
      </section>

      <footer className="footer">
        <a className="brand footer-brand" href="#home">
          <span className="brand-icon">S</span>
          <span>ScamVeda<span className="brand-period">.</span></span>
        </a>
        <p>Building safer digital habits in India.</p>
        <span className="footer-disclaimer">
          Early prototype · No automated check can guarantee safety.
        </span>
      </footer>
    </main>
  );
}

export default App;
