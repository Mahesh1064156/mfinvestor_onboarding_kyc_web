"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Eye,
  Activity,
  UserCheck,
  TrendingUp,
  RefreshCw,
} from "lucide-react";
import { Application } from "@/types/application";
import { api } from "@/services/api";
import { getApplications } from "../applications/services";
import { getAuditLogs } from "../admin/services";

// Mock Data for Dashboard Summary Cards
const STATS = {
  total: 125,
  pending: 18,
  approved: 94,
  rejected: 13,
};

// Mock Data for Recent Applications
const MOCK_APPLICATIONS: Application[] = [
  {
    id: "APP-2026-001",
    name: "Rahul Sharma",
    pan: "ABCDE1234F",
    status: "PENDING",
    createdAt: "2026-06-28",
  },
  {
    id: "APP-2026-002",
    name: "Priya Singh",
    pan: "FGHIJ5678K",
    status: "VERIFIED", // Maps to Approved in UI
    createdAt: "2026-06-27",
  },
  {
    id: "APP-2026-003",
    name: "Amit Kumar",
    pan: "LMNOB4321P",
    status: "PENDING",
    createdAt: "2026-06-27",
  },
  {
    id: "APP-2026-004",
    name: "Sneha Patel",
    pan: "QRSTU9876V",
    status: "VERIFIED", // Maps to Approved in UI
    createdAt: "2026-06-25",
  },
  {
    id: "APP-2026-005",
    name: "Vikram Malhotra",
    pan: "WXYZA2468B",
    status: "REJECTED",
    createdAt: "2026-06-24",
  },
  {
    id: "APP-2026-006",
    name: "Ananya Iyer",
    pan: "BCDEF1357G",
    status: "VERIFIED", // Maps to Approved in UI
    createdAt: "2026-06-23",
  },
  {
    id: "APP-2026-007",
    name: "Rajesh Gupta",
    pan: "HIJKL9753M",
    status: "PENDING",
    createdAt: "2026-06-22",
  },
];

// Mock Data for Recent Activities
const MOCK_ACTIVITIES = [
  {
    id: "act-1",
    investorName: "Rahul Sharma",
    action: "submitted KYC application",
    time: "10 mins ago",
    status: "PENDING",
  },
  {
    id: "act-2",
    investorName: "Priya Singh",
    action: "application approved by administrator",
    time: "2 hours ago",
    status: "VERIFIED",
  },
  {
    id: "act-3",
    investorName: "Amit Kumar",
    action: "verification process initiated",
    time: "4 hours ago",
    status: "PENDING",
  },
  {
    id: "act-4",
    investorName: "Sneha Patel",
    action: "documents uploaded successfully",
    time: "1 day ago",
    status: "UPLOADED",
  },
  {
    id: "act-5",
    investorName: "Vikram Malhotra",
    action: "application rejected (PAN mismatch)",
    time: "2 days ago",
    status: "REJECTED",
  },
];

