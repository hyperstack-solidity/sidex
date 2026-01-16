"use client";

import { ReactNode, useState } from "react";
import { motion } from "motion/react";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Sparkles,
  Settings,
  Menu,
  FileText,
  Shield,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname, useRouter } from "next/navigation";
import { LegalModal } from "@/components/legal-modals";

interface AppLayoutProps {
  children: ReactNode;
}

const navigation = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { id: "swap", label: "Swap", icon: ArrowLeftRight, path: "/swap" },
  { id: "ai", label: "AI Assistant", icon: Sparkles, path: "/ai" },
  { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
];

import { AmbientBackground } from "@/components/ui/ambient-background";

import Image from "next/image";

export function AppLayout({ children }: AppLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [legalModal, setLegalModal] = useState<"tos" | "privacy" | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logging out...");
    router.push("/login"); // Redirect to login
  };

  const onOpenLegal = (type: "tos" | "privacy") => {
    setLegalModal(type);
  };

  return (
    <div className="min-h-screen bg-background relative">
      <AmbientBackground />
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push("/dashboard")}>
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-lg font-bold text-primary-foreground">SE</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full border-2 border-background" />
            </div>
            <div className="hidden sm:block">
              <Image
                src="/sidex.png"
                alt="SidEx"
                width={100}
                height={32}
                className="h-6 w-auto mb-1"
                priority
              />
              <p className="text-xs text-muted-foreground">Sharia-Compliant Wallet</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.path);
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "secondary" : "ghost"}
                  onClick={() => router.push(item.path)}
                  className={`gap-2 ${isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Button>
              );
            })}
          </nav>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex flex-col h-full">
                {/* Mobile Navigation */}
                <nav className="flex-1 space-y-2 mt-8">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname.startsWith(item.path);
                    return (
                      <Button
                        key={item.id}
                        variant={isActive ? "secondary" : "ghost"}
                        onClick={() => {
                          router.push(item.path);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full justify-start gap-3 ${isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
                          }`}
                      >
                        <Icon className="w-5 h-5" />
                        {item.label}
                      </Button>
                    );
                  })}

                  <div className="my-4 border-t border-border" />

                  <Button
                    variant="ghost"
                    onClick={() => {
                      onOpenLegal("tos");
                      setMobileMenuOpen(false);
                    }}
                    className="w-full justify-start gap-3 text-muted-foreground"
                  >
                    <FileText className="w-5 h-5" />
                    Terms of Service
                  </Button>

                  <Button
                    variant="ghost"
                    onClick={() => {
                      onOpenLegal("privacy");
                      setMobileMenuOpen(false);
                    }}
                    className="w-full justify-start gap-3 text-muted-foreground"
                  >
                    <Shield className="w-5 h-5" />
                    Privacy Policy
                  </Button>

                  <Button
                    variant="ghost"
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full justify-start gap-3 text-destructive"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </Button>
                </nav>

                {/* Footer */}
                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground text-center">
                    🔒 Non-custodial • Sharia-compliant
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Desktop User Menu */}
          <div className="hidden md:block">
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="text-muted-foreground"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-4xl mx-auto px-4 py-6">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 mt-12">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              © 2026 SidEx. All rights reserved.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => onOpenLegal("tos")}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Terms of Service
              </button>
              <button
                onClick={() => onOpenLegal("privacy")}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </button>
            </div>
          </div>
        </div>
      </footer>

      <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />
    </div>
  );
}
