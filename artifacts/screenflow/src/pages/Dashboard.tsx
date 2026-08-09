import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { Link, useLocation } from "wouter";
import { LogOut, Video, ExternalLink, Trash2, Clock, MonitorPlay, Database } from "lucide-react";
import { APP_URL } from "@/lib/utils";

type Video = {
  id: number;
  title: string;
  description: string | null;
  fileUrl: string | null;
  thumbnailUrl: string | null;
  duration: number | null;
  resolution: string | null;
  fileSize: number | null;
  status: string;
  visibility: string;
  createdAt: string;
};

function formatDuration(seconds: number | null): string {
  if (seconds == null) return "—";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function formatFileSize(bytes: number | null): string {
  if (bytes == null) return "—";
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let value = bytes / 1024;
  let i = 0;
  while (value >= 1024 && i < units.length - 1) {
    value /= 1024;
    i++;
  }
  return `${value.toFixed(1)} ${units[i]}`;
}

export default function Dashboard() {
  const { user, logout, loading } = useAuth();
  const [, navigate] = useLocation();
  const [videos, setVideos] = useState<Video[]>([]);
  const [videosLoading, setVideosLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
      return;
    }
    if (user) {
      fetch("/api/videos", { credentials: "include" })
        .then((res) => (res.ok ? res.json() : { videos: [] }))
        .then((data) => setVideos(data.videos ?? []))
        .finally(() => setVideosLoading(false));
    }
  }, [user, loading]);

  async function deleteVideo(id: number) {
    const res = await fetch(`/api/videos/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) setVideos((prev) => prev.filter((v) => v.id !== id));
  }

  if (loading || videosLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-bold text-foreground">ScreenFlow</Link>
            <nav className="hidden sm:flex items-center gap-4 text-sm">
              <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
              <Link href="/dashboard" className="text-foreground font-medium">Dashboard</Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{user?.name}</span>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="w-4 h-4 mr-2" /> Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">Recording history</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {videos.length === 0
                ? "Recordings you create with the ScreenFlow app appear here."
                : `${videos.length} recording${videos.length === 1 ? "" : "s"}`}
            </p>
          </div>
          <a href={APP_URL} target="_blank" rel="noopener noreferrer">
            <Button className="rounded-full">
              <ExternalLink className="w-4 h-4 mr-2" /> Record a new video
            </Button>
          </a>
        </div>

        {videos.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Video className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No recordings yet</h3>
              <p className="text-muted-foreground text-sm mb-6 max-w-sm text-center">
                Open the ScreenFlow recorder, record your screen, and your recording will be saved here automatically.
              </p>
              <a href={APP_URL} target="_blank" rel="noopener noreferrer">
                <Button className="rounded-full">
                  <ExternalLink className="w-4 h-4 mr-2" /> Open the ScreenFlow recorder
                </Button>
              </a>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {videos.map((video) => (
              <Card key={video.id} className="hover:border-primary/30 transition-colors">
                <CardContent className="flex items-center gap-4 py-4">
                  {video.thumbnailUrl ? (
                    <img
                      src={video.thumbnailUrl}
                      alt=""
                      loading="lazy"
                      className="w-24 h-16 rounded-lg object-cover flex-shrink-0 border border-border"
                    />
                  ) : (
                    <div className="w-24 h-16 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                      <Video className="w-6 h-6 text-muted-foreground" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{video.title}</h4>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {formatDuration(video.duration)}
                      </span>
                      {video.resolution && (
                        <span className="flex items-center gap-1">
                          <MonitorPlay className="w-3.5 h-3.5" />
                          {video.resolution}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Database className="w-3.5 h-3.5" />
                        {formatFileSize(video.fileSize)}
                      </span>
                      <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Badge variant={video.status === "ready" ? "default" : "secondary"}>{video.status}</Badge>
                  <Button variant="ghost" size="icon" onClick={() => deleteVideo(video.id)}>
                    <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
