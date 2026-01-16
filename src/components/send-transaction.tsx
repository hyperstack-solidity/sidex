import { useState } from "react";
import { motion } from "motion/react";
import { Send, ArrowLeft, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface SendTransactionProps {
  onBack: () => void;
}

const tokens = [
  { symbol: "SDA", name: "SidraChain", balance: "10,250.50" },
  { symbol: "ETH", name: "Ethereum", balance: "5.25" },
  { symbol: "BTC", name: "Bitcoin", balance: "0.15" },
];

export function SendTransaction({ onBack }: SendTransactionProps) {
  const [selectedToken, setSelectedToken] = useState("SDA");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const estimatedFee = "0.0025";
  const estimatedFeeUSD = "$3.05";

  const handleConfirm = () => {
    setIsConfirming(true);
  };

  const handleSend = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
    }, 2000);
  };

  if (isComplete) {
    return (
      <div className="space-y-6 pb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-12"
        >
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
            <CheckCircle className="w-10 h-10 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Broadcast Successful</h2>
          <p className="text-muted-foreground text-center mb-6">
            Transfer of {amount} {selectedToken} initiated to blockchain.
          </p>
          <Card className="w-full border-primary/20 bg-card/50 backdrop-blur-sm mb-6">
            <CardContent className="p-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-medium">
                  {amount} {selectedToken}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">To</span>
                <span className="font-mono text-xs">
                  {recipient.slice(0, 8)}...{recipient.slice(-6)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Network Fee</span>
                <span>
                  {estimatedFee} SDA ({estimatedFeeUSD})
                </span>
              </div>
              <div className="pt-3 border-t border-border">
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                  Verified Compliant Transfer
                </Badge>
              </div>
            </CardContent>
          </Card>
          <Button onClick={onBack} className="w-full bg-primary hover:bg-primary/90">
            Back to Dashboard
          </Button>
        </motion.div>
      </div>
    );
  }

  if (isConfirming) {
    return (
      <div className="space-y-6 pb-8">
        <Button
          variant="ghost"
          onClick={() => setIsConfirming(false)}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Confirm Transaction</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Transaction Simulation */}
            <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-accent" />
                Transaction Summary
              </h4>
              <p className="text-sm text-muted-foreground">
                You will send exactly {amount} {selectedToken} to the recipient. After
                the network fee of {estimatedFee} SDA ({estimatedFeeUSD}), your total
                cost will be calculated transparently.
              </p>
            </div>

            {/* Details */}
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Sending</span>
                <span className="font-medium">
                  {amount} {selectedToken}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">To Address</span>
                <span className="font-mono text-sm">
                  {recipient.slice(0, 10)}...{recipient.slice(-8)}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Network Fee</span>
                <span>
                  {estimatedFee} SDA ({estimatedFeeUSD})
                </span>
              </div>
              <div className="flex justify-between py-2 font-medium">
                <span>Total Cost</span>
                <span>
                  {parseFloat(amount) + parseFloat(estimatedFee)} SDA
                </span>
              </div>
            </div>

            {/* Compliance Check */}
            <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Compliance Verified</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Zero-interest transaction. Network fees only.
              </p>
            </div>

            <Button
              onClick={handleSend}
              disabled={isProcessing}
              className="w-full bg-primary hover:bg-primary/90"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Confirm & Send
                  <Send className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="w-5 h-5 text-primary" />
              Send Transaction
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Select Token */}
            <div className="space-y-2">
              <Label>Select Token</Label>
              <Select value={selectedToken} onValueChange={setSelectedToken}>
                <SelectTrigger className="bg-input border-primary/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {tokens.map((token) => (
                    <SelectItem key={token.symbol} value={token.symbol}>
                      <div className="flex items-center justify-between w-full">
                        <span>
                          {token.name} ({token.symbol})
                        </span>
                        <span className="text-muted-foreground text-sm ml-4">
                          {token.balance}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Recipient Address */}
            <div className="space-y-2">
              <Label>Recipient Address</Label>
              <Input
                placeholder="0x..."
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="bg-input border-primary/20 font-mono"
              />
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Amount</Label>
                <button
                  onClick={() => {
                    const token = tokens.find((t) => t.symbol === selectedToken);
                    if (token) setAmount(token.balance.replace(",", ""));
                  }}
                  className="text-sm text-primary hover:underline"
                >
                  Max
                </button>
              </div>
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-input border-primary/20"
              />
              <p className="text-sm text-muted-foreground">
                Available:{" "}
                {tokens.find((t) => t.symbol === selectedToken)?.balance}{" "}
                {selectedToken}
              </p>
            </div>

            {/* Fee Estimate */}
            {amount && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="p-4 rounded-lg bg-muted/50 border border-border"
              >
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Estimated Fee</span>
                  <span>
                    {estimatedFee} SDA ({estimatedFeeUSD})
                  </span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>You&apos;ll Send</span>
                  <span>
                    {amount} {selectedToken}
                  </span>
                </div>
              </motion.div>
            )}

            <Button
              onClick={handleConfirm}
              disabled={!recipient || !amount || parseFloat(amount) <= 0}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Continue
              <Send className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
