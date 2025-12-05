import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className="relative w-full min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-white/60">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p className="text-white/80 leading-relaxed">
              Welcome to Ghurni AI. This Privacy Policy explains how we collect, use, disclose, 
              and safeguard your information when you use our travel planning application.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
            <p className="text-white/80 leading-relaxed mb-3">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
              <li>Name and contact information (email, phone number)</li>
              <li>Account credentials (username, password)</li>
              <li>Profile information and preferences</li>
              <li>Travel history and saved destinations</li>
              <li>Communication preferences</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
            <p className="text-white/80 leading-relaxed mb-3">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Personalize your travel recommendations</li>
              <li>Send you updates and promotional materials (with your consent)</li>
              <li>Respond to your comments and questions</li>
              <li>Protect against fraudulent or illegal activity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
            <p className="text-white/80 leading-relaxed">
              We implement appropriate technical and organizational measures to protect your 
              personal information. However, no method of transmission over the Internet is 
              100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
            <p className="text-white/80 leading-relaxed">
              We may use third-party services (such as Google and Facebook for authentication) 
              that collect, monitor, and analyze data to improve our service functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
            <p className="text-white/80 leading-relaxed mb-3">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
              <li>Access and receive a copy of your personal data</li>
              <li>Correct inaccurate or incomplete data</li>
              <li>Request deletion of your data</li>
              <li>Object to or restrict processing of your data</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-white/80 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at:{" "}
              <a href="mailto:privacy@ghurniai.com" className="text-violet-400 hover:underline">
                privacy@ghurniai.com
              </a>
            </p>
          </section>

          <div className="mt-12 pt-6 border-t border-white/10">
            <p className="text-white/40 text-sm">
              This is a placeholder Privacy Policy. Please consult with legal counsel to create 
              a comprehensive policy that complies with applicable laws and regulations.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
