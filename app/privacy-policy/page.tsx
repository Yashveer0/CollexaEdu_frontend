"use client";

import {
  FiInfo,
  FiDatabase,
  FiSettings,
  FiShare2,
  FiLock,
  FiUserCheck,
  FiShield,
  FiGlobe,
  FiRefreshCcw,
} from "react-icons/fi";

export default function PrivacyPage() {
  return (
    <div className="w-full bg-[#F7F9FC]">

      {/* HERO */}
      <section className="w-full py-20 px-4 bg-gradient-to-b from-white to-[#F7F9FC] text-center">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
          Last updated: 24 November 2025
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0B2B6B]">
          Privacy Policy
        </h1>
        <p className="text-gray-600 text-sm sm:text-base mt-4 max-w-3xl mx-auto">
          This Privacy Policy explains how Collexa (“we”, “us”, or “our”) collects,
          uses, shares, and protects information when you use our websites, mobile
          applications, or other services (collectively, the “Services”). By
          accessing the Services you consent to the practices described here.
        </p>
      </section>

      {/* CONTENT */}
      <section className="w-full px-4 pb-20">
        <div className="max-w-4xl mx-auto space-y-4">

          {/* 1 */}
          <PolicyCard
            index={1}
            icon={<FiDatabase />}
            title="Information we collect"
            points={[
              "Profile data such as name, email, phone number, education details, resume links, and preferences when you sign up or submit forms.",
              "Usage data including pages viewed, actions taken inside dashboards, device/browser metadata, referral URLs, and cookies for session management.",
              "Transaction data whenever you purchase programs or pay application fees (processed securely by our payment partners).",
              "Communications such as emails, chat transcripts, and survey feedback that help us support learners and recruiters.",
            ]}
          />

          {/* 2 */}
          <PolicyCard
            index={2}
            icon={<FiSettings />}
            title="How we use your information"
            points={[
              "Operate and improve Collexa products, personalized recommendations, and dashboards.",
              "Match you with relevant courses, internships, and jobs based on the inputs you share.",
              "Send notices about applications, program updates, policy changes, and promotional content (you can opt out anytime).",
              "Protect our community by monitoring fraud, abuse, and security threats.",
            ]}
          />

          {/* 3 */}
          <PolicyCard
            index={3}
            icon={<FiShare2 />}
            title="Sharing & disclosure"
            points={[
              "University partners and employers receive only the data required to evaluate your candidature.",
              "Service vendors such as cloud hosting, analytics, and communication platforms operate under confidentiality agreements.",
              "We may disclose information if required by law or to protect Collexa’s rights and user safety.",
              "In the event of a merger or acquisition, users will be notified before transferring personal data.",
            ]}
          />

          {/* 4 */}
          <PolicyCard
            index={4}
            icon={<FiLock />}
            title="Data retention & security"
            points={[
              "Accounts remain active until deletion is requested or program association ends; some data may be retained for legal compliance.",
              "Sensitive data is encrypted, access is role-based, and systems are audited regularly.",
              "No method is 100% secure; users should use strong passwords.",
              "In case of a breach, affected users and regulators will be notified as required.",
            ]}
          />

          {/* 5 */}
          <PolicyCard
            index={5}
            icon={<FiUserCheck />}
            title="Your choices & rights"
            points={[
              "Access, correct, or delete profile data via dashboard or by emailing info@collexaedu.com.",
              "Opt out of marketing emails using the unsubscribe link (transactional emails still apply).",
              "Disable cookies via browser settings (some features may stop working).",
              "Users in regulated regions (e.g., GDPR) can exercise statutory rights by contacting us.",
            ]}
          />

          {/* 6 */}
          <PolicyCard
            index={6}
            icon={<FiShield />}
            title="Children’s privacy"
            points={[
              "Collexa is intended for learners aged 16 and above.",
              "Users under 16 should access Services under parental supervision.",
              "We do not knowingly collect data from children.",
              "Parents may contact us to request deletion of a child’s data.",
            ]}
          />

          {/* 7 */}
          <PolicyCard
            index={7}
            icon={<FiGlobe />}
            title="International transfers"
            points={[
              "We operate globally with infrastructure in India and other jurisdictions.",
              "When data is transferred internationally, appropriate safeguards are applied as required by law.",
            ]}
          />

          {/* 8 */}
          <PolicyCard
            index={8}
            icon={<FiRefreshCcw />}
            title="Updates to this policy"
            points={[
              "This Privacy Policy may be updated to reflect new features or legal requirements.",
              "Updates will be posted on this page with a revised date.",
              "Significant changes will be communicated via email or in-app alerts.",
            ]}
          />

        </div>
      </section>

    </div>
  );
}

/* Reusable card */
function PolicyCard({
  index,
  icon,
  title,
  points,
}: {
  index: number;
  icon: React.ReactNode;
  title: string;
  points: string[];
}) {
  return (
    <div className="bg-white border rounded-xl p-6 flex gap-4 transition hover:shadow-md hover:scale-[1.02]">
      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-[#0B2B6B]">
          {index}. {title}
        </h3>
        <ul className="mt-2 space-y-1 text-sm text-gray-600 list-disc list-inside">
          {points.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
