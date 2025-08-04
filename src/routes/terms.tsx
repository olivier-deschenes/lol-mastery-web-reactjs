import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="w-screen min-h-screen flex flex-col text-gray-800">
      {/* Main content */}
      <main className="flex-grow max-w-4xl mx-auto px-4 py-8 prose prose-slate">
        <h2>Terms of Service</h2>
        <p>
          <strong>Effective date:</strong>24July2025
        </p>

        <h3>1. Acceptance of terms</h3>
        <p>
          By accessing or using championmastery.lol, you agree to these Terms of
          Service.
        </p>

        <h3>2. Service description</h3>
        <p>
          The site retrieves champion mastery statistics from the RiotGamesAPI
          and shows a combined overview for the LeagueofLegends accounts you
          provide.
        </p>

        <h3>3. User responsibilities</h3>
        <ul>
          <li>
            Provide only summoner names or PUUIDs you are authorized to view.
          </li>
          <li>
            Do not use the site for unlawful, abusive, or disruptive purposes.
          </li>
        </ul>

        <h3>4. Data accuracy</h3>
        <p>
          Data comes directly from RiotGames. We strive for accuracy but do not
          guarantee completeness, currency, or error-free operation.
        </p>

        <h3>5. Intellectual property</h3>
        <p>
          Site code, design, and original content belong to championmastery.lol.
          LeagueofLegends and RiotGames trademarks remain the property of
          RiotGames,Inc.
        </p>

        <h3>6. RiotGames disclaimer</h3>
        <p>
          championmastery.lol is{" "}
          <strong>not endorsed by or affiliated with RiotGames</strong>.
          LeagueofLegends and all associated properties are trademarks or
          registered trademarks of RiotGames,Inc.
        </p>

        <h3>7. Availability</h3>
        <p>
          The service is provided “asis” and “asavailable”. We may modify,
          suspend, or discontinue the site at any time without notice.
        </p>

        <h3>8. Limitation of liability</h3>
        <p>
          To the fullest extent permitted by law, championmastery.lol shall not
          be liable for indirect, incidental, or consequential damages arising
          from your use of the site.
        </p>

        <h3>9. Termination</h3>
        <p>
          We may terminate or suspend your access at our discretion if you
          violate these Terms.
        </p>

        <h3>10. Governing law</h3>
        <p>These Terms are governed by the laws of Quebec,Canada.</p>

        <h3>11. Changes to the Terms</h3>
        <p>
          We may update these Terms. Continued use after changes become
          effective constitutes acceptance of the revised Terms.
        </p>

        <h3>12. Contact</h3>
        <p>
          Questions? Email{" "}
          <a href="mailto:olivierdeschenes9@gmail.com">
            olivierdeschenes9@gmail.com
          </a>
        </p>
      </main>
    </div>
  );
}
