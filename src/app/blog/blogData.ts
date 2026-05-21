export const blogPosts = {
  "architecture-of-simplifi": {
    title: "The Architecture of Simplifi",
    description: "A deep dive into how we built Simplifi to automatically categorize millions of transactions in real-time.",
    date: "May 12, 2026",
    category: "Engineering",
    content: `
      <p style="color: var(--text-muted); font-size: 18px; line-height: 1.8; margin-bottom: 24px;">When we set out to build Simplifi, we knew the biggest bottleneck in personal finance apps wasn't the UI—it was the data categorization engine. Users hate manually tagging transactions. To solve this, we engineered a completely new architecture designed for sub-millisecond automated tagging.</p>
      
      <h2 style="font-size: 28px; font-weight: 300; margin: 48px 0 24px; color: var(--text-primary);">The Data Ingestion Pipeline</h2>
      <p style="color: var(--text-muted); font-size: 18px; line-height: 1.8; margin-bottom: 24px;">Our pipeline ingests data directly from Plaid and custom bank APIs. We utilize an event-driven architecture powered by Kafka to handle the massive volume of incoming webhook events. As soon as a transaction hits our ingestion layer, it is pushed to a worker node for evaluation.</p>
      
      <h2 style="font-size: 28px; font-weight: 300; margin: 48px 0 24px; color: var(--text-primary);">Machine Learning at the Edge</h2>
      <p style="color: var(--text-muted); font-size: 18px; line-height: 1.8; margin-bottom: 24px;">Instead of relying on heavy cloud functions, we deploy localized machine learning models directly at the edge. We use a proprietary NLP (Natural Language Processing) model trained on over 500 million transaction descriptions to instantly identify merchants, locations, and expense categories with 99.9% accuracy.</p>

      <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-color); border-radius: 12px; padding: 24px; margin: 32px 0;">
        <span class="tech-accent" style="margin-bottom: 8px; display: block;">PERFORMANCE METRIC</span>
        <div style="font-size: 32px; font-weight: 200; color: var(--text-primary);">12ms</div>
        <div style="color: var(--text-muted); font-size: 14px;">Average time to ingest, categorize, and save a new transaction.</div>
      </div>

      <h2 style="font-size: 28px; font-weight: 300; margin: 48px 0 24px; color: var(--text-primary);">What's Next?</h2>
      <p style="color: var(--text-muted); font-size: 18px; line-height: 1.8; margin-bottom: 24px;">Our engineering team is currently working on v2 of the categorization engine, which will include predictive cashflow mapping based on historical burn rates. The architecture scales seamlessly, allowing us to roll out these features without infrastructure overhauls.</p>
    `
  },
  "abandoning-tailwind-for-vanilla-css": {
    title: "Why we abandoned Tailwind for Vanilla CSS",
    description: "Our controversial decision to drop utility classes in favor of Vanilla CSS and custom CSS variables for our design system.",
    date: "April 28, 2026",
    category: "Design",
    content: `
      <p style="color: var(--text-muted); font-size: 18px; line-height: 1.8; margin-bottom: 24px;">Tailwind CSS is the undeniable industry standard for rapid prototyping and styling. However, as the Infirow design system grew more complex, we realized that utility classes were holding back our creative potential and dirtying our React component files.</p>
      
      <h2 style="font-size: 28px; font-weight: 300; margin: 48px 0 24px; color: var(--text-primary);">The Problem with Utility Classes</h2>
      <p style="color: var(--text-muted); font-size: 18px; line-height: 1.8; margin-bottom: 24px;">When building a premium, highly-animated interface, you inevitably run into deeply complex CSS rules: compound backdrop filters, multi-layered radial gradients, and dynamic CSS variable updates driven by scroll events. Cramming these into a <code>className</code> string made our components unreadable.</p>
      
      <h2 style="font-size: 28px; font-weight: 300; margin: 48px 0 24px; color: var(--text-primary);">Embracing CSS Modules and Variables</h2>
      <p style="color: var(--text-muted); font-size: 18px; line-height: 1.8; margin-bottom: 24px;">We transitioned entirely to CSS Modules paired with a strict CSS Custom Properties (variables) architecture. This allowed us to centralize our design tokens (like <code>--bg-color</code> and <code>--accent-purple-light</code>) while keeping component files perfectly clean.</p>
      <p style="color: var(--text-muted); font-size: 18px; line-height: 1.8; margin-bottom: 24px;">For dynamic animations—like our signature 3D glowing cards—we now update CSS variables directly via JavaScript refs, allowing the browser to hardware-accelerate the animations without triggering React re-renders.</p>
      
      <h2 style="font-size: 28px; font-weight: 300; margin: 48px 0 24px; color: var(--text-primary);">The Result</h2>
      <p style="color: var(--text-muted); font-size: 18px; line-height: 1.8; margin-bottom: 24px;">By abandoning Tailwind, we lost some initial development speed but gained complete aesthetic control. Our bundle size decreased by removing utility classes we weren't fully utilizing, and our designers now speak the exact same language as our engineers: pure CSS.</p>
    `
  },
  "announcing-infirow-beta": {
    title: "Announcing Infirow Beta",
    description: "Infirow is officially entering private beta. Get an early look at the ultimate wealth and life operating system.",
    date: "March 15, 2026",
    category: "Company",
    content: `
      <p style="color: var(--text-muted); font-size: 18px; line-height: 1.8; margin-bottom: 24px;">Today, we are thrilled to announce that Infirow is officially entering private beta. After two years of stealth development, thousands of commits, and countless iterations, our operating system for wealth management is ready for early adopters.</p>
      
      <h2 style="font-size: 28px; font-weight: 300; margin: 48px 0 24px; color: var(--text-primary);">What is Included in the Beta?</h2>
      <ul style="color: var(--text-muted); font-size: 18px; line-height: 1.8; margin-bottom: 24px; padding-left: 24px;">
        <li style="margin-bottom: 12px;"><strong>Simplifi Core:</strong> AI-driven transaction categorization, predictive cashflow, and advanced budgeting grids.</li>
        <li style="margin-bottom: 12px;"><strong>Algo Trading Sandbox:</strong> Visual strategy builder with access to 1-minute historical tick data for backtesting.</li>
        <li style="margin-bottom: 12px;"><strong>Infirow Dashboard:</strong> A unified, high-performance interface that brings all your accounts into one secure enclave.</li>
      </ul>
      
      <h2 style="font-size: 28px; font-weight: 300; margin: 48px 0 24px; color: var(--text-primary);">Our Vision for the Future</h2>
      <p style="color: var(--text-muted); font-size: 18px; line-height: 1.8; margin-bottom: 24px;">This beta is just the foundation. We are building toward a world where your tools work for you, not against you. Infirow represents an uncompromising approach to software—where beautiful design meets institutional-grade performance.</p>
      
      <h2 style="font-size: 28px; font-weight: 300; margin: 48px 0 24px; color: var(--text-primary);">How to Get Access</h2>
      <p style="color: var(--text-muted); font-size: 18px; line-height: 1.8; margin-bottom: 24px;">We are onboarding users in cohorts to ensure system stability. Join the waitlist on our homepage, and keep an eye on your inbox for your exclusive access key.</p>
    `
  },
  "high-frequency-data-react": {
    title: "High-Frequency Data in React",
    description: "How we optimized React to render live tick data for our algorithmic trading platform without dropping frames.",
    date: "February 04, 2026",
    category: "Engineering",
    content: `
      <p style="color: var(--text-muted); font-size: 18px; line-height: 1.8; margin-bottom: 24px;">Rendering high-frequency data—like live market prices updating hundreds of times per second—is notoriously difficult in React. The standard state-update cycle is simply too slow and causes massive garbage collection spikes, leading to dropped frames.</p>
      
      <h2 style="font-size: 28px; font-weight: 300; margin: 48px 0 24px; color: var(--text-primary);">Bypassing React State</h2>
      <p style="color: var(--text-muted); font-size: 18px; line-height: 1.8; margin-bottom: 24px;">To solve this in the Infirow Algo Trading platform, we completely bypass React's <code>useState</code> for real-time price ticks. Instead, we open a persistent WebSocket connection inside a custom hook, and mutate DOM nodes directly using <code>useRef</code>.</p>
      
      <div style="background: #1A1A1A; border: 1px solid var(--border-color); border-radius: 12px; padding: 24px; margin: 32px 0; overflow-x: auto;">
<pre style="color: #E2E8F0; font-family: monospace; font-size: 14px;"><code>// Simplified example
const priceRef = useRef&lt;HTMLSpanElement&gt;(null);

useEffect(() =&gt; {
  socket.on('tick', (data) =&gt; {
    if (priceRef.current) {
      priceRef.current.textContent = data.price.toFixed(2);
      // We also update CSS variables for flash colors (green/red)
    }
  });
}, []);</code></pre>
      </div>
      
      <h2 style="font-size: 28px; font-weight: 300; margin: 48px 0 24px; color: var(--text-primary);">Canvas over DOM</h2>
      <p style="color: var(--text-muted); font-size: 18px; line-height: 1.8; margin-bottom: 24px;">For our advanced charting engine, we completely abandoned the DOM. We built a custom WebGL rendering pipeline using Three.js and React Three Fiber. This allows us to push the heavy lifting to the GPU, maintaining a lockstep 60 FPS even when rendering millions of historical data points alongside live ticks.</p>

      <h2 style="font-size: 28px; font-weight: 300; margin: 48px 0 24px; color: var(--text-primary);">The Importance of Performance</h2>
      <p style="color: var(--text-muted); font-size: 18px; line-height: 1.8; margin-bottom: 24px;">In trading, lag is literally lost money. By treating React as a layout engine rather than a strict data-binding layer, we achieved institutional-grade performance directly in the browser.</p>
    `
  }
};
