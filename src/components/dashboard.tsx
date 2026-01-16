import { motion } from "motion/react";
import { useState } from "react";
import {
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Shield,
  Zap,
  Send,
  ArrowLeftRight,
  Plus,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WelcomeBanner } from "@/components/welcome-banner";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const portfolioData = [
  { time: "00:00", value: 145000 },
  { time: "04:00", value: 147500 },
  { time: "08:00", value: 146000 },
  { time: "12:00", value: 149000 },
  { time: "16:00", value: 148500 },
  { time: "20:00", value: 150000 },
  { time: "24:00", value: 150000 },
];

const tokens = [
  {
    name: "SidraChain",
    symbol: "SDA",
    balance: "10,250.50",
    value: "$125,000.00",
    change: "+12.5%",
    isPositive: true,
    halalStatus: "certified",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    balance: "5.25",
    value: "$15,750.00",
    change: "+8.2%",
    isPositive: true,
    halalStatus: "certified",
  },
  {
    name: "Real Estate Fund",
    symbol: "TRE",
    balance: "50.00",
    value: "$9,250.00",
    change: "-2.1%",
    isPositive: false,
    halalStatus: "certified",
  },
];

const recentTransactions = [
  {
    type: "received",
    token: "SDA",
    amount: "+500.00",
    usd: "$6,100.00",
    from: "0x742d...3a8f",
    time: "2 hours ago",
  },
  {
    type: "sent",
    token: "ETH",
    amount: "-0.5",
    usd: "$1,500.00",
    to: "0x3f2a...9c1d",
    time: "5 hours ago",
  },
  {
    type: "swap",
    token: "SDA → ETH",
    amount: "1000 SDA",
    usd: "$12,200.00",
    time: "1 day ago",
  },
];

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <div className="space-y-6 pb-8">
      {/* Welcome Banner */}
      {showWelcome && <WelcomeBanner onClose={() => setShowWelcome(false)} />}

      {/* Portfolio Overview - Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="relative overflow-hidden border border-zinc-800 bg-zinc-950">

          <CardHeader className="relative">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-sm text-muted-foreground mb-2">
                  Total Portfolio Value
                </CardTitle>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold">$150,000.00</span>
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +18.7%
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  +$23,750.00 this month
                </p>
              </div>

              {/* Halal Certified Badge */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center gap-1 p-3 rounded-xl bg-accent/20 border border-accent/30 backdrop-blur-sm"
              >
                <Shield className="w-6 h-6 text-accent" />
                <span className="text-xs font-medium text-accent">Halal</span>
                <span className="text-xs text-accent/80">Certified</span>
              </motion.div>
            </div>
          </CardHeader>

          <CardContent className="relative">
            {/* Chart */}
            <div className="h-48 -mx-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={portfolioData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0F6B66" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#0F6B66" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(15, 107, 102, 0.1)" />
                  <XAxis
                    dataKey="time"
                    stroke="#8A9BA8"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="#8A9BA8"
                    fontSize={12}
                    tickLine={false}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0B2733",
                      border: "1px solid rgba(15, 107, 102, 0.3)",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, "Value"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#0F6B66"
                    strokeWidth={2}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-3 gap-4"
      >
        <Button
          onClick={() => onNavigate("send")}
          className="h-auto flex-col gap-2 p-4 bg-primary/10 hover:bg-primary/20 border border-primary/20 text-foreground"
          variant="outline"
        >
          <Send className="w-5 h-5 text-primary" />
          <span className="text-sm">Send</span>
        </Button>
        <Button
          onClick={() => onNavigate("swap")}
          className="h-auto flex-col gap-2 p-4 bg-accent/10 hover:bg-accent/20 border border-accent/20 text-foreground"
          variant="outline"
        >
          <ArrowLeftRight className="w-5 h-5 text-accent" />
          <span className="text-sm">Swap</span>
        </Button>
        <Button
          onClick={() => onNavigate("deposit")}
          className="h-auto flex-col gap-2 p-4 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-foreground"
          variant="outline"
        >
          <Plus className="w-5 h-5 text-emerald-400" />
          <span className="text-sm">Deposit</span>
        </Button>
      </motion.div>

      {/* Assets Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Your Assets</h3>
          <Button variant="ghost" size="sm" className="text-primary">
            View All
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <div className="grid gap-4">
          {tokens.map((token, index) => (
            <motion.div
              key={token.symbol}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <Card className="border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 hover:border-zinc-700 transition-all cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                        <span className="text-sm font-bold text-primary">
                          {token.symbol.slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{token.name}</p>
                          {token.halalStatus === "certified" && (
                            <Badge variant="outline" className="text-xs border-accent/30 text-accent">
                              <Sparkles className="w-3 h-3 mr-1" />
                              Halal
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {token.balance} {token.symbol}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{token.value}</p>
                      <div
                        className={`text-sm flex items-center justify-end ${token.isPositive ? "text-emerald-400" : "text-red-400"
                          }`}
                      >
                        {token.isPositive ? (
                          <ArrowUpRight className="w-3 h-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="w-3 h-3 mr-1" />
                        )}
                        {token.change}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="space-y-4">
        <h3 className="font-semibold">Recent Transactions</h3>
        <Card className="border border-zinc-800 bg-zinc-900">
          <CardContent className="p-4 space-y-3">
            {recentTransactions.map((tx, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b border-border/50 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === "received"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : tx.type === "sent"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-accent/20 text-accent"
                      }`}
                  >
                    {tx.type === "received" ? (
                      <ArrowDownRight className="w-5 h-5" />
                    ) : tx.type === "sent" ? (
                      <ArrowUpRight className="w-5 h-5" />
                    ) : (
                      <ArrowLeftRight className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium capitalize">{tx.type}</p>
                    <p className="text-sm text-muted-foreground">{tx.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{tx.amount}</p>
                  <p className="text-sm text-muted-foreground">{tx.usd}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* AI Insights Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative overflow-hidden"
      >
        <Card className="border border-zinc-800 bg-zinc-900">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Market Signal Analysis</p>
                <p className="text-sm text-muted-foreground">
                  SidraChain (SDA) showing positive momentum (+12.5%). Zakat threshold reached.
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-accent hover:text-accent/80"
                onClick={() => onNavigate("ai")}
              >
                View
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}