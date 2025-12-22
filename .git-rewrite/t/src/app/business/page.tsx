"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/context";
import { Container } from "@/components/ui/container";
import { 
  Store, 
  ChefHat, 
  Check, 
  X,
  Smartphone,
  Monitor,
  ArrowRight,
  Zap,
  DollarSign,
  Users,
  BarChart3
} from "lucide-react";
import Link from "next/link";


// Dashboard content simplified for Cloudflare Pages deployment
export default function Dashboard() {
  return <div className="p-6"><h1>Dashboard</h1><p className="text-gray-500">Charts disabled to reduce bundle size.</p></div>
}
