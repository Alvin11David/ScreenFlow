import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Silk } from "@/components/effects/Silk";
import { ArrowLeft } from "lucide-react";
import { Link, useLocation } from "wouter";

const SILK_COLOR = "#8B5CF6";

export default function Login() {
  const { login } = useAuth();
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      <Silk className="absolute inset-0" color={SILK_COLOR} speed={5} scale={1} noiseIntensity={1.5} rotation={0} />
      <div className="pointer-events-none absolute inset-0 bg-black/40" />
      <Link href="/" className="absolute top-4 left-4 z-20 inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back
      </Link>
      <div className="relative z-10 flex h-full items-center justify-center p-4">
        <Card className="w-full max-w-md border-2 bg-card/80 backdrop-blur-md" style={{ borderColor: SILK_COLOR }}>
        <CardHeader className="text-center">
          <Link href="/" className="text-2xl font-bold text-foreground mb-2 block">ScreenFlow</Link>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">{error}</div>}
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <Input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="flex items-center justify-end">
              <Link href="/forgot-password" className="text-sm text-primary underline underline-offset-4 hover:text-primary/80">Forgot password?</Link>
            </div>
            <Button type="submit" className="w-full" disabled={busy}>{busy ? "Signing in..." : "Sign in"}</Button>
            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/register" className="text-primary underline underline-offset-4 hover:text-primary/80">Sign up</Link>
            </p>
          </form>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
