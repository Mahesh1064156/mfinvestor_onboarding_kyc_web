"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  FileText,
  User,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  FileCheck,
  ClipboardList,
  Eye,
  Info,
  Clock,
  ShieldCheck,
  AlertCircle,
  X,
} from "lucide-react";

// Types
interface MockApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  pan: string;
  panStatus: "VERIFIED" | "PENDING" | "REJECTED";
  submittedAt: string;
  lastUpdatedAt: string;
  assignedOfficer: string;
  status: "PENDING_VERIFICATION" | "APPROVED" | "REJECTED";
}

// Primary Mock Application
const MOCK_APPLICATION: MockApplication = {
  id: "APP-2026-001",
  name: "Rahul Sharma",
  email: "rahul.sharma@example.com",
  phone: "+91 98765 43210",
  pan: "ABCDE1234F",
  panStatus: "VERIFIED",
  submittedAt: "2026-06-28",
  lastUpdatedAt: "2026-06-28 10:45 AM",
  assignedOfficer: "Amit Verma",
  status: "PENDING_VERIFICATION",
};

export default function ApplicationsFeature() {
  const router = useRouter();

  // Component States
  const [checklist, setChecklist] = useState({
    identityMatches: false,
    aadhaarUploaded: false,
    panUploaded: false,
    docsReadable: false,
    infoComplete: false,
  });
  const [notes, setNotes] = useState("");
  
  // Modal Preview States
  const [previewDoc, setPreviewDoc] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    type: "aadhaar_front" | "aadhaar_back" | "pan_card";
  }>({
    isOpen: false,
    title: "",
    description: "",
    type: "aadhaar_front",
  });

  // TODO: Integrate API to fetch application details by dynamic ID in future
  // useEffect(() => {
  //   const fetchApplicationDetails = async (id: string) => {
  //     const data = await api.get(`/applications/${id}`);
  //     setApplication(data);
  //   };
  //   fetchApplicationDetails(applicationId);
  // }, [applicationId]);

  // TODO: Integrate API to save verification review checklist and notes
  // const handleSaveReview = async () => {
  //   await api.post(`/applications/${applicationId}/review`, { checklist, notes });
  // };

  // Checklist handler
  const handleCheckboxChange = (key: keyof typeof checklist) => {
    setChecklist((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Open Preview Modal
  const openPreview = (title: string, description: string, type: "aadhaar_front" | "aadhaar_back" | "pan_card") => {
    setPreviewDoc({
      isOpen: true,
      title,
      description,
      type,
    });
  };

  // Close Preview Modal
  const closePreview = () => {
    setPreviewDoc((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] text-slate-800 font-sans">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Back Navigation and Brand */}
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

            {/* Right: User Role */}
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

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header */}
        <div className="pb-4 border-b border-slate-200/60">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Application Review
          </h1>
          <p className="text-slate-500 mt-1.5">
            Review investor information and uploaded KYC documents.
          </p>
        </div>

        {/* Dynamic 3-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left/Middle Column (Application summary, PAN card, documents) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Application Summary Card */}
            <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
                  <User size={18} className="text-blue-600" />
                  Application Summary
                </h2>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-100 animate-pulse">
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
                    {MOCK_APPLICATION.id}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    Investor Name
                  </span>
                  <span className="text-sm font-semibold text-slate-800 mt-1 block">
                    {MOCK_APPLICATION.name}
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-slate-50 text-slate-400 rounded-lg">
                    <Mail size={16} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-400 block">Email</span>
                    <span className="text-sm font-medium text-slate-800">{MOCK_APPLICATION.email}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-slate-50 text-slate-400 rounded-lg">
                    <Phone size={16} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-400 block">Mobile Number</span>
                    <span className="text-sm font-medium text-slate-800">{MOCK_APPLICATION.phone}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-slate-50 text-slate-400 rounded-lg">
                    <FileText size={16} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-400 block">PAN Number</span>
                    <span className="text-sm font-mono font-semibold text-slate-800 tracking-wide">{MOCK_APPLICATION.pan}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-slate-50 text-slate-400 rounded-lg">
                    <Calendar size={16} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-400 block">Submission Date</span>
                    <span className="text-sm font-medium text-slate-800">{MOCK_APPLICATION.submittedAt}</span>
                  </div>
                </div>
              </div>
            </section>

            {/* PAN Details Card */}
            <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-md font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck size={18} className="text-blue-600" />
                  PAN Verification Details
                </h3>
              </div>

              <div className="flex items-center justify-between p-4 bg-emerald-50/45 border border-emerald-100 rounded-xl">
                <div>
                  <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">PAN Number</span>
                  <p className="text-md font-mono font-bold text-emerald-900 tracking-wider mt-0.5">
                    {MOCK_APPLICATION.pan}
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-emerald-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm">
                  <CheckCircle size={14} />
                  PAN Status: Verified
                </div>
              </div>
            </section>

            {/* Uploaded Documents Section */}
            <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
              <div>
                <h3 className="text-md font-bold text-slate-950">Uploaded Documents</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Click 'View Document' to inspect high-resolution uploads.
                </p>
              </div>

              {/* Document Cards List */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                
                {/* Document 1: Aadhaar Front */}
                <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-xl flex flex-col justify-between space-y-4 hover:border-slate-300 transition group shadow-sm">
                  <div className="space-y-3">
                    <div className="aspect-[4/3] bg-white border border-slate-200 rounded-lg flex flex-col items-center justify-center text-slate-400 relative overflow-hidden group-hover:shadow-inner transition">
                      {/* Document thumbnail mockup pattern */}
                      <div className="w-10 h-7 bg-blue-50 border border-blue-100 rounded flex flex-col justify-between p-1 opacity-70">
                        <div className="w-4 h-1 bg-blue-400 rounded-full" />
                        <div className="w-full flex justify-between gap-1">
                          <div className="w-2.5 h-2.5 bg-blue-600 rounded-full shrink-0" />
                          <div className="w-full space-y-0.5">
                            <div className="w-full h-0.5 bg-blue-300 rounded-full" />
                            <div className="w-3/4 h-0.5 bg-blue-300 rounded-full" />
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-medium text-slate-400 mt-2">Aadhaar Front View</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800">Aadhaar Front</h4>
                      <p className="text-[11px] text-slate-400">PDF / Image (1.2 MB)</p>
                    </div>
                  </div>
                  <button
                    onClick={() => openPreview("Aadhaar Front", "Primary identity document containing user photo and demographics.", "aadhaar_front")}
                    className="w-full flex items-center justify-center gap-1.5 py-2 bg-white border border-slate-200 text-xs font-semibold text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white hover:border-blue-600 transition shadow-sm"
                  >
                    <Eye size={12} />
                    View Document
                  </button>
                </div>

                {/* Document 2: Aadhaar Back */}
                <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-xl flex flex-col justify-between space-y-4 hover:border-slate-300 transition group shadow-sm">
                  <div className="space-y-3">
                    <div className="aspect-[4/3] bg-white border border-slate-200 rounded-lg flex flex-col items-center justify-center text-slate-400 relative overflow-hidden group-hover:shadow-inner transition">
                      {/* Document thumbnail mockup pattern */}
                      <div className="w-10 h-7 bg-blue-50 border border-blue-100 rounded flex flex-col justify-between p-1 opacity-70">
                        <div className="w-4 h-1 bg-blue-400 rounded-full" />
                        <div className="w-full space-y-0.5 mt-1">
                          <div className="w-full h-0.5 bg-blue-300 rounded-full" />
                          <div className="w-full h-0.5 bg-blue-300 rounded-full" />
                          <div className="w-2/3 h-0.5 bg-blue-300 rounded-full" />
                        </div>
                      </div>
                      <span className="text-[10px] font-medium text-slate-400 mt-2">Aadhaar Back View</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800">Aadhaar Back</h4>
                      <p className="text-[11px] text-slate-400">PDF / Image (950 KB)</p>
                    </div>
                  </div>
                  <button
                    onClick={() => openPreview("Aadhaar Back", "Backside of identity document displaying address details.", "aadhaar_back")}
                    className="w-full flex items-center justify-center gap-1.5 py-2 bg-white border border-slate-200 text-xs font-semibold text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white hover:border-blue-600 transition shadow-sm"
                  >
                    <Eye size={12} />
                    View Document
                  </button>
                </div>

                {/* Document 3: PAN Card (Optional) */}
                <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-xl flex flex-col justify-between space-y-4 hover:border-slate-300 transition group shadow-sm">
                  <div className="space-y-3">
                    <div className="aspect-[4/3] bg-white border border-slate-200 rounded-lg flex flex-col items-center justify-center text-slate-400 relative overflow-hidden group-hover:shadow-inner transition">
                      {/* Document thumbnail mockup pattern */}
                      <div className="w-10 h-7 bg-emerald-50 border border-emerald-100 rounded flex flex-col justify-between p-1 opacity-70">
                        <div className="w-full flex justify-between items-center">
                          <div className="w-3 h-1 bg-emerald-500 rounded-full" />
                          <div className="w-2 h-2 bg-emerald-600 rounded-full" />
                        </div>
                        <div className="w-full space-y-0.5">
                          <div className="w-full h-0.5 bg-emerald-400 rounded-full" />
                          <div className="w-4/5 h-0.5 bg-emerald-400 rounded-full" />
                        </div>
                      </div>
                      <span className="text-[10px] font-medium text-slate-400 mt-2">PAN Card Image</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800">PAN Card <span className="text-xs font-normal text-slate-400">(Optional)</span></h4>
                      <p className="text-[11px] text-slate-400">PDF / Image (1.5 MB)</p>
                    </div>
                  </div>
                  <button
                    onClick={() => openPreview("PAN Card (Optional)", "Income Tax Permanent Account Number card showing signature.", "pan_card")}
                    className="w-full flex items-center justify-center gap-1.5 py-2 bg-white border border-slate-200 text-xs font-semibold text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white hover:border-blue-600 transition shadow-sm"
                  >
                    <Eye size={12} />
                    View Document
                  </button>
                </div>

              </div>
            </section>
          </div>

          {/* Right Column (Checklist, notes, metadata card) */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Verification Checklist */}
            <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
              <div>
                <h3 className="text-md font-bold text-slate-950 flex items-center gap-2">
                  <ClipboardList size={18} className="text-blue-600" />
                  Verification Checklist
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Officer must manually verify all checklist requirements.
                </p>
              </div>

              {/* Checklist list */}
              <div className="space-y-3.5 pt-2">
                {[
                  { key: "identityMatches", label: "Identity matches PAN" },
                  { key: "aadhaarUploaded", label: "Aadhaar uploaded" },
                  { key: "panUploaded", label: "PAN uploaded" },
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

            {/* Verification Notes */}
            <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
              <div>
                <h3 className="text-md font-bold text-slate-950 flex items-center gap-2">
                  <FileCheck size={18} className="text-blue-600" />
                  Verification Notes
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Append details regarding compliance checks.
                </p>
              </div>

              <div>
                <textarea
                  rows={4}
                  placeholder="Add review notes..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-3.5 border border-slate-200 rounded-xl text-sm placeholder-slate-450 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition resize-none"
                />
              </div>
            </section>

            {/* Information Card */}
            <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
              <h3 className="text-md font-bold text-slate-950 flex items-center gap-2">
                <Info size={16} className="text-blue-600" />
                Information
              </h3>

              <div className="space-y-3.5 text-sm pt-2">
                <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                  <span className="text-slate-400 font-medium">Submission Date</span>
                  <span className="text-slate-800 font-semibold">{MOCK_APPLICATION.submittedAt}</span>
                </div>

                <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                  <span className="text-slate-400 font-medium">Last Updated</span>
                  <span className="text-slate-800 font-semibold">{MOCK_APPLICATION.lastUpdatedAt}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-medium">Assigned Officer</span>
                  <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                    <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[10px]">
                      AV
                    </div>
                    {MOCK_APPLICATION.assignedOfficer}
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-450">
          <p>© 2026 Mutual Fund Investor Onboarding. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-600 transition">Security Protocol</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-600 transition">Compliance Manual</a>
          </div>
        </div>
      </footer>

      {/* Document Preview Modal */}
      {previewDoc.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition duration-300">
          {/* Modal box */}
          <div className="relative w-full max-w-2xl bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-150">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{previewDoc.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{previewDoc.description}</p>
              </div>
              <button
                onClick={closePreview}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-xl transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content - Document Mock Render */}
            <div className="p-6 bg-slate-50 flex items-center justify-center">
              <div className="w-full max-w-md aspect-[1.618/1] bg-white border border-slate-200 rounded-xl shadow-md p-6 relative overflow-hidden flex flex-col justify-between">
                
                {/* Document Background Watermark details */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
                  <ShieldCheck size={280} className="text-slate-900" />
                </div>

                {previewDoc.type === "pan_card" ? (
                  // PAN Card Mock Rendering
                  <>
                    {/* Header */}
                    <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 block tracking-wider">INCOME TAX DEPARTMENT</span>
                        <span className="text-[12px] font-extrabold text-slate-800 block uppercase">GOVT. OF INDIA</span>
                      </div>
                      <div className="w-6 h-6 rounded-full bg-orange-500 opacity-80" />
                    </div>

                    {/* Body */}
                    <div className="flex gap-4 items-center my-4">
                      <div className="w-16 h-20 bg-slate-100 border border-slate-200 rounded flex flex-col items-center justify-center text-slate-400 font-semibold text-[10px]">
                        PHOTO
                      </div>
                      <div className="space-y-2">
                        <div>
                          <span className="text-[9px] font-semibold text-slate-400 block leading-tight">Name</span>
                          <span className="text-[11px] font-bold text-slate-800 block">{MOCK_APPLICATION.name.toUpperCase()}</span>
                        </div>
                        <div>
                          <span className="text-[9px] font-semibold text-slate-400 block leading-tight">PAN Number</span>
                          <span className="text-[12px] font-mono font-bold text-blue-700 tracking-wider block">{MOCK_APPLICATION.pan}</span>
                        </div>
                      </div>
                    </div>

                    {/* Footer Signature */}
                    <div className="flex justify-between items-end border-t border-slate-100 pt-3">
                      <div>
                        <span className="text-[8px] font-semibold text-slate-400 block">Status</span>
                        <span className="text-[10px] font-bold text-emerald-600 block">Active & Verified</span>
                      </div>
                      <div className="w-24 h-6 border-b border-dashed border-slate-300 flex items-center justify-center text-xs font-mono italic text-slate-400 select-none">
                        Rahul Sharma
                      </div>
                    </div>
                  </>
                ) : (
                  // Aadhaar Card Mock Rendering (Front or Back)
                  <>
                    {/* Header */}
                    <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 bg-orange-500 rounded-full" />
                        <span className="text-[11px] font-bold text-slate-800 tracking-tight">Unique Identification Authority of India</span>
                      </div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase">Government of India</span>
                    </div>

                    {/* Body */}
                    {previewDoc.type === "aadhaar_front" ? (
                      <div className="flex gap-4 items-center my-4">
                        <div className="w-16 h-20 bg-slate-100 border border-slate-200 rounded flex flex-col items-center justify-center text-slate-400 font-semibold text-[10px]">
                          PHOTO
                        </div>
                        <div className="space-y-2.5">
                          <div>
                            <span className="text-[8px] font-semibold text-slate-400 block">Name</span>
                            <span className="text-[11px] font-bold text-slate-800 block">{MOCK_APPLICATION.name}</span>
                          </div>
                          <div>
                            <span className="text-[8px] font-semibold text-slate-400 block">Gender / DOB</span>
                            <span className="text-[10px] font-medium text-slate-700 block">Male / 15-08-1994</span>
                          </div>
                          <div>
                            <span className="text-[8px] font-semibold text-slate-400 block">Aadhaar No.</span>
                            <span className="text-[11px] font-mono font-bold text-slate-800 block">xxxx xxxx 5678</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="my-4 space-y-2 text-slate-700">
                        <div>
                          <span className="text-[8px] font-semibold text-slate-400 block">Address</span>
                          <p className="text-[10px] font-medium leading-relaxed">
                            Flat 102, Shanti Vihar Appts, Near Central Mall, Sector 4, Dwarka, New Delhi - 110075
                          </p>
                        </div>
                        <div className="pt-1.5">
                          <span className="text-[8px] font-semibold text-slate-400 block">Barcode / QR Info</span>
                          <div className="w-full h-4 bg-slate-150 border border-slate-200 rounded flex items-center justify-center font-mono text-[8px] text-slate-400 uppercase tracking-widest">
                            |||||||||||| |||||| ||| ||||||| |||||||
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex justify-between items-end border-t border-slate-100 pt-3">
                      <span className="text-[9px] font-bold text-blue-600 block">Aadhaar - Mera Adhikaar</span>
                      <span className="text-[8px] text-slate-400 font-medium">Issue Date: 2018</span>
                    </div>
                  </>
                )}

              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 p-4 bg-slate-50 border-t border-slate-150">
              <button
                onClick={closePreview}
                className="bg-blue-600 text-white px-5 py-2 rounded-xl text-xs font-semibold hover:bg-blue-700 transition shadow-sm"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}