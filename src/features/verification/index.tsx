"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Calendar,
  FileText,
  Clock,
  ClipboardList,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  ChevronRight,
  X,
} from "lucide-react";
import { api } from "@/services/api";
import { updateVerification } from "./services";

// Mock database of applications to support different IDs
const MOCK_INVESTORS: Record<string, {
  name: string;
  email: string;
  phone: string;
  pan: string;
  submittedAt: string;
}> = {
  "APP-2026-001": {
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    phone: "+91 98765 43210",
    pan: "ABCDE1234F",
    submittedAt: "2026-06-28",
  },
  "APP-2026-002": {
    name: "Priya Singh",
    email: "priya.singh@example.com",
    phone: "+91 98765 12345",
    pan: "FGHIJ5678K",
    submittedAt: "2026-06-27",
  },
  "APP-2026-003": {
    name: "Amit Kumar",
    email: "amit.kumar@example.com",
    phone: "+91 98765 67890",
    pan: "LMNOB4321P",
    submittedAt: "2026-06-27",
  },
  "APP-2026-004": {
    name: "Sneha Patel",
    email: "sneha.patel@example.com",
    phone: "+91 98765 89012",
    pan: "QRSTU9876V",
    submittedAt: "2026-06-25",
  },
  "APP-2026-005": {
    name: "Vikram Malhotra",
    email: "vikram.m@example.com",
    phone: "+91 98765 90123",
    pan: "WXYZA2468B",
    submittedAt: "2026-06-24",
  },
  "APP-2026-006": {
    name: "Ananya Iyer",
    email: "ananya.i@example.com",
    phone: "+91 98765 34567",
    pan: "BCDEF1357G",
    submittedAt: "2026-06-23",
  },
  "APP-2026-007": {
    name: "Rajesh Gupta",
    email: "rajesh.g@example.com",
    phone: "+91 98765 45678",
    pan: "HIJKL9753M",
    submittedAt: "2026-06-22",
  },
};

