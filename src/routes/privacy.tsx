import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="w-screen min-h-screen flex flex-col text-gray-800">
      {/* Main content */}
      <main className="flex-grow max-w-4xl mx-auto px-4 py-8 prose prose-slate">
        <h2>Privacy Policy</h2>
        <p>
          <strong>Effective date:</strong> 24 July 2025
        </p>

        <h3>1 . Who we are</h3>
        <p>
          championmastery.lol is an independent web application that aggregates
          mastery data from the Riot Games API for League of Legends players.
          Contact:{" "}
          <a href="mailto:olivierdeschenes9@gmail.com">
            olivierdeschenes9@gmail.com
          </a>
        </p>

        <h3>2 . What we collect</h3>
        <ul>
          <li>
            <strong>Riot API responses</strong> — raw data fetched when you
            request information for specific summoners.
          </li>
          <li>No personal user data, cookies, or analytics are stored.</li>
        </ul>

        <h3>3 . How we use the data</h3>
        <ul>
          <li>
            To generate cumulative champion-mastery views for the accounts you
            supply.
          </li>
          <li>To diagnose and correct service errors.</li>
        </ul>

        <h3>4 . Public display</h3>
        <p>
          Mastery statistics are publicly visible to anyone who knows the
          relevant account identifiers. Submit only accounts you are comfortable
          sharing.
        </p>

        <h3>5 . Data retention</h3>
        <p>
          Stored Riot API responses are kept until newer data replaces them or
          we remove them during routine maintenance.
        </p>

        <h3>6 . Security</h3>
        <p>
          We use industry-standard measures to protect stored data, but no
          online service can guarantee absolute security.
        </p>

        <h3>7 . Your rights</h3>
        <p>
          Because we do not hold personal data about you, typical
          access-or-deletion requests do not apply. For concerns, email us at
          the address above.
        </p>

        <h3>8 . Changes to this policy</h3>
        <p>
          We may update this Privacy Policy. Continued use of the site after an
          update signifies acceptance of the new policy.
        </p>

        <h3>9 . Governing law</h3>
        <p>This policy is governed by the laws of Quebec, Canada.</p>
      </main>
    </div>
  );
}
