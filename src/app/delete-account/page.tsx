import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Delete Account | Kadai",
  description: "Request account deletion and learn about data retention policies for Kadai.",
};

export default function DeleteAccountPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-950 to-black">
      <div className="container mx-auto px-4 pt-48 pb-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Delete Your Account
            </h1>
            <p className="text-lg text-neutral-400">
              We&apos;re sorry to see you go. Here&apos;s how to request account deletion.
            </p>
          </div>

          {/* Deletion Form / Action */}
          <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-8 space-y-8">
            <div className="space-y-4 text-neutral-300">
              <p>
                For security reasons and to ensure no financial data is lost accidentally, we require a manual confirmation for account deletion.
              </p>
              
              <div className="bg-neutral-800/50 p-6 rounded-xl border border-neutral-700 my-6">
                <h3 className="text-white font-medium mb-2">Request via Email</h3>
                <p className="text-sm text-neutral-400 mb-4">
                  Click the button below to open your email client with a pre-filled deletion request.
                </p>
                
                <a
                  href="mailto:mamak@kadaipos.id?subject=Account%20Deletion%20Request&body=I%20request%20to%20delete%20my%20Kadai%20account.%0A%0AAccount%20Email%3A%20%0AStore%20Name%3A%20%0AReason%20(Optional)%3A%20"
                  className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                  Draft Deletion Email
                </a>
              </div>

              <div className="text-sm text-neutral-500">
                <p className="mb-2">Or email us manually at:</p>
                <code className="bg-neutral-950 px-3 py-1 rounded text-neutral-300">mamak@kadaipos.id</code>
              </div>
            </div>
          </div>

          {/* What Gets Deleted */}
          <section className="pt-6 border-t border-neutral-800">
            <h2 className="text-2xl font-semibold text-white mb-4">
              What Data Will Be Deleted
            </h2>
            <div className="text-neutral-300 space-y-3">
              <p>When you delete your account, we will permanently remove:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Your account information and login credentials</li>
                <li>Restaurant/store profiles and settings</li>
                <li>Menu items and pricing data</li>
                <li>Staff and employee information</li>
                <li>Customer data linked to your account</li>
                <li>Personal preferences and app settings</li>
              </ul>
            </div>
          </section>

          {/* Data Retention */}
          <section className="pt-6 border-t border-neutral-800">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Data Retention Policy
            </h2>
            <div className="text-neutral-300 space-y-3">
              <p>
                <strong className="text-white">Transaction Records:</strong>{" "}
                For legal and financial compliance purposes, we are required to
                retain transaction records, invoices, and financial reports for up
                to <strong>7 years</strong> as per Indonesian tax regulations.
              </p>
              <p>
                <strong className="text-white">Backup Data:</strong> Your data may
                remain in our backup systems for up to <strong>90 days</strong>{" "}
                after deletion, after which it will be permanently removed.
              </p>
              <p>
                <strong className="text-white">Anonymized Data:</strong> Some
                aggregated and anonymized analytics data may be retained
                indefinitely for service improvement purposes. This data cannot be
                linked back to you.
              </p>
            </div>
          </section>

          {/* Processing Time */}
          <section className="pt-6 border-t border-neutral-800">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Processing Time
            </h2>
            <div className="text-neutral-300 space-y-3">
              <p>
                Account deletion requests are typically processed within{" "}
                <strong className="text-white">30 days</strong>. You will receive
                a confirmation email once your account has been deleted.
              </p>
              <p>
                During this period, your account will be deactivated and you won&apos;t
                be able to log in. If you change your mind, you can cancel the
                deletion request by contacting us.
              </p>
            </div>
          </section>

          {/* Contact Support */}
          <section className="pt-6 border-t border-neutral-800">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Need Help?
            </h2>
            <div className="text-neutral-300 space-y-3">
              <p>
                If you have any questions about account deletion or data privacy,
                please contact our support team:
              </p>
              <div className="bg-neutral-800 rounded-lg p-4 mt-4">
                <p className="text-white font-medium">Email:</p>
                <a
                  href="mailto:mamak@kadaipos.id"
                  className="text-blue-400 hover:text-blue-300"
                >
                  mamak@kadaipos.id
                </a>
              </div>
              <p className="text-sm text-neutral-400 mt-4">
                For more information about how we handle your data, please read our{" "}
                <Link href="/privacy" className="text-blue-400 hover:text-blue-300 underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </section>

          {/* Back to Home */}
          <div className="text-center mt-8">
            <Link
              href="/"
              className="inline-flex items-center text-neutral-400 hover:text-white transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