export default function DashboardFeature() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const [stats, setStats] = useState(STATS);
  const [applications, setApplications] = useState<Application[]>(MOCK_APPLICATIONS);
  const [activities, setActivities] = useState(MOCK_ACTIVITIES);

  // Integrate dashboard stats API call with real-time 5s polling
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/dashboard/stats');
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      }
    };
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  // Integrate applications list API call with real-time 5s polling
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getApplications();
        setApplications(data);
      } catch (err) {
        console.error("Failed to fetch applications", err);
      }
    };
    fetchApplications();
    const interval = setInterval(fetchApplications, 5000);
    return () => clearInterval(interval);
  }, []);

  // Fetch audit logs as activities with real-time 5s polling
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const logs = await getAuditLogs();
        if (logs && logs.length > 0) {
          setActivities(logs);
        }
      } catch (err) {
        console.error("Failed to fetch audit logs", err);
      }
    };
    fetchActivities();
    const interval = setInterval(fetchActivities, 5000);
    return () => clearInterval(interval);
  }, []);

  // Filter applications based on search query and status filter selection
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch =
        app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.pan.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.id.toLowerCase().includes(searchTerm.toLowerCase());

      if (statusFilter === "ALL") return matchesSearch;
      if (statusFilter === "APPROVED")
        return matchesSearch && app.status === "VERIFIED";
      return matchesSearch && app.status === statusFilter;
    });
  }, [applications, searchTerm, statusFilter]);

  // Navigate to Verification details page
  const handleView = (id: string) => {
    router.push(`/verification/${id}`);
  };

  // Helper percentages for status distribution
  const percentages = useMemo(() => {
    const total = stats.total || 1;
    return {
      approved: Math.round((stats.approved / total) * 1000) / 10,
      pending: Math.round((stats.pending / total) * 1000) / 10,
      rejected: Math.round((stats.rejected / total) * 1000) / 10,
    };
  }, [stats]);

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] text-slate-800 font-sans">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Side: Brand */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-xl text-white">
                <TrendingUp size={20} className="stroke-[2.5]" />
              </div>
              <span className="font-semibold text-lg sm:text-xl tracking-tight text-slate-900">
                Mutual Fund Investor Onboarding
              </span>
            </div>

            {/* Right Side: Admin Badge */}
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-block text-xs font-medium bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-100">
                Live Environment
              </span>
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
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Admin Control Center
            </h1>
            <p className="text-slate-500 mt-1">
              Monitor investor onboarding statuses, audit logs, and KYC compliance verifications.
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-2xl text-sm font-medium hover:bg-slate-50 hover:border-slate-300 transition shadow-sm self-start sm:self-auto"
          >
            <RefreshCw size={16} />
            Refresh Data
          </button>
        </div>

        {/* Dashboard Summary Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Total Applications */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm transition hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">
                Total Applications
              </span>
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                <FileText size={20} />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-bold text-slate-900 tracking-tight">
                {stats.total}
              </h3>
              <p className="text-xs text-blue-600 font-medium mt-1">
                Cumulative submissions
              </p>
            </div>
          </div>

          {/* Card 2: Pending Verification */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm transition hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">
                Pending Verification
              </span>
              <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
                <Clock size={20} />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-bold text-slate-900 tracking-tight">
                {stats.pending}
              </h3>
              <p className="text-xs text-amber-600 font-medium mt-1">
                Requires admin review
              </p>
            </div>
          </div>

          {/* Card 3: Approved */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm transition hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">Approved</span>
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                <CheckCircle size={20} />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-bold text-slate-900 tracking-tight">
                {stats.approved}
              </h3>
              <p className="text-xs text-emerald-600 font-medium mt-1">
                KYC completed successfully
              </p>
            </div>
          </div>

          {/* Card 4: Rejected */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm transition hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">Rejected</span>
              <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl">
                <XCircle size={20} />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-bold text-slate-900 tracking-tight">
                {stats.rejected}
              </h3>
              <p className="text-xs text-rose-600 font-medium mt-1">
                Ineligible or failed compliance
              </p>
            </div>
          </div>
        </section>

        {/* Mid Section: Status Distribution & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Status Distribution Panel */}
          <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6 lg:col-span-1">
            <div>
              <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
                <UserCheck size={18} className="text-blue-600" />
                Status Distribution
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Proportional metrics of onboarding requests.
              </p>
            </div>

            {/* Visual Stacked Progress Bar */}
            <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden flex">
              <div
                style={{ width: `${percentages.approved}%` }}
                className="bg-emerald-500 h-full transition-all duration-500"
                title={`Approved: ${percentages.approved}%`}
              />
              <div
                style={{ width: `${percentages.pending}%` }}
                className="bg-amber-500 h-full transition-all duration-500"
                title={`Pending: ${percentages.pending}%`}
              />
              <div
                style={{ width: `${percentages.rejected}%` }}
                className="bg-rose-500 h-full transition-all duration-500"
                title={`Rejected: ${percentages.rejected}%`}
              />
            </div>

            {/* Colored Detail Cards */}
            <div className="grid grid-cols-1 gap-3 mt-4">
              {/* Approved segment */}
              <div className="flex items-center justify-between p-3 bg-emerald-50/50 border border-emerald-100/50 rounded-xl">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-sm font-medium text-slate-700">Approved</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-emerald-700">{stats.approved}</span>
                  <span className="text-xs text-slate-500 ml-1.5">({percentages.approved}%)</span>
                </div>
              </div>

              {/* Pending segment */}
              <div className="flex items-center justify-between p-3 bg-amber-50/50 border border-amber-100/50 rounded-xl">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="text-sm font-medium text-slate-700">Pending</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-amber-700">{stats.pending}</span>
                  <span className="text-xs text-slate-500 ml-1.5">({percentages.pending}%)</span>
                </div>
              </div>

              {/* Rejected segment */}
              <div className="flex items-center justify-between p-3 bg-rose-50/50 border border-rose-100/50 rounded-xl">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="text-sm font-medium text-slate-700">Rejected</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-rose-700">{stats.rejected}</span>
                  <span className="text-xs text-slate-500 ml-1.5">({percentages.rejected}%)</span>
                </div>
              </div>
            </div>
          </section>

          {/* Recent Activity Timeline */}
          <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6 lg:col-span-2">
            <div>
              <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
                <Activity size={18} className="text-blue-600" />
                Recent Activity
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Real-time compliance triggers and submissions.
              </p>
            </div>

            {/* Timeline element */}
            <div className="relative border-l border-slate-200 ml-3.5 space-y-6">
              {activities.map((activity) => (
                <div key={activity.id} className="relative pl-7 group">
                  {/* Indicator Dot */}
                  <span className="absolute -left-[6.5px] top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white border-2 border-slate-200 group-hover:border-blue-500 transition duration-300">
                    <span
                       className={`h-1.5 w-1.5 rounded-full ${
                        activity.status === "VERIFIED"
                          ? "bg-emerald-500"
                          : activity.status === "REJECTED"
                          ? "bg-rose-500"
                          : "bg-amber-500"
                      }`}
                    />
                  </span>

                  {/* Activity Details */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {activity.investorName}
                      </p>
                      <p className="text-sm text-slate-500">
                        {activity.action}
                      </p>
                    </div>
                    <span className="text-xs font-medium text-slate-400 self-start sm:self-auto bg-slate-50 border border-slate-100 rounded-lg px-2 py-0.5">
                      {activity.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Recent Applications Table Section */}
        <section className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {/* Section Header with Actions */}
          <div className="p-6 border-b border-slate-100 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-950">Recent Applications</h2>
                <p className="text-sm text-slate-500 mt-0.5">
                  Showing {filteredApplications.length} onboarding submissions
                </p>
              </div>

              {/* Filtering / Searching Panel */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Search Field */}
                <div className="relative max-w-xs w-full">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                    <Search size={16} />
                  </span>
                  <input
                    type="text"
                    placeholder="Search Name or PAN..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                  />
                </div>

                {/* Filter Selector */}
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                    <Filter size={14} />
                  </span>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="pl-8.5 pr-8 py-2 border border-slate-200 rounded-xl text-sm text-slate-700 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition appearance-none cursor-pointer"
                  >
                    <option value="ALL">All Statuses</option>
                    <option value="PENDING">Pending</option>
                    <option value="APPROVED">Approved</option>
                    <option value="REJECTED">Rejected</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto w-full">
            {filteredApplications.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-xs font-bold uppercase tracking-wider">
                    <th className="px-6 py-4">Application ID</th>
                    <th className="px-6 py-4">Investor Name</th>
                    <th className="px-6 py-4">PAN</th>
                    <th className="px-6 py-4">Submitted Date</th>
                    <th className="px-6 py-4">Current Status</th>
                    <th className="px-6 py-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredApplications.map((app) => (
                    <tr
                      key={app.id}
                      className="hover:bg-slate-50/70 transition duration-150 text-sm"
                    >
                      {/* ID */}
                      <td className="px-6 py-4.5 font-semibold text-slate-900 whitespace-nowrap">
                        {app.id}
                      </td>

                      {/* Name */}
                      <td className="px-6 py-4.5 font-medium text-slate-800 whitespace-nowrap">
                        {app.name}
                      </td>

                      {/* PAN */}
                      <td className="px-6 py-4.5 text-slate-600 font-mono tracking-wide whitespace-nowrap">
                        {app.pan}
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4.5 text-slate-500 whitespace-nowrap">
                        {app.createdAt}
                      </td>

                      {/* Status Badge */}
                      <td className="px-6 py-4.5 whitespace-nowrap">
                        {app.status === "VERIFIED" ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Approved
                          </span>
                        ) : app.status === "REJECTED" ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-100">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                            Rejected
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-100">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            Pending
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4.5 whitespace-nowrap text-center">
                        <button
                          onClick={() => handleView(app.id)}
                          className="inline-flex items-center justify-center gap-1.5 text-blue-600 hover:text-white border border-blue-200 hover:bg-blue-600 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition shadow-sm"
                        >
                          <Eye size={13} />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                <div className="p-3 bg-slate-50 text-slate-400 rounded-full border border-slate-100">
                  <Search size={24} />
                </div>
                <h3 className="text-slate-900 font-semibold mt-3">No applications found</h3>
                <p className="text-slate-500 text-sm mt-1 max-w-xs">
                  We couldn't find any investor matching "{searchTerm}" or status "{statusFilter}".
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 Mutual Fund Investor Onboarding. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-600 transition">
              Security Protocol
            </a>
            <span>•</span>
            <a href="#" className="hover:text-slate-600 transition">
              Admin Compliance
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}