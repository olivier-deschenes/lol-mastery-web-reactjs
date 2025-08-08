import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
});

function TermsPage() {
  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-6 md:py-10">
      <Card className="border-neutral-700 bg-neutral-900 text-neutral-100 shadow-lg">
        <CardHeader className="space-y-2">
          <div className="flex items-center gap-2">
            <CardTitle className="text-2xl font-semibold text-white">
              Terms of Service
            </CardTitle>
            <Badge className="bg-emerald-600/20 text-emerald-300 border-emerald-600/40">
              Updated
            </Badge>
          </div>
          <CardDescription className="text-neutral-300">
            Effective date: 24 July 2025
          </CardDescription>
        </CardHeader>

        <Separator className="bg-neutral-800" />

        <CardContent className="text-[16px] leading-7 space-y-6 text-neutral-200">
          <ol className="list-decimal pl-6 space-y-4">
            <li>
              <h3 className="font-semibold text-white">Acceptance of terms</h3>
              <p>
                By accessing or using championmastery.lol, you agree to these
                Terms of Service.
              </p>
            </li>
            <li>
              <h3 className="font-semibold text-white">Service description</h3>
              <p>
                The site retrieves champion mastery statistics from the Riot
                Games API and shows a combined overview for the League of
                Legends accounts you provide.
              </p>
            </li>
            <li>
              <h3 className="font-semibold text-white">
                User responsibilities
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Provide only summoner names or PUUIDs you are authorized to
                  view.
                </li>
                <li>
                  Do not use the site for unlawful, abusive, or disruptive
                  purposes.
                </li>
              </ul>
            </li>
            <li>
              <h3 className="font-semibold text-white">Data accuracy</h3>
              <p>
                Data comes directly from Riot Games. We strive for accuracy but
                do not guarantee completeness, currency, or error-free
                operation.
              </p>
            </li>
            <li>
              <h3 className="font-semibold text-white">
                Intellectual property
              </h3>
              <p>
                Site code, design, and original content belong to
                championmastery.lol. League of Legends and Riot Games trademarks
                remain the property of Riot Games, Inc.
              </p>
            </li>
            <li>
              <h3 className="font-semibold text-white">
                Riot Games disclaimer
              </h3>
              <p>
                championmastery.lol is{" "}
                <strong>not endorsed by or affiliated with Riot Games</strong>.
                League of Legends and all associated properties are trademarks
                or registered trademarks of Riot Games, Inc.
              </p>
            </li>
            <li>
              <h3 className="font-semibold text-white">Availability</h3>
              <p>
                The service is provided “as is” and “as available”. We may
                modify, suspend, or discontinue the site at any time without
                notice.
              </p>
            </li>
            <li>
              <h3 className="font-semibold text-white">
                Limitation of liability
              </h3>
              <p>
                To the fullest extent permitted by law, championmastery.lol
                shall not be liable for indirect, incidental, or consequential
                damages arising from your use of the site.
              </p>
            </li>
            <li>
              <h3 className="font-semibold text-white">Termination</h3>
              <p>
                We may terminate or suspend your access at our discretion if you
                violate these Terms.
              </p>
            </li>
            <li>
              <h3 className="font-semibold text-white">Governing law</h3>
              <p>These Terms are governed by the laws of Quebec, Canada.</p>
            </li>
            <li>
              <h3 className="font-semibold text-white">Changes to the Terms</h3>
              <p>
                We may update these Terms. Continued use after changes become
                effective constitutes acceptance of the revised Terms.
              </p>
            </li>
            <li>
              <h3 className="font-semibold text-white">Contact</h3>
              <p>
                Questions? Email{" "}
                <a
                  href="mailto:olivierdeschenes9@gmail.com"
                  className="text-neutral-100 underline"
                >
                  olivierdeschenes9@gmail.com
                </a>
              </p>
            </li>
          </ol>
        </CardContent>
      </Card>
    </section>
  );
}
