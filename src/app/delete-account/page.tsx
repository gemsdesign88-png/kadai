import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Delete Account | KadaiPOS",
  description: "Request account deletion and learn about data retention policies for KadaiPOS.",
}

export default function DeleteAccountPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-950 to-black">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Delete Your Account
            </h1>
            <p className="text-lg text-neutral-400">
              We're sorry to see you go. Here's how to request account deletion.
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-8 space-y-8">
            {/* Deletion Process */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">
                How to Delete Your Account
              </h2>
              <div className="space-y-4 text-neutral-300">
                <p>
                  To request account deletion, please follow these steps:
                </p>
                <ol className="list-decimal list-inside space-y-3 ml-4">
                  <li>
                    Open the KadaiPOS mobile app and go to your Profile page
                  </li>
                  <li>
                    Scroll down and tap on "Delete Account" button
                  </li>
                  <li>
                    Confirm your deletion request
                  </li>
                </ol>
                <p className="mt-6">
                  Alternatively, you can email us at{" "}
                  <a
                    href="mailto:mamak@kadaipos.id"
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    mamak@kadaipos.id
                  </a>{" "}
                  with the subject line "Account Deletion Request" and include:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Your registered email address</li>
                  <li>Your restaurant/store name</li>
                  <li>Reason for deletion (optional)</li>
                </ul>
              </div>
            </section>

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
                  During this period, your account will be deactivated and you won't
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
          </div>

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
  )
}