export default function VerificationFeature({ id }: { id: string }) {
  const router = useRouter();
  const investorId = id || "APP-2026-001";

  const [investor, setInvestor] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Component States
  const [checklist, setChecklist] = useState({
    panVerified: false,
    aadhaarVerified: false,
    identityMatches: false,
    docsReadable: false,
    infoComplete: false,
  });
  const [decision, setDecision] = useState<"APPROVE" | "REJECT" | "RESUBMIT" | null>(null);
  const [remarks, setRemarks] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Load investor details from the backend
  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      try {
        const res = await api.get(`/applications/${investorId}`);
        setInvestor(res.data);
      } catch (err) {
        console.error("Failed to fetch application details", err);
        // Fallback to mock data for display if the ID is one of the mocks
        const mock = MOCK_INVESTORS[investorId] || MOCK_INVESTORS["APP-2026-001"];
        setInvestor({
          id: investorId,
          name: mock.name,
          email: mock.email,
          phone: mock.phone,
          pan: mock.pan,
          submittedAt: mock.submittedAt,
          status: "PENDING_VERIFICATION",
          documents: []
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [investorId]);

  // Toggle Checklist Items
  const handleCheckboxChange = (key: keyof typeof checklist) => {
    setChecklist((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Submit Handler
  const handleUpdateStatus = async () => {
    if (!decision) {
      alert("Please select a verification decision before updating.");
      return;
    }
    
    try {
      await api.post(`/verify/${investorId}`, { status: decision, remarks });
      setIsSuccessModalOpen(true);
    } catch (err) {
      console.error("Failed to update status", err);
      alert("Failed to update verification status.");
    }
  };

  // Close Success Modal and Redirect
  const handleCloseModal = () => {
    setIsSuccessModalOpen(false);
    router.push("/dashboard");
  };

  if (isLoading || !investor) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-semibold text-slate-500">Loading Application Details...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] text-slate-800 font-sans">
      {/* Navigation Top Bar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Back Arrow and App Title */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push("/dashboard")}
                className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition"
              >
                <ArrowLeft size={18} />
              </button>
              <div className="h-6 w-px bg-slate-200 hidden sm:block" />
              <span className="font-semibold text-lg text-slate-900 tracking-tight">
                Mutual Fund Investor Onboarding
              </span>
            </div>

            {/* Right: Officer Profile */}
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded-2xl">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                V
              </div>
              <span className="text-sm font-semibold text-slate-700">
                Verification Officer
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header */}
        <div className="pb-4 border-b border-slate-200/60">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Verification Workflow
          </h1>
          <p className="text-slate-500 mt-1.5">
            Review submitted investor information and update the verification outcome.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Columns (Investor Summary, Verification Decision, Remarks) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Investor Summary Card */}
            <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
                  <User size={18} className="text-blue-600" />
                  Investor Summary
                </h2>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-600 border border-amber-200">
                  <Clock size={12} />
                  Pending Verification
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-6">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    Application ID
                  </span>
                  <span className="text-sm font-bold text-slate-900 mt-1 block">
                    {investorId}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    Investor Name
                  </span>
                  <span className="text-sm font-semibold text-slate-800 mt-1 block">
                    {investor.name}
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-slate-55 text-slate-400 rounded-lg">
                    <Mail size={16} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-400 block">Email</span>
                    <span className="text-sm font-medium text-slate-800">{investor.email}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-slate-55 text-slate-400 rounded-lg">
                    <Phone size={16} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-400 block">Mobile Number</span>
                    <span className="text-sm font-medium text-slate-800">{investor.phone}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-slate-55 text-slate-400 rounded-lg">
                    <FileText size={16} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-400 block">PAN Number</span>
                    <span className="text-sm font-mono font-semibold text-slate-800 tracking-wide">{investor.pan}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-slate-55 text-slate-400 rounded-lg">
                    <Calendar size={16} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-400 block">Submission Date</span>
                    <span className="text-sm font-medium text-slate-800">{investor.submittedAt}</span>
                  </div>
                </div>
              </div>

              {/* Documents List */}
              <div className="pt-6 border-t border-slate-100 space-y-4">
                <h3 className="text-sm font-bold text-slate-900">Uploaded Documents</h3>
                {investor.documents && investor.documents.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {investor.documents.map((doc: any) => (
                      <div key={doc.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">📄</span>
                          <div>
                            <span className="text-xs font-bold text-slate-500 block uppercase tracking-wider">{doc.type.replace('_', ' ')}</span>
                            <span className="text-sm font-semibold text-slate-800 truncate max-w-[200px] block">{doc.fileName}</span>
                          </div>
                        </div>
                        <a
                          href={doc.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg border border-blue-100 transition"
                        >
                          View Document
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 bg-slate-50 border border-slate-200 border-dashed rounded-xl text-center">
                    <p className="text-sm font-medium text-slate-500">No documents submitted yet.</p>
                    <p className="text-xs text-slate-400 mt-1">The investor has not uploaded Aadhaar or PAN files from the mobile app.</p>
                  </div>
                )}
              </div>
            </section>

            {/* Verification Decision Card */}
            <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
              <div>
                <h3 className="text-md font-bold text-slate-950 flex items-center gap-2">
                  <Info size={16} className="text-blue-600" />
                  Verification Decision
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Choose the compliance outcome for this onboarding request.
                </p>
              </div>

              {/* Radio Group */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Approve Option */}
                <label
                  className={`flex flex-col p-4 rounded-xl border-2 cursor-pointer transition select-none ${
                    decision === "APPROVE"
                      ? "border-emerald-500 bg-emerald-50/20"
                      : "border-slate-200 hover:border-slate-300 bg-slate-50/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <CheckCircle size={16} className="text-emerald-600" />
                      Approve
                    </span>
                    <input
                      type="radio"
                      name="decision"
                      value="APPROVE"
                      checked={decision === "APPROVE"}
                      onChange={() => setDecision("APPROVE")}
                      className="h-4.5 w-4.5 text-blue-600 border-slate-300 focus:ring-blue-500/25 cursor-pointer"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    Investor KYC meets all regulatory and risk guidelines.
                  </p>
                </label>

                {/* Reject Option */}
                <label
                  className={`flex flex-col p-4 rounded-xl border-2 cursor-pointer transition select-none ${
                    decision === "REJECT"
                      ? "border-rose-500 bg-rose-50/20"
                      : "border-slate-200 hover:border-slate-300 bg-slate-50/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <XCircle size={16} className="text-rose-600" />
                      Reject
                    </span>
                    <input
                      type="radio"
                      name="decision"
                      value="REJECT"
                      checked={decision === "REJECT"}
                      onChange={() => setDecision("REJECT")}
                      className="h-4.5 w-4.5 text-blue-600 border-slate-300 focus:ring-blue-500/25 cursor-pointer"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    Ineligible documents or compliance policy mismatch.
                  </p>
                </label>

                {/* Request Resubmission Option */}
                <label
                  className={`flex flex-col p-4 rounded-xl border-2 cursor-pointer transition select-none ${
                    decision === "RESUBMIT"
                      ? "border-amber-500 bg-amber-50/20"
                      : "border-slate-200 hover:border-slate-300 bg-slate-50/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <AlertTriangle size={16} className="text-amber-600" />
                      Resubmit
                    </span>
                    <input
                      type="radio"
                      name="decision"
                      value="RESUBMIT"
                      checked={decision === "RESUBMIT"}
                      onChange={() => setDecision("RESUBMIT")}
                      className="h-4.5 w-4.5 text-blue-600 border-slate-300 focus:ring-blue-500/25 cursor-pointer"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    Request user to re-upload blurred or incomplete details.
                  </p>
                </label>
              </div>
            </section>

            {/* Remarks Card */}
            <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
              <div>
                <h3 className="text-md font-bold text-slate-950">Remarks Section</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Provide detailed feedback regarding this decision.
                </p>
              </div>

              <div>
                <textarea
                  rows={4}
                  placeholder={`Enter verification remarks...\n\nExamples:\n- Documents are clear and verified.\n- Please upload a clearer Aadhaar image.`}
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  className="w-full p-3.5 border border-slate-200 rounded-xl text-sm placeholder-slate-450 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition resize-none"
                />
              </div>
            </section>

          </div>

          {/* Right Column (Checklist, Confirmation, Actions) */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Checklist */}
            <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
              <div>
                <h3 className="text-md font-bold text-slate-950 flex items-center gap-2">
                  <ClipboardList size={18} className="text-blue-600" />
                  Verification Checklist
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Confirm all operational review checklists.
                </p>
              </div>

              {/* Checkbox Inputs */}
              <div className="space-y-3.5 pt-2">
                {[
                  { key: "panVerified", label: "PAN information verified" },
                  { key: "aadhaarVerified", label: "Aadhaar document verified" },
                  { key: "identityMatches", label: "Identity matches submitted details" },
                  { key: "docsReadable", label: "Documents are readable" },
                  { key: "infoComplete", label: "Information is complete" },
                ].map((item) => (
                  <label
                    key={item.key}
                    className="flex items-start gap-3 cursor-pointer select-none text-sm font-medium text-slate-700 hover:text-slate-900 group"
                  >
                    <div className="relative flex items-center mt-0.5">
                      <input
                        type="checkbox"
                        checked={checklist[item.key as keyof typeof checklist]}
                        onChange={() => handleCheckboxChange(item.key as keyof typeof checklist)}
                        className="peer h-5 w-5 rounded-lg border border-slate-350 focus:ring-2 focus:ring-blue-500/20 text-blue-600 transition cursor-pointer appearance-none checked:bg-blue-600 checked:border-blue-600"
                      />
                      <svg
                        className="absolute w-3.5 h-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 left-0.5 top-0.5 stroke-[3] transition duration-200"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </section>

            {/* Confirmation Section */}
            <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
              <div>
                <h3 className="text-md font-bold text-slate-950 flex items-center gap-2">
                  <CheckCircle size={16} className="text-blue-600" />
                  Confirmation Summary
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Verify status update parameters before saving.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-3.5 text-sm">
                <div>
                  <span className="text-xs font-semibold text-slate-450 block">Application ID</span>
                  <span className="text-sm font-bold text-slate-900 mt-0.5 block">{investorId}</span>
                </div>

                <div>
                  <span className="text-xs font-semibold text-slate-450 block">Verification Decision</span>
                  <span className="mt-1 block">
                    {decision === "APPROVE" ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                        <CheckCircle size={12} /> Approved
                      </span>
                    ) : decision === "REJECT" ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-100">
                        <XCircle size={12} /> Rejected
                      </span>
                    ) : decision === "RESUBMIT" ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-100">
                        <AlertTriangle size={12} /> Resubmission Requested
                      </span>
                    ) : (
                      <span className="text-xs font-semibold italic text-slate-400 block mt-0.5">
                        No decision selected
                      </span>
                    )}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-semibold text-slate-455 block">Remarks</span>
                  {remarks.trim() ? (
                    <p className="text-xs font-medium text-slate-700 mt-1.5 bg-white border border-slate-200/50 p-2.5 rounded-lg leading-relaxed max-h-24 overflow-y-auto break-words">
                      {remarks}
                    </p>
                  ) : (
                    <span className="text-xs font-semibold italic text-slate-400 block mt-0.5">
                      No remarks added
                    </span>
                  )}
                </div>
              </div>
            </section>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleUpdateStatus}
                disabled={!decision}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md cursor-pointer hover:shadow-lg disabled:hover:shadow-md"
              >
                Update Verification Status
              </button>
              <button
                onClick={() => router.push("/dashboard")}
                className="w-full py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 hover:border-slate-300 transition shadow-sm cursor-pointer"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 Mutual Fund Investor Onboarding. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-600 transition">Security Protocol</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-600 transition">Operational Guidelines</a>
          </div>
        </div>
      </footer>

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition duration-300">
          {/* Modal Box */}
          <div className="relative w-full max-w-md bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden p-6 text-center animate-in fade-in zoom-in duration-200">
            {/* Close Cross */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition"
            >
              <X size={18} />
            </button>

            {/* Check Circle Animation container */}
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 mb-4">
              <CheckCircle size={28} className="stroke-[2.5]" />
            </div>

            <h3 className="text-lg font-extrabold text-slate-900">
              Verification Updated
            </h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              The investor verification status has been updated successfully.
            </p>

            <button
              onClick={handleCloseModal}
              className="w-full mt-6 py-3 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition shadow-md cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}