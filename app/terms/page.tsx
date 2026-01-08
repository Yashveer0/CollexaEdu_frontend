"use client";

import {
  FiCheckCircle,
  FiUser,
  FiLock,
  FiShield,
  FiCreditCard,
  FiBriefcase,
  FiBook,
  FiLink,
  FiSlash,
  FiAlertTriangle,
  FiGlobe,
  FiRefreshCcw,
  FiMail,
  FiUsers,
  FiHeadphones,
} from "react-icons/fi";

export default function TermsPage() {
  return (
    <div className="w-full bg-[#F7F9FC]">

      {/* HERO */}
      <section className="w-full py-20 px-4 bg-gradient-to-b from-white to-[#F7F9FC] text-center">
        <p className="text-xs mt-20 text-gray-500 uppercase tracking-wide mb-2">
          Last updated: 26 November 2025
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0B2B6B]">
          Terms of Service
        </h1>
        <p className="text-gray-600 text-sm sm:text-base mt-4 max-w-2xl mx-auto">
          These Terms govern access to Collexa’s learning, placement, and employer
          solutions. Please read them carefully before using our Services.
        </p>
      </section>

      {/* TERMS LIST */}
      <section className="w-full px-4 pb-20">
        <div className="max-w-4xl mx-auto space-y-4">

          {[
            {
              title: "Acceptance of terms",
              icon: <FiCheckCircle />,
              text:
                "By accessing or using Collexa’s website, dashboard, mobile app, or services, you agree to be bound by these Terms of Service and our Privacy Policy.",
            },
            {
              title: "Eligibility",
              icon: <FiUser />,
              text:
                "You must be at least 16 years old and legally capable of entering into a contract. Educational institutions and employers confirm authority to bind their organizations.",
            },
            {
              title: "Accounts & security",
              icon: <FiLock />,
              text:
                "You are responsible for maintaining confidentiality of login credentials and for all activity under your account. Notify Collexa immediately of unauthorized access.",
            },
            {
              title: "Permitted use",
              icon: <FiShield />,
              text:
                "Services must be used lawfully. Content scraping, reverse engineering, spamming, or interfering with platform stability is prohibited.",
            },
            {
              title: "Programs, payments & refunds",
              icon: <FiCreditCard />,
              text:
                "Program fees are disclosed at checkout. Refunds follow the communicated policy for each program. Some fees may be non-refundable after cohort start.",
            },
            {
              title: "Jobs & internships",
              icon: <FiBriefcase />,
              text:
                "Collexa does not guarantee employment. Offers, compensation, and contracts are strictly between learners and employers.",
            },
            {
              title: "Intellectual property",
              icon: <FiBook />,
              text:
                "All content, trademarks, code, and designs are owned by Collexa or its licensors. Unauthorized reproduction or distribution is prohibited.",
            },
            {
              title: "Third-party services",
              icon: <FiLink />,
              text:
                "Services may integrate third-party tools such as payment gateways or analytics. Collexa is not responsible for disruptions caused by them.",
            },
            {
              title: "Suspension or termination",
              icon: <FiSlash />,
              text:
                "Accounts violating policies or creating risk may be suspended or terminated. Data may be retained as required by law.",
            },
            {
              title: "Disclaimers & liability",
              icon: <FiAlertTriangle />,
              text:
                "Services are provided “as is”. Collexa is not liable for indirect or consequential damages. Liability is limited to fees paid in the preceding six months.",
            },
            {
              title: "Governing law",
              icon: <FiGlobe />,
              text:
                "These Terms are governed by the laws of India. Disputes are subject to the exclusive jurisdiction of courts in Bengaluru, Karnataka.",
            },
            {
              title: "Changes to terms",
              icon: <FiRefreshCcw />,
              text:
                "We may revise these Terms from time to time. Continued use after changes constitutes acceptance.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white border rounded-xl p-6 flex gap-4 transition hover:shadow-md hover:scale-[1.02]"
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div>
                <h3 className="font-semibold text-[#0B2B6B]">
                  {index + 1}. {item.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                  {item.text}
                </p>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* NEED HELP */}
      <section className="w-full bg-[#D1D3D6] py-14 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-lg font-semibold text-[#0B2B6B] mb-2">
            Need help?
          </h3>
          <p className="text-sm text-gray-700 mb-8">
            Reach out to the right team or raise a ticket through your dashboard.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            <HelpCard
              icon={<FiMail />}
              title="Legal & compliance"
              line1="info@collexaedu.com"
              line2="+91 9217070575"
            />

            <HelpCard
              icon={<FiUsers />}
              title="Campus partnerships"
              line1="info@collexaedu.com"
              line2="Mon–Fri, 10 AM – 6 PM IST"
            />

            <HelpCard
              icon={<FiHeadphones />}
              title="Recruiter support"
              line1="info@collexaedu.com"
              line2="Response within 24 business hours"
            />

          </div>
        </div>
      </section>

    </div>
  );
}

/* Small helper component */
function HelpCard({
  icon,
  title,
  line1,
  line2,
}: {
  icon: React.ReactNode;
  title: string;
  line1: string;
  line2: string;
}) {
  return (
    <div className="bg-white border rounded-xl p-6 text-center transition hover:shadow-md hover:scale-[1.03]">
      <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
        {icon}
      </div>
      <h4 className="font-semibold text-[#0B2B6B]">{title}</h4>
      <p className="text-sm text-gray-600 mt-2">{line1}</p>
      <p className="text-xs text-gray-500 mt-1">{line2}</p>
    </div>
  );
}
