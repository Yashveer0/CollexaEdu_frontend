"use client";

import type React from "react";

import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  TrendingUp,
  PackageIcon,
  ClipboardList,
  BookOpen,
  FolderOpen,
  BookMarked,
  Star,
  Briefcase,
  FileText,
  Settings,
  LogOut,
  ChevronDown,
  Plus,
  Search,
  Bell,
  Monitor,
  Menu,
  X,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

interface AdminPackage {
  id: string;
  name: string;
  price: number;
  duration: string;
  status: "active" | "inactive";
  features: string[];
}

interface AdminUser {
  name: string;
  email: string;
  role: string;
  avatar: string;
}

function Button({
  children,
  onClick,
  className = "",
  variant = "default",
  size = "md",
  disabled = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "default" | "outline";
  size?: "sm" | "md";
  disabled?: boolean;
}) {
  const baseStyles =
    "font-medium rounded-lg transition-colors flex items-center justify-center gap-2";
  const variants = {
    default: "bg-blue-600 hover:bg-blue-700 text-white disabled:bg-blue-400",
    outline:
      "bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 disabled:bg-gray-100",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2.5 text-sm",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}

function Input({
  type = "text",
  placeholder = "",
  value = "",
  onChange,
  className = "",
}: {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${className}`}
    />
  );
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-lg border border-gray-200 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function CardHeader({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`px-6 py-4 border-b border-gray-200 ${className}`}>
      {children}
    </div>
  );
}

function CardTitle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
      {children}
    </h3>
  );
}

function CardDescription({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={`text-sm text-gray-600 ${className}`}>{children}</p>;
}

function CardContent({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>;
}

export default function AdminDashboard() {
  const [currentPage, setCurrentPage] = useState("packages");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [packages, setPackages] = useState<AdminPackage[]>([
    {
      id: "1",
      name: "Basic Plan",
      price: 29,
      duration: "Monthly",
      status: "active",
      features: ["5 Users", "10GB Storage"],
    },
    {
      id: "2",
      name: "Professional Plan",
      price: 79,
      duration: "Monthly",
      status: "active",
      features: ["25 Users", "100GB Storage", "Priority Support"],
    },
    {
      id: "3",
      name: "Enterprise Plan",
      price: 299,
      duration: "Yearly",
      status: "active",
      features: ["Unlimited Users", "Unlimited Storage", "24/7 Support"],
    },
  ]);

  const adminUser: AdminUser = {
    name: "Admin User",
    email: "admin@gmail.com",
    role: "Administrator",
    avatar: "👤",
  };

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
    { icon: Users, label: "Users", id: "users" },
    { icon: TrendingUp, label: "Leads", id: "leads" },
    { icon: PackageIcon, label: "Packages", id: "packages" },
    { icon: ClipboardList, label: "Admission Request", id: "admission" },
    { icon: BookOpen, label: "Courses", id: "courses", hasSubmenu: true },
    { icon: FolderOpen, label: "Blog Categories", id: "blog-categories" },
    { icon: BookMarked, label: "Blogs", id: "blogs" },
    { icon: Star, label: "Testimonials", id: "testimonials" },
    { icon: Briefcase, label: "Careers", id: "careers", hasSubmenu: true },
    { icon: FileText, label: "Applications", id: "applications" },
    { icon: Settings, label: "Settings", id: "settings", hasSubmenu: true },
  ];

  const stats = [
    {
      label: "Total Packages",
      value: "3",
      icon: PackageIcon,
      color: "bg-blue-100",
    },
    {
      label: "Active Plans",
      value: "3",
      icon: CheckCircle,
      color: "bg-green-100",
    },
    { label: "Inactive Plans", value: "0", icon: XCircle, color: "bg-red-100" },
  ];

  const handleAddPackage = () => {
    const newPackage: AdminPackage = {
      id: String(packages.length + 1),
      name: "New Package",
      price: 99,
      duration: "Monthly",
      status: "active",
      features: [],
    };
    setPackages([...packages, newPackage]);
  };

  const filteredPackages = packages.filter((pkg) =>
    pkg.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-0"
        } bg-white border-r border-gray-200 overflow-hidden transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
           
            <div>
              <img className="h-12 w-20" src="/logo.png" alt="" />
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600 border-l-2 border-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon size={20} />
                <span className="text-sm font-medium flex-1 text-left">
                  {item.label}
                </span>
                {item.hasSubmenu && <ChevronDown size={16} />}
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            <LogOut size={18} />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 text-gray-900 rounded-lg lg:hidden"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium capitalize">
                {currentPage === "packages" ? "Packages" : currentPage}
              </span>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 relative">
              <Bell size={20} className="text-gray-600" />
              <span className="w-2 h-2 bg-red-500 rounded-full absolute mt-0 ml-4"></span>
            </div>
            <Monitor size={20} className="text-gray-600" />
            <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {adminUser.name}
                </p>
                <p className="text-xs text-gray-500">{adminUser.email}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center text-white text-lg">
                {adminUser.avatar}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {currentPage === "packages" && (
            <div className="p-8">
              {/* Page Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Packages & Plans
                </h1>
                <p className="text-gray-600">
                  Manage subscription plans for employers.
                </p>
              </div>

              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {stats.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <Card key={idx} className="bg-white">
                      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                          {stat.label}
                        </CardTitle>
                        <div className={`${stat.color} p-2 rounded-lg`}>
                          <Icon
                            size={24}
                            className={
                              idx === 0
                                ? "text-blue-600"
                                : idx === 1
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold text-gray-900">
                          {stat.value}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Search and Add Button */}
              <div className="flex gap-4 mb-8">
                <div className="flex-1 relative">
                  <Search
                    className="absolute left-3 top-3 text-gray-400"
                    size={18}
                  />
                  <Input
                    type="text"
                    placeholder="Search packages..."
                    className="pl-10 bg-white border-gray-200"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button
                  onClick={handleAddPackage}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Plus size={18} />
                  Create Package
                </Button>
              </div>

              {/* Packages Table */}
              <Card className="bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Package Name
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Price
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Duration
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Features
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredPackages.map((pkg) => (
                        <tr
                          key={pkg.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                            {pkg.name}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            ${pkg.price}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {pkg.duration}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                                pkg.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {pkg.status === "active" ? (
                                <CheckCircle size={16} />
                              ) : (
                                <AlertCircle size={16} />
                              )}
                              {pkg.status.charAt(0).toUpperCase() +
                                pkg.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {pkg.features.length > 0
                              ? pkg.features.join(", ")
                              : "No features"}
                          </td>
                          <td className="px-6 py-4">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-blue-600 bg-transparent"
                            >
                              Edit
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {currentPage !== "packages" && (
            <div className="p-8 flex items-center justify-center h-full">
              <Card className="bg-white w-full max-w-md">
                <CardHeader>
                  <CardTitle className="text-center text-2xl">
                    {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}
                  </CardTitle>
                  <CardDescription className="text-center">
                    This page is ready to be configured with your specific
                    content.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center text-gray-600">
                  <p>
                    Navigate using the sidebar to view the Packages section with
                    full functionality.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
