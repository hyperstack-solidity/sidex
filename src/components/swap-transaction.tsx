import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeftRight, ArrowLeft, CheckCircle, Loader2, ArrowDown } from "lucide-react";
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

interface SwapTransactionProps {
  onBack: () => void;
}

const tokens = [
  { symbol: "SDA", name: "SidraChain", balance: "10,250.50", price: 12.2 },
  { symbol: "ETH", name: "Ethereum", balance: "5.25", price: 3000 },
  { symbol: "TRE", name: "Real Estate Fund", balance: "50.00", price: 185 },
];

export function SwapTransaction({ onBack }: SwapTransactionProps) {
  const [fromToken, setFromToken] = useState("SDA");
  const [toToken, setToToken] = useState("ETH");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const swapFee = "0.3%";
  const estimatedFeeUSD = "$3.66";

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    if (value) {
      const fromTokenData = tokens.find((t) => t.symbol === fromToken);
      const toTokenData = tokens.find((t) => t.symbol === toToken);
      if (fromTokenData && toTokenData) {
        const calculated =
          (parseFloat(value) * fromTokenData.price) / toTokenData.price;
        setToAmount(calculated.toFixed(6));
      }
    } else {
      setToAmount("");
    }
  };

  const handleSwapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const handleConfirm = () => {
    setIsConfirming(true);
  };

  const handleSwap = () => {
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
          <h2 className="text-2xl font-bold mb-2">Order Executed</h2>
          <p className="text-muted-foreground text-center mb-6">
            Asset swap confirmed: {fromAmount} {fromToken} to {toAmount} {toToken}
          </p>
          <Card className="w-full border-primary/20 bg-card/50 backdrop-blur-sm mb-6">
            <CardContent className="p-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">You Paid</span>
                <span className="font-medium">
                  {fromAmount} {fromToken}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">You Received</span>
                <span className="font-medium">
                  {toAmount} {toToken}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Swap Fee</span>
                <span>
                  {swapFee} ({estimatedFeeUSD})
                </span>
              </div>
              <div className="pt-3 border-t border-border">
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                  Verified Compliant Exchange
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
    const fromTokenData = tokens.find((t) => t.symbol === fromToken);
    const toTokenData = tokens.find((t) => t.symbol === toToken);
    const fromValueUSD = fromTokenData
      ? (parseFloat(fromAmount) * fromTokenData.price).toFixed(2)
      : "0";
    const toValueUSD = toTokenData
      ? (parseFloat(toAmount) * toTokenData.price).toFixed(2)
      : "0";

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
            <CardTitle>Confirm Swap</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Swap Preview */}
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <p className="text-sm text-muted-foreground mb-1">You Pay</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">
                    {fromAmount} {fromToken}
                  </span>
                  <span className="text-muted-foreground">${fromValueUSD}</span>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <ArrowDown className="w-5 h-5 text-accent" />
                </div>
              </div>

              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <p className="text-sm text-muted-foreground mb-1">You Receive</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">
                    {toAmount} {toToken}
                  </span>
                  <span className="text-muted-foreground">${toValueUSD}</span>
                </div>
              </div>
            </div>

            {/* Fee Breakdown */}
            <div className="space-y-2 p-4 rounded-lg bg-muted/30 border border-border">
              <h4 className="font-medium mb-2">Fee Breakdown</h4>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Exchange Rate</span>
                <span>
                  1 {fromToken} ≈{" "}
                  {(
                    (fromTokenData?.price || 0) / (toTokenData?.price || 1)
                  ).toFixed(6)}{" "}
                  {toToken}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Swap Fee</span>
                <span>
                  {swapFee} ({estimatedFeeUSD})
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Network Fee</span>
                <span>Included</span>
              </div>
            </div>

            {/* Compliance Check */}
            <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <div className="flex items-center gap-2 text-emerald-400 mb-2">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Compliance Check Passed</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Instant spot exchange. Zero-interest mechanism verified.
              </p>
            </div>

            <Button
              onClick={handleSwap}
              disabled={isProcessing}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing Swap...
                </>
              ) : (
                <>
                  Confirm Swap
                  <ArrowLeftRight className="w-4 h-4 ml-2" />
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
        <Card className="border-accent/20 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowLeftRight className="w-5 h-5 text-accent" />
              Swap Tokens
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* From Token */}
            <div className="space-y-2">
              <Label>From</Label>
              <div className="space-y-2">
                <Select value={fromToken} onValueChange={setFromToken}>
                  <SelectTrigger className="bg-input border-primary/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {tokens
                      .filter((t) => t.symbol !== toToken)
                      .map((token) => (
                        <SelectItem key={token.symbol} value={token.symbol}>
                          {token.name} ({token.symbol})
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={fromAmount}
                  onChange={(e) => handleFromAmountChange(e.target.value)}
                  className="bg-input border-primary/20"
                />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Available:{" "}
                    {tokens.find((t) => t.symbol === fromToken)?.balance}{" "}
                    {fromToken}
                  </span>
                  <button
                    onClick={() => {
                      const token = tokens.find((t) => t.symbol === fromToken);
                      if (token)
                        handleFromAmountChange(token.balance.replace(",", ""));
                    }}
                    className="text-primary hover:underline"
                  >
                    Max
                  </button>
                </div>
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center -my-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleSwapTokens}
                className="rounded-full border-primary/20 hover:bg-primary/10"
              >
                <ArrowLeftRight className="w-4 h-4 text-primary" />
              </Button>
            </div>

            {/* To Token */}
            <div className="space-y-2">
              <Label>To</Label>
              <div className="space-y-2">
                <Select value={toToken} onValueChange={setToToken}>
                  <SelectTrigger className="bg-input border-primary/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {tokens
                      .filter((t) => t.symbol !== fromToken)
                      .map((token) => (
                        <SelectItem key={token.symbol} value={token.symbol}>
                          {token.name} ({token.symbol})
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={toAmount}
                  readOnly
                  className="bg-input border-primary/20 text-muted-foreground"
                />
                <p className="text-sm text-muted-foreground">
                  Estimated amount you'll receive
                </p>
              </div>
            </div>

            {/* Rate Info */}
            {fromAmount && toAmount && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="p-4 rounded-lg bg-muted/50 border border-border space-y-2"
              >
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Rate</span>
                  <span>
                    1 {fromToken} ≈{" "}
                    {(parseFloat(toAmount) / parseFloat(fromAmount)).toFixed(6)}{" "}
                    {toToken}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Fee</span>
                  <span>
                    {swapFee} ({estimatedFeeUSD})
                  </span>
                </div>
              </motion.div>
            )}

            <Button
              onClick={handleConfirm}
              disabled={!fromAmount || parseFloat(fromAmount) <= 0}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Review Swap
              <ArrowLeftRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
