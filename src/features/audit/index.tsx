"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Search,
  Filter,
  Calendar,
  Clock,
  User,
  ShieldCheck,
  FileCheck,
  AlertCircle,
  Database,
  RefreshCw,
  FolderOpen,
} from "lucide-react";

// Audit entry interface
interface AuditLog {
  id: string;
  timestamp: string;
  applicationId: string;
  investorName: string;
  activityType: "REGISTRATION" | "PAN_VERIFICATION" | "KYC_UPLOAD" | "VERIFICATION" | "STATUS_UPDATE";
  description: string;
  performedBy: string;
}

// Mock database logs in chronological order
const MOCK_LOGS: AuditLog[] = [
  {
    id: "log-1",
    timestamp: "24 Jun 2026 • 10:15 AM",
    applicationId: "APP-2026-001",
    investorName: "Rahul Sharma",
    activityType: "REGISTRATION",
    description: "Registration Completed",
    performedBy: "Investor",
  },
  {
    id: "log-2",
    timestamp: "24 Jun 2026 • 10:25 AM",
    applicationId: "APP-2026-001",
    investorName: "Rahul Sharma",
    activityType: "PAN_VERIFICATION",
    description: "PAN Submitted",
    performedBy: "Investor",
  },
  {
    id: "log-3",
    timestamp: "24 Jun 2026 • 10:40 AM",
    applicationId: "APP-2026-001",
    investorName: "Rahul Sharma",
    activityType: "KYC_UPLOAD",
    description: "KYC Documents Uploaded",
    performedBy: "Investor",
  },
  {
    id: "log-4",
    timestamp: "25 Jun 2026 • 09:10 AM",
    applicationId: "APP-2026-001",
    investorName: "Rahul Sharma",
    activityType: "VERIFICATION",
    description: "Verification Approved",
    performedBy: "Verification Officer",
  },
  {
    id: "log-5",
    timestamp: "25 Jun 2026 • 09:15 AM",
    applicationId: "APP-2026-001",
    investorName: "Rahul Sharma",
    activityType: "STATUS_UPDATE",
    description: "Status Updated to VERIFIED",
    performedBy: "System",
  },
  {
    id: "log-6",
    timestamp: "27 Jun 2026 • 11:30 AM",
    applicationId: "APP-2026-002",
    investorName: "Priya Singh",
    activityType: "REGISTRATION",
    description: "Registration Completed",
    performedBy: "Investor",
  },
  {
    id: "log-7",
    timestamp: "27 Jun 2026 • 11:45 AM",
    applicationId: "APP-2026-002",
    investorName: "Priya Singh",
    activityType: "KYC_UPLOAD",
    description: "Aadhaar & PAN Documents Uploaded",
    performedBy: "Investor",
  },
  {
    id: "log-8",
    timestamp: "28 Jun 2026 • 09:20 AM",
    applicationId: "APP-2026-005",
    investorName: "Vikram Malhotra",
    activityType: "STATUS_UPDATE",
    description: "Verification Rejected (PAN image blurred)",
    performedBy: "Verification Officer",
  },
];

