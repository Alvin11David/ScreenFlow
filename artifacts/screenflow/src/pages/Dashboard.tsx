import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { Link, useLocation } from "wouter";
import { LogOut, Video, Plus, ExternalLink, Trash2 } from "lucide-react";

type Video = {
  id: number;
  title: string;
  description: string | null;
  status: string;
  visibility: string;
  duration: number | null;
  createdAt: string;
};

export default function Dashboard() {
  const { user, logout, loading } = useAuth();
  const [, navigate] = useLocation();
  const [videos, setVideos] = useState<Video[]>([]);
  const [videosLoading, setVideosLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [creating, setCreating] = useState(false);

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

  async function createVideo() {
    if (!title.trim()) return;
    setCreating(true);
    try {
      const res = await fetch("/api/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title: title.trim() }),
      });
      if (!res.ok) throw new Error("Failed to create");
      const data = await res.json();
      setVideos((prev) => [data.video, ...prev]);
      setTitle("");
    } catch (e) {
      console.error(e);
    } finally {
      setCreating(false);
    }
  }

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
            <span className="text-sm text-muted-foreground">Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{user?.name}</span>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="w-4 h-4 mr-2" /> Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1">
            <Input
              placeholder="New video title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && createVideo()}
            />
          </div>
          <Button onClick={createVideo} disabled={creating || !title.trim()}>
            <Plus className="w-4 h-4 mr-2" /> Create
          </Button>
        </div>

        {videos.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Video className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No videos yet</h3>
              <p className="text-muted-foreground text-sm mb-6">Create your first video to get started.</p>
              <p className="text-xs text-muted-foreground">Use the ScreenFlow desktop app to record, then it will appear here.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {videos.map((video) => (
              <Card key={video.id} className="hover:border-primary/30 transition-colors">
                <CardContent className="flex items-center gap-4 py-4">
                  <div className="w-16 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <Video className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{video.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {video.duration ? `${Math.round(video.duration)}s` : "—"} · {new Date(video.createdAt).toLocaleDateString()}
                    </p>
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
