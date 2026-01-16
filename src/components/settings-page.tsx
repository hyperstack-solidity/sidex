import { useState } from "react";
import { motion } from "motion/react";
import {
  Settings,
  Shield,
  Bell,
  Globe,
  Moon,
  Calculator,
  ChevronRight,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [biometrics, setBiometrics] = useState(false);
  const [zakatReminders, setZakatReminders] = useState(true);
  const [nisabThreshold, setNisabThreshold] = useState("5000");
  const [currency, setCurrency] = useState("USD");

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your wallet preferences and security
        </p>
      </div>

      {/* Security */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="biometrics">Biometric Authentication</Label>
                <p className="text-sm text-muted-foreground">
                  Use fingerprint or face ID to unlock
                </p>
              </div>
              <Switch
                id="biometrics"
                checked={biometrics}
                onCheckedChange={setBiometrics}
              />
            </div>

            <div className="pt-4 border-t border-border">
              <Button variant="outline" className="w-full justify-between">
                <span>Backup Recovery Phrase</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            <Button variant="outline" className="w-full justify-between text-destructive border-destructive/30">
              <span>View Private Key</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="notifications">Transaction Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified for incoming/outgoing transactions
                </p>
              </div>
              <Switch
                id="notifications"
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="zakat-reminders">Zakat Reminders</Label>
                <p className="text-sm text-muted-foreground">
                  Annual reminders for Zakat obligations
                </p>
              </div>
              <Switch
                id="zakat-reminders"
                checked={zakatReminders}
                onCheckedChange={setZakatReminders}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Zakat Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="border-accent/20 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-accent" />
              Zakat Calculator Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nisab">Nisab Threshold (USD)</Label>
              <Input
                id="nisab"
                type="number"
                value={nisabThreshold}
                onChange={(e) => setNisabThreshold(e.target.value)}
                className="bg-input border-primary/20"
              />
              <p className="text-sm text-muted-foreground">
                Minimum wealth required for Zakat (typically $5,000)
              </p>
            </div>

            <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5" />
                <div>
                  <p className="font-medium text-emerald-400">
                    Current Portfolio: $150,000.00
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    You are above the Nisab threshold. Zakat due: $3,750.00 (2.5%)
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currency">Display Currency</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger id="currency" className="bg-input border-primary/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                  <SelectItem value="AED">AED (د.إ)</SelectItem>
                  <SelectItem value="SAR">SAR (﷼)</SelectItem>
                  <SelectItem value="QAR">QAR (ر.ق)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label>Theme</Label>
                <p className="text-sm text-muted-foreground">
                  Currently: Cinematic Dark Mode
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Moon className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* About */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2">
                <span className="text-xl font-bold text-primary">SE</span>
              </div>
              <p className="font-medium">SidEx Wallet</p>
              <p className="text-sm text-muted-foreground">Version 1.0.0</p>
              <p className="text-xs text-muted-foreground pt-2">
                Sharia-Compliant • Non-Custodial • GCC Regulated
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
