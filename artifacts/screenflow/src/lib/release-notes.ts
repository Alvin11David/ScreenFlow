export type ReleaseNote = {
  version: string;
  date: string;
  title: string;
  features: string[];
  improvements: string[];
  fixes: string[];
};

export const releaseNotes: ReleaseNote[] = [
  {
    version: "1.4.0",
    date: "August 2026",
    title: "The Flow Update",
    features: [
      "AI Polish — removes silences and filler words (um, uh) in one click",
      "4K recording at 60fps",
      "Webcam picture-in-picture with drag-to-resize and reposition",
    ],
    improvements: [
      "Faster editor scrubbing on long recordings",
      "New annotation shapes: arrows and highlights",
      "Smoother transitions between tabs during capture",
    ],
    fixes: [
      "Fixed system-audio sync issues on Windows",
      "Fixed color banding in GIF export",
      "Fixed microphone echo on Apple Silicon Macs",
    ],
  },
  {
    version: "1.3.0",
    date: "June 2026",
    title: "Team Workspace",
    features: [
      "Team plans with a shared workspace and unlimited cloud storage",
      "Export presets for YouTube, Twitter, and Discord",
      "Shared recording libraries for your whole team",
    ],
    improvements: [
      "Reduced upload time with chunked uploads",
      "Better organization with folders and tags",
    ],
    fixes: [
      "Fixed login persistence across sessions",
      "Fixed duplicate recordings appearing in the library",
    ],
  },
  {
    version: "1.2.0",
    date: "April 2026",
    title: "Share Anything",
    features: [
      "Instant cloud sharing links",
      "WebM and high-quality GIF export",
      "Virtual audio driver for system audio capture",
    ],
    improvements: [
      "Smaller exported file sizes without quality loss",
      "Faster preview generation",
    ],
    fixes: [
      "Fixed video/audio drift in long recordings",
      "Fixed expired share links showing incorrectly",
    ],
  },
  {
    version: "1.1.0",
    date: "February 2026",
    title: "The Editor",
    features: [
      "Trim, split, and reorder clips",
      "Text overlays and captions",
      "Crossfade transitions",
    ],
    improvements: [
      "Keyboard shortcuts for common editing tasks",
    ],
    fixes: [
      "Improved autosave reliability",
      "Fixed undo history after trimming",
    ],
  },
  {
    version: "1.0.0",
    date: "January 2026",
    title: "Launch",
    features: [
      "Screen, webcam, and audio recording",
      "Free plan with no watermark and unlimited recording time",
      "Cloud storage and sharing",
      "MP4 (H.264/H.265) export",
    ],
    improvements: [],
    fixes: [],
  },
];