export default function AuditFeature() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("ALL");

  // TODO: Integrate audit trail API in the future
  // useEffect(() => {
  //   const fetchLogs = async () => {
  //     const data = await getAuditLogs();
  //     setLogs(data);
  //   };
  //   fetchLogs();
  // }, []);

  // Filter logs in real-time
  const filteredLogs = useMemo(() => {
    return MOCK_LOGS.filter((log) => {
      const matchesSearch =
        log.investorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.applicationId.toLowerCase().includes(searchTerm.toLowerCase());

      if (typeFilter === "ALL") return matchesSearch;
      return matchesSearch && log.activityType === typeFilter;
    });
  }, [searchTerm, typeFilter]);

  // Helper mapping to return styled badges based on log type
  const renderBadge = (type: AuditLog["activityType"]) => {
    switch (type) {
      case "REGISTRATION":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Registration
          </span>
        );
      case "PAN_VERIFICATION":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-100">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
            PAN Verification
          </span>
        );
      case "KYC_UPLOAD":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-100">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            KYC Upload
          </span>
        );
      case "VERIFICATION":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Verification
          </span>
        );
      case "STATUS_UPDATE":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-100">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Status Update
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] text-slate-800 font-sans">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Back Link & App Title */}
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

            {/* Right: Admin Role */}
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded-2xl">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                A
              </div>
              <span className="text-sm font-semibold text-slate-700">
                Administrator
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header */}
        <div className="pb-4 border-b border-slate-200/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Audit Trail
            </h1>
            <p className="text-slate-500 mt-1.5">
              Track all investor onboarding activities and verification history.
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-2xl text-sm font-medium hover:bg-slate-50 hover:border-slate-300 transition shadow-sm self-start sm:self-auto"
          >
            <RefreshCw size={16} />
            Refresh Trail
          </button>
        </div>

        {/* Search & Filter Controls */}
        <section className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                <Search size={16} />
              </span>
              <input
                type="text"
                placeholder="Search by Investor Name or Application ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
              />
            </div>

            {/* Status Filter Dropdown */}
            <div className="relative w-full sm:w-auto shrink-0">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                <Filter size={14} />
              </span>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full sm:w-56 pl-9 pr-10 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-700 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition appearance-none cursor-pointer"
              >
                <option value="ALL">All Activities</option>
                <option value="REGISTRATION">Registration</option>
                <option value="PAN_VERIFICATION">PAN Verification</option>
                <option value="KYC_UPLOAD">KYC Upload</option>
                <option value="VERIFICATION">Verification</option>
                <option value="STATUS_UPDATE">Status Update</option>
              </select>
            </div>
          </div>
        </section>

        {/* Audit Logs Table / Timeline Panel */}
        <section className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {filteredLogs.length > 0 ? (
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-xs font-bold uppercase tracking-wider">
                    <th className="px-6 py-4">Timestamp</th>
                    <th className="px-6 py-4">Application ID</th>
                    <th className="px-6 py-4">Investor Name</th>
                    <th className="px-6 py-4">Activity Type</th>
                    <th className="px-6 py-4">Description</th>
                    <th className="px-6 py-4">Performed By</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredLogs.map((log) => (
                    <tr
                      key={log.id}
                      className="hover:bg-slate-50/50 transition duration-150 text-sm"
                    >
                      {/* Timestamp */}
                      <td className="px-6 py-4.5 whitespace-nowrap text-slate-500 flex items-center gap-2">
                        <Clock size={14} className="text-slate-400" />
                        {log.timestamp}
                      </td>

                      {/* Application ID */}
                      <td className="px-6 py-4.5 whitespace-nowrap font-bold text-slate-900">
                        {log.applicationId}
                      </td>

                      {/* Investor Name */}
                      <td className="px-6 py-4.5 whitespace-nowrap font-medium text-slate-800">
                        {log.investorName}
                      </td>

                      {/* Activity Badge */}
                      <td className="px-6 py-4.5 whitespace-nowrap">
                        {renderBadge(log.activityType)}
                      </td>

                      {/* Description */}
                      <td className="px-6 py-4.5 text-slate-600 font-medium max-w-xs truncate">
                        {log.description}
                      </td>

                      {/* Performed By */}
                      <td className="px-6 py-4.5 whitespace-nowrap font-semibold text-slate-700">
                        {log.performedBy === "System" ? (
                          <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                            <Database size={11} /> System
                          </span>
                        ) : log.performedBy === "Verification Officer" ? (
                          <span className="inline-flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                            <FileCheck size={11} /> Officer
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs text-slate-600 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                            <User size={11} /> Investor
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            /* Empty State Container */
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
              <div className="p-4 bg-slate-50 text-slate-400 rounded-full border border-slate-100">
                <FolderOpen size={32} />
              </div>
              <h3 className="text-slate-900 text-lg font-bold mt-4">
                No Audit Records Found
              </h3>
              <p className="text-slate-500 text-sm mt-1.5 max-w-sm leading-relaxed">
                Audit activities will appear here once investor onboarding actions are performed.
              </p>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 Mutual Fund Investor Onboarding. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-600 transition">Security Protocol</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-600 transition">Compliance Ledger</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
