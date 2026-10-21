
import { useState } from "react";
import "./App.css";

type ScanResult = {
  risk: "High" | "Medium" | "Low";
  warnings: string[];
  safety_advice: string[];
  disclaimer: string;
};

function App() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleAnalyze() {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      setError("Please paste a message before starting your scan.");
      setResult(null);
      return;
    }

    if (trimmedMessage.length > 5000) {
      setError("Your message must contain no more than 5000 characters.");
      setResult(null);
      return;
    }

    setError("");
    setResult(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: trimmedMessage }),
      });

      if (!response.ok) {
        if (response.status === 422) {
          throw new Error(
            "Please enter a message between 1 and 5000 characters.",
          );
        }

        throw new Error(
          "The scan could not be completed. Please try again.",
        );
      }

      const data: ScanResult = await response.json();
      setResult(data);
    } catch {
      setError(
        "Could not connect to ScamVeda. Check that the backend is running and try again.",
      );
    } finally {
      setIsLoading(false);
    }
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
          <span>
            ScamVeda<span className="brand-period">.</span>
          </span>
        </a>

        <nav className="nav-links" aria-label="Main navigation">
          <a className="nav-active" href="#home">
            Home
          </a>
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
            Suspicious message? Don&apos;t guess. Check for common scam
            warning signs and learn how to protect yourself online.
          </p>

          <div className="hero-points">
            <span>
              <span className="check-mark">✓</span> Simple explanations
            </span>
            <span>
              <span className="check-mark">✓</span> Privacy-conscious design
            </span>
            <span>
              <span className="check-mark">✓</span> Safety-first guidance
            </span>
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
          <p>
            Paste a suspicious SMS, email, chat message, or URL below.
          </p>
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
            placeholder={
              "Paste the message here...\n\nExample: Your account will be blocked. Click this link immediately to claim your reward."
            }
            rows={6}
            aria-describedby="input-help"
          />

          <div className="input-footer" id="input-help">
            <span>
              Never paste passwords, OTPs, or private banking details.
            </span>
            <span className="character-count">
              {message.length}/5000
            </span>
          </div>

          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}

          <div className="scanner-actions">
            <button
              className="analyze-button"
              onClick={handleAnalyze}
              disabled={!message.trim() || isLoading}
            >
              {isLoading ? "Analyzing..." : "Analyze message"}
              {!isLoading && <span aria-hidden="true"> →</span>}
            </button>

            <button
              className="clear-button"
              onClick={handleClear}
              disabled={!message && !result && !error && !isLoading}
            >
              Clear
            </button>
          </div>

          <div className="privacy-note">
            <span aria-hidden="true">ⓘ</span>
            <p>
              <strong>Privacy note:</strong> Your message is sent to the
              ScamVeda backend for analysis. Avoid entering passwords,
              OTPs, or private banking information.
            </p>
          </div>

          {result && (
            <section
              className={`result result-${result.risk.toLowerCase()}`}
              aria-live="polite"
            >
              <div className="result-top">
                <div>
                  <span className="result-label">SCAN SUMMARY</span>
                  <h3>
                    {result.risk === "High"
                      ? "Multiple warning signs detected"
                      : result.risk === "Medium"
                        ? "Potential warning signs detected"
                        : "Few known warning signs detected"}
                  </h3>
                </div>

                <span className={`risk risk-${result.risk.toLowerCase()}`}>
                  <span className="risk-dot" />
                  {result.risk} indicator level
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
                      <span className="warning-icon" aria-hidden="true">
                        !
                      </span>
                      {warning}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-warning">
                  No matching patterns were found by this checker.
                  Scams can still use language these rules do not detect.
                </p>
              )}

              <div className="safety-tip">
                <span className="tip-icon" aria-hidden="true">
                  ✓
                </span>
                <div>
                  <strong>Your next steps</strong>
                  <ul>
                    {result.safety_advice.map((advice) => (
                      <li key={advice}>{advice}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="prototype-note">{result.disclaimer}</p>
            </section>
          )}
        </div>
      </section>

      <section className="tips-section" id="learn">
        <div className="tips-heading">
          <div>
            <span className="section-kicker">
              A LITTLE CAUTION GOES A LONG WAY
            </span>
            <h2>Three habits. Better protection.</h2>
          </div>

          <p>
            Pause for a moment before you respond to an unexpected message.
          </p>
        </div>

        <div className="tip-grid">
          <article className="tip-card">
            <div
              className="tip-card-icon icon-blue"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24">
                <rect x="5" y="10" width="14" height="11" rx="2" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
              </svg>
            </div>

            <span className="tip-number">01 / KEEP IT PRIVATE</span>
            <h3>Protect your OTP</h3>
            <p>
              Never share an OTP, UPI PIN, or banking password with anyone.
            </p>
          </article>

          <article className="tip-card">
            <div
              className="tip-card-icon icon-teal"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24">
                <path d="M10 13a5 5 0 0 0 7.1 0l2-2a5 5 0 0 0-7.1-7.1l-1.2 1.2" />
                <path d="M14 11a5 5 0 0 0-7.1 0l-2 2a5 5 0 0 0 7.1 7.1l1.2-1.2" />
              </svg>
            </div>

            <span className="tip-number">02 / VERIFY FIRST</span>
            <h3>Inspect every link</h3>
            <p>
              Check the domain carefully. Visit official sites independently
              instead of trusting message links.
            </p>
          </article>

          <article className="tip-card">
            <div
              className="tip-card-icon icon-amber"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
            </div>

            <span className="tip-number">03 / DON&apos;T RUSH</span>
            <h3>Pause under pressure</h3>
            <p>
              Threats, urgent demands, and unexpected rewards are reasons
              to slow down and verify.
            </p>
          </article>
        </div>
      </section>

      <footer className="footer">
        <a className="brand footer-brand" href="#home">
          <span className="brand-icon">S</span>
          <span>
            ScamVeda<span className="brand-period">.</span>
          </span>
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
  