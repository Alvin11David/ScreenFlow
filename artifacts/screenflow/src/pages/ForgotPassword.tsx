import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Grainient } from "@/components/effects/Grainient";
import { Link, useLocation } from "wouter";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const GRAINIENT_COLORS = {
  color1: "#FF9FFC",
  color2: "#5227FF",
  color3: "#B497CF",
};

export default function ForgotPassword() {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [verified, setVerified] = useState(false);

  async function handleSendCode(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to send code");
      setEmailSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send code");
    } finally {
      setBusy(false);
    }
  }

  async function handleVerifyCode(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/auth/verify-reset-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Invalid code");
      setVerified(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      <Grainient
        className="absolute inset-0"
        color1={GRAINIENT_COLORS.color1}
        color2={GRAINIENT_COLORS.color2}
        color3={GRAINIENT_COLORS.color3}
        timeSpeed={0.25}
        colorBalance={0.0}
        warpStrength={1.0}
        warpFrequency={5.0}
        warpSpeed={2.0}
        warpAmplitude={50.0}
        blendAngle={0.0}
        blendSoftness={0.05}
        rotationAmount={500.0}
        noiseScale={2.0}
        grainAmount={0.1}
        grainScale={2.0}
        grainAnimated={false}
        contrast={1.5}
        gamma={1.0}
        saturation={1.0}
        centerX={0.0}
        centerY={0.0}
        zoom={0.9}
      />
      <div className="pointer-events-none absolute inset-0 bg-black/40" />
      <div className="relative z-10 flex h-full items-center justify-center p-4">
        <Card className="w-full max-w-md border-2 bg-card/80 backdrop-blur-md" style={{ borderColor: GRAINIENT_COLORS.color2 }}>
          <CardHeader className="text-center">
            <Link href="/" className="text-2xl font-bold text-foreground mb-2 block">ScreenFlow</Link>
            <CardTitle>
              {verified ? "Password Reset" : emailSent ? "Enter Code" : "Forgot Password"}
            </CardTitle>
            <CardDescription>
              {verified
                ? "Redirecting you to login..."
                : emailSent
                  ? `Enter the 5-digit code sent to ${email}`
                  : "Enter your email to receive a reset code"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg mb-4">{error}</div>}
            {verified ? (
              <div className="text-center text-sm text-muted-foreground">
                Your code has been verified. Redirecting to login...
              </div>
            ) : emailSent ? (
              <form onSubmit={handleVerifyCode} className="space-y-4">
                <div className="flex flex-col items-center space-y-4">
                  <InputOTP
                    maxLength={5}
                    value={code}
                    onChange={setCode}
                    disabled={busy}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <Button type="submit" className="w-full" disabled={busy || code.length !== 5}>
                  {busy ? "Verifying..." : "Verify Code"}
                </Button>
                <button
                  type="button"
                  className="text-sm text-muted-foreground hover:text-foreground w-full text-center"
                  onClick={() => {
                    setEmailSent(false);
                    setCode("");
                    setError("");
                  }}
                >
                  Didn't receive a code? Resend
                </button>
              </form>
            ) : (
              <form onSubmit={handleSendCode} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={busy}>
                  {busy ? "Sending..." : "Send Reset Code"}
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Remember your password?{" "}
                  <Link href="/login" className="text-primary underline underline-offset-4 hover:text-primary/80">Sign in</Link>
                </p>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
