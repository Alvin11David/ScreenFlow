import { motion } from "framer-motion";
import { useParams, Link } from "wouter";
import { Play, Clock, User, Film, ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/sections/Navbar";
import { Footer } from "@/sections/Footer";
import { useGetSharedVideo } from "@workspace/api-client-react";

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function VideoPlayer() {
  const { token } = useParams<{ token: string }>();
  const { data, isLoading, error } = useGetSharedVideo(token!);

  const video = data?.video;
  const owner = data?.owner;

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background relative overflow-x-hidden flex items-center justify-center">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading video...</span>
        </div>
      </main>
    );
  }

  if (error || !video) {
    return (
      <main className="min-h-screen bg-background relative overflow-x-hidden">
        <Navbar />
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-4 max-w-md text-center">
            <div className="w-16 h-16 rounded-full bg-destructive/10 border border-destructive/20 flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
            <h1 className="text-2xl font-bold mb-3">Video not found</h1>
            <p className="text-muted-foreground mb-8">
              This shared video may have been removed or the link has expired.
            </p>
            <Link href="/">
              <Button className="rounded-full px-6">Back to Home</Button>
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background relative overflow-x-hidden selection:bg-primary/30">
      <div className="grain-overlay dark:opacity-[0.028] opacity-[0.018]" aria-hidden="true" />
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute rounded-full opacity-40 dark:opacity-100"
          style={{
            top: "-10%",
            left: "-5%",
            width: "50vw",
            height: "50vw",
            background: "radial-gradient(circle, hsl(263 70% 60% / 0.18) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      <div className="relative z-10">
        <Navbar />

        <section className="pt-24 pb-20 md:pt-32 md:pb-32">
          <div className="container mx-auto px-4 max-w-5xl">
            <Link href="/">
              <Button variant="ghost" className="mb-6 gap-2 text-muted-foreground rounded-full">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="aspect-video bg-muted rounded-2xl overflow-hidden border border-border mb-8 relative group">
                {video.fileUrl ? (
                  <video
                    src={video.fileUrl}
                    poster={video.thumbnailUrl ?? undefined}
                    controls
                    className="w-full h-full object-contain bg-black"
                    controlsList="nodownload"
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <div className="text-center">
                      <Film className="w-16 h-16 text-muted-foreground/40 mx-auto mb-4" />
                      <p className="text-muted-foreground">Video file not available</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2 truncate">
                    {video.title}
                  </h1>
                  {video.description && (
                    <p className="text-muted-foreground mb-4">{video.description}</p>
                  )}

                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    {owner && (
                      <div className="flex items-center gap-1.5">
                        <User className="w-4 h-4" />
                        <span>{owner.name}</span>
                      </div>
                    )}
                    {video.duration != null && (
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        <span>{formatDuration(video.duration)}</span>
                      </div>
                    )}
                    {video.resolution && (
                      <div className="flex items-center gap-1.5">
                        <Play className="w-4 h-4" />
                        <span>{video.resolution}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
