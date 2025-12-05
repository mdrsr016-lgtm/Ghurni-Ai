import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TermsOfService: React.FC = () => {
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
          
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-white/60">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Agreement to Terms</h2>
            <p className="text-white/80 leading-relaxed">
              By accessing or using Ghurni AI, you agree to be bound by these Terms of Service 
              and all applicable laws and regulations. If you do not agree with any of these terms, 
              you are prohibited from using this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Use License</h2>
            <p className="text-white/80 leading-relaxed mb-3">
              Permission is granted to temporarily use Ghurni AI for personal, non-commercial use only. 
              This license shall automatically terminate if you violate any of these restrictions.
            </p>
            <p className="text-white/80 leading-relaxed mb-3">
              Under this license you may not:
            </p>
            <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
              <li>Modify or copy the materials</li>
              <li>Use the materials for commercial purposes</li>
              <li>Attempt to reverse engineer any software</li>
              <li>Remove any copyright or proprietary notations</li>
              <li>Transfer the materials to another person</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">User Accounts</h2>
            <p className="text-white/80 leading-relaxed mb-3">
              When you create an account with us, you must provide accurate and complete information. 
              You are responsible for:
            </p>
            <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
              <li>Maintaining the security of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized access</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Prohibited Activities</h2>
            <p className="text-white/80 leading-relaxed mb-3">
              You agree not to:
            </p>
            <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
              <li>Use the service for any illegal purpose</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Transmit any viruses or malicious code</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with the proper functioning of the service</li>
              <li>Scrape or collect data without permission</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Content</h2>
            <p className="text-white/80 leading-relaxed">
              Our service allows you to post, link, store, share and otherwise make available 
              certain information. You are responsible for the content you post and grant us 
              a license to use, modify, and display such content as necessary to provide the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
            <p className="text-white/80 leading-relaxed">
              The materials on Ghurni AI are provided on an 'as is' basis. We make no warranties, 
              expressed or implied, and hereby disclaim all other warranties including, without 
              limitation, implied warranties of merchantability, fitness for a particular purpose, 
              or non-infringement of intellectual property.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Limitations</h2>
            <p className="text-white/80 leading-relaxed">
              In no event shall Ghurni AI or its suppliers be liable for any damages (including, 
              without limitation, damages for loss of data or profit, or due to business interruption) 
              arising out of the use or inability to use our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Termination</h2>
            <p className="text-white/80 leading-relaxed">
              We may terminate or suspend your account and access to the service immediately, 
              without prior notice or liability, for any reason, including breach of these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
            <p className="text-white/80 leading-relaxed">
              We reserve the right to modify these terms at any time. We will notify users of 
              any changes by updating the "Last updated" date. Your continued use of the service 
              after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-white/80 leading-relaxed">
              If you have any questions about these Terms, please contact us at:{" "}
              <a href="mailto:legal@ghurniai.com" className="text-violet-400 hover:underline">
                legal@ghurniai.com
              </a>
            </p>
          </section>

          <div className="mt-12 pt-6 border-t border-white/10">
            <p className="text-white/40 text-sm">
              This is a placeholder Terms of Service. Please consult with legal counsel to create 
              comprehensive terms that comply with applicable laws and regulations.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TermsOfService;
