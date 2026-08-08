export type Faq = {
  question: string;
  answer: string;
};

export type LandingSection = {
  heading: string;
  body: string;
  bullets?: string[];
};

export type LandingPageData = {
  path: string;
  title: string;
  description: string;
  keywords: string[];
  h1: string;
  intro: string;
  sections: LandingSection[];
  faqs: Faq[];
  related: { label: string; href: string }[];
};

export const homeFaqs: Faq[] = [
  {
    question: "Does ScreenFlow work on M1/M2/M3 Macs?",
    answer:
      "Yes, ScreenFlow is natively compiled for Apple Silicon, ensuring maximum performance and minimal battery usage during recording.",
  },
  {
    question: "Is my cloud storage really unlimited on the Team plan?",
    answer:
      "Absolutely. We don't cap your storage or limit your video retention. Fair use policies apply to prevent automated abuse, but for normal team operations, it's unlimited.",
  },
  {
    question: "How does the AI silence removal work?",
    answer:
      "Our local AI models analyze the audio track in real-time as you record. Once you finish, click 'Polish' to automatically trim dead air, filler words (um, uh), and excessive pauses — without uploading to the cloud first.",
  },
  {
    question: "Can I record system audio?",
    answer:
      "Yes, ScreenFlow includes a built-in virtual audio driver that captures system audio, microphone, or both simultaneously with perfect sync.",
  },
  {
    question: "What formats can I export to?",
    answer:
      "You can instantly share via a cloud link, or export locally as MP4 (H.264/H.265), WebM, or high-quality GIF.",
  },
  {
    question: "Is there a free trial for paid plans?",
    answer:
      "Yes — every plan starts with a 14-day free trial with no credit card required. You only pay if you decide to continue.",
  },
];

export const landingPages: LandingPageData[] = [
  {
    path: "/screen-recorder",
    title: "Free Screen Recorder — Record Your Screen Online | ScreenFlow",
    description:
      "ScreenFlow is a free screen recorder that works online. Record your screen, webcam, and audio in Full HD, edit your video, and share a link — no download, no watermark.",
    keywords: [
      "free screen recorder",
      "online screen recorder",
      "record screen",
      "screen capture",
    ],
    h1: "The best free screen recorder for Windows, Mac & Linux",
    intro:
      "ScreenFlow is a free screen recorder that runs entirely in your browser. Capture your screen, webcam, and system audio in crisp Full HD — then edit, trim, and share a link. No downloads, no watermarks, no credit card required.",
    sections: [
      {
        heading: "What can you record?",
        body: "ScreenFlow records whatever is on your screen — an app, a tab, or your whole monitor — and combines it with your webcam and microphone in perfect sync.",
        bullets: [
          "Screen + webcam in one frame (picture-in-picture)",
          "System audio and microphone simultaneously",
          "Full monitor, a single app window, or a browser tab",
          "4K resolution at 60fps for sharp, smooth playback",
        ],
      },
      {
        heading: "Why use an online screen recorder?",
        body: "Built-in tools like Snipping Tool or QuickTime are limited, and desktop apps often watermark free recordings. A browser-based recorder works everywhere, updates itself, and never leaves you hunting for an installer.",
        bullets: [
          "No software to download or install",
          "Works identically on Windows, macOS, and Linux",
          "Recordings save straight to the cloud",
          "Share instantly with a link instead of huge files",
        ],
      },
      {
        heading: "Record your first video in three steps",
        body: "Open the ScreenFlow app, choose what to capture, and hit record. When you stop, your video is ready to trim, polish, and share.",
        bullets: [
          "1. Open the ScreenFlow app and pick your capture area",
          "2. Choose screen, webcam, and audio sources",
          "3. Hit record — then edit, trim, and share a link",
        ],
      },
      {
        heading: "Free doesn't mean limited",
        body: "The free plan includes unlimited recording time, 4K at 60fps, no watermarks, and basic editing. If you ever need AI silence removal or unlimited cloud storage, Pro and Team plans start at $12/month.",
      },
    ],
    faqs: [
      {
        question: "Is ScreenFlow really free?",
        answer:
          "Yes. The free plan includes unlimited recording time, 4K at 60fps, no watermarks, and cloud sharing links. There's no credit card required to start.",
      },
      {
        question: "Do I need to download anything?",
        answer:
          "No. ScreenFlow works directly in your browser on Windows, Mac, and Linux. Your recordings are processed in the cloud, so nothing is installed on your machine.",
      },
      {
        question: "Can I record my screen with audio?",
        answer:
          "Yes. ScreenFlow captures system audio, your microphone, or both at the same time — with perfect sync between video and sound.",
      },
    ],
    related: [
      { label: "Screen recording software", href: "/screen-recording-software" },
      { label: "How to record your screen", href: "/how-to-record-your-screen" },
      { label: "Best free screen recorders", href: "/best-free-screen-recorders" },
    ],
  },
  {
    path: "/screen-recording-software",
    title: "Screen Recording Software for Windows, Mac & Linux | ScreenFlow",
    description:
      "Compare the best screen recording software. ScreenFlow runs in your browser on Windows, Mac, and Linux — record, edit, and share without installs.",
    keywords: [
      "screen recording software",
      "screen capture software",
      "best screen recorder",
      "video recording software",
    ],
    h1: "Screen recording software that works on every device",
    intro:
      "Good screen recording software should get out of your way: capture in seconds, edit without a steep learning curve, and share without emailing giant files. ScreenFlow does all three from any browser.",
    sections: [
      {
        heading: "What to look for in screen recording software",
        body: "The right tool balances capture quality, ease of use, and editing power. Most free options cut corners somewhere — a watermark, a time limit, or a clunky editor.",
        bullets: [
          "Native quality — 4K and 60fps without CPU meltdown",
          "Screen, webcam, and system audio at once",
          "Built-in editing: trim, annotations, transitions",
          "Instant sharing via cloud link",
          "No watermarks on the free plan",
        ],
      },
      {
        heading: "Desktop apps vs. browser-based recorders",
        body: "Desktop apps like OBS are powerful but have a learning curve and must be installed on every machine. Browser-based recorders work anywhere, stay updated automatically, and store your videos in the cloud.",
      },
      {
        heading: "System requirements",
        body: "Because ScreenFlow runs in the browser, the bar is low: any modern browser on Windows 10+, macOS, or Linux. For 4K recording, we recommend at least 8GB of RAM.",
        bullets: [
          "Windows 10/11, macOS, Linux, or ChromeOS",
          "Chrome, Edge, Firefox, or Safari (latest versions)",
          "Works on Intel and Apple Silicon Macs",
          "8GB RAM recommended for 4K recording",
        ],
      },
      {
        heading: "Who uses ScreenFlow",
        body: "Educators record lectures and walkthroughs, developers capture bug reports and demos, marketers build product tours, and support teams document issues — all with the same simple workflow.",
      },
    ],
    faqs: [
      {
        question: "Does ScreenFlow work on Windows 11?",
        answer:
          "Yes. ScreenFlow runs in the browser, so it works on Windows 10 and 11, macOS, Linux, and Chromebooks — no installation required.",
      },
      {
        question: "Does it work on Apple Silicon Macs?",
        answer:
          "Yes. Because it's browser-based, ScreenFlow runs natively on M1, M2, and M3 Macs with full performance.",
      },
      {
        question: "Do I need powerful hardware to record 4K?",
        answer:
          "No. ScreenFlow encodes in the cloud, so even a modest laptop can record 4K at 60fps without overheating or dropping frames.",
      },
    ],
    related: [
      { label: "Free screen recorder", href: "/screen-recorder" },
      { label: "How to record your screen", href: "/how-to-record-your-screen" },
      { label: "Record gameplay", href: "/record-gameplay" },
    ],
  },
  {
    path: "/how-to-record-your-screen",
    title: "How to Record Your Screen on Windows, Mac & Chromebook | ScreenFlow",
    description:
      "Step-by-step guide to recording your screen on Windows, Mac, and Chromebook. Capture your screen, webcam, and audio free — no watermark, no installs.",
    keywords: [
      "how to record your screen",
      "record screen windows",
      "record screen mac",
      "screen recording tutorial",
    ],
    h1: "How to record your screen (Windows, Mac & Chromebook)",
    intro:
      "Whether you're making a tutorial, recording a bug report, or capturing a meeting, recording your screen is easier than you think. Here's the exact workflow — plus the built-in tools on each platform and why an online recorder is usually better.",
    sections: [
      {
        heading: "The universal 3-step workflow",
        body: "Every approach follows the same shape: pick what to capture, start recording, then save and share.",
        bullets: [
          "1. Choose your capture area — full screen, a window, or a tab",
          "2. Record screen, webcam, and audio as needed",
          "3. Stop, review, trim, and share or export as MP4",
        ],
      },
      {
        heading: "Recording on Windows",
        body: "Windows 10 and 11 include Xbox Game Bar (Win + G), but it only captures game windows and has limited editing. For professional-looking recordings with webcam, system audio, and editing, an online recorder like ScreenFlow is the faster path.",
      },
      {
        heading: "Recording on Mac",
        body: "macOS has QuickTime (File > New Screen Recording) and the Command + Shift + 5 shortcut. They capture the screen well but record only internal audio in recent macOS versions and offer no editing. ScreenFlow adds webcam overlay, mic + system audio, and a full editor.",
      },
      {
        heading: "Recording on Chromebook",
        body: "Chromebooks have a basic built-in screen recorder in the quick settings, but it lacks webcam capture and editing. ScreenFlow runs in Chrome, so it works on any Chromebook with the same features as every other platform.",
      },
      {
        heading: "Tips for higher-quality recordings",
        body: "A little preparation goes a long way. Close notifications, clear your desktop, record at the resolution you'll publish, and use a quiet mic. ScreenFlow's AI polish can also remove silences and filler words after the fact.",
      },
    ],
    faqs: [
      {
        question: "How do I record my screen with audio?",
        answer:
          "Open ScreenFlow, select 'Screen' and 'Microphone' (and system audio if needed), then hit record. Both audio tracks are captured in sync with the video.",
      },
      {
        question: "How do I record internal or system audio?",
        answer:
          "ScreenFlow captures system audio automatically — great for recording videos, music, or games. If your OS blocks it, the microphone track still captures your commentary.",
      },
      {
        question: "What's the best format for screen recordings?",
        answer:
          "MP4 (H.264 or H.265) is the most compatible format for sharing and uploading. ScreenFlow exports MP4, WebM, and GIF.",
      },
    ],
    related: [
      { label: "Free screen recorder", href: "/screen-recorder" },
      { label: "Record a Zoom meeting", href: "/record-zoom-meetings" },
      { label: "Screen recording software", href: "/screen-recording-software" },
    ],
  },
  {
    path: "/record-zoom-meetings",
    title: "How to Record a Zoom Meeting (Free, No Watermark) | ScreenFlow",
    description:
      "Record your Zoom meetings and webinars free with ScreenFlow. Capture video, audio, and shared screens — no watermark, no time limits, no installs.",
    keywords: [
      "record zoom meeting",
      "record zoom call",
      "zoom recorder",
      "record webinar",
    ],
    h1: "How to record a Zoom meeting for free",
    intro:
      "Recording a Zoom meeting is useful for notes, training, onboarding, or sharing with teammates who couldn't attend. Here's how to record Zoom calls free — including when you're not the host.",
    sections: [
      {
        heading: "Option 1: Record with ScreenFlow (free, always available)",
        body: "ScreenFlow records whatever is on your screen, including the Zoom window, along with meeting audio. It works whether or not the host has enabled Zoom's own recording — and it never adds a watermark.",
        bullets: [
          "Capture the Zoom window, gallery view, or shared screen",
          "Record meeting audio and your own commentary",
          "Works whether or not Zoom cloud recording is enabled",
          "Save or share instantly via link",
        ],
      },
      {
        heading: "Option 2: Zoom's built-in recording",
        body: "Hosts can record locally or to the cloud (with a paid plan). Local recordings save to your computer; cloud recordings live in Zoom and must be enabled by the account admin. Recordings may also be blocked if the host has disabled recording.",
      },
      {
        heading: "Can you record a meeting you're not hosting?",
        body: "Zoom only allows recording if the host permits it. A screen recorder like ScreenFlow captures the video shown on your screen and the audio you hear — which many people use to keep a personal copy of meetings they're allowed to attend.",
      },
      {
        heading: "After the meeting",
        body: "Trim the start and end, cut out silences, and add captions or annotations. With ScreenFlow's AI polish you can remove dead air automatically, then share the final video with a link.",
      },
    ],
    faqs: [
      {
        question: "Can I record a Zoom meeting without the host's permission?",
        answer:
          "Zoom's own recording requires host permission. Recording the meeting as shown on your screen with a tool like ScreenFlow is how most people capture a personal copy for notes.",
      },
      {
        question: "Where are my Zoom recordings saved?",
        answer:
          "Zoom's local recordings save to your computer's Documents folder. ScreenFlow recordings are stored in the cloud and ready to share with a link immediately.",
      },
      {
        question: "Does recording a meeting affect my microphone audio?",
        answer:
          "No. ScreenFlow captures the meeting audio and your microphone as separate tracks, so both stay clean and in sync.",
      },
    ],
    related: [
      { label: "How to record your screen", href: "/how-to-record-your-screen" },
      { label: "Free screen recorder", href: "/screen-recorder" },
      { label: "Record gameplay", href: "/record-gameplay" },
    ],
  },
  {
    path: "/record-gameplay",
    title: "How to Record Gameplay & Capture Game Clips | ScreenFlow",
    description:
      "Record high-quality gameplay with ScreenFlow. Capture game clips, commentary audio, and facecam in 4K at 60fps — free, no watermark, no installs.",
    keywords: [
      "record gameplay",
      "game capture",
      "record games",
      "gameplay recorder",
    ],
    h1: "How to record gameplay like a pro",
    intro:
      "Streaming and clip culture has made game capture essential. ScreenFlow lets you record clean gameplay with commentary and facecam in 4K at 60fps — no heavy desktop software, no watermark.",
    sections: [
      {
        heading: "Set up your capture",
        body: "Open ScreenFlow, select the game window or your full screen, and add your microphone for commentary. Add your webcam to overlay a facecam so viewers see your reactions.",
      },
      {
        heading: "Record while you play",
        body: "ScreenFlow captures the game at 60fps without taxing your GPU, so frame rates stay smooth. You can start and stop clips between sessions, and system audio keeps game sound and voice chat in sync.",
      },
      {
        heading: "Edit your clips",
        body: "Trim intros and deaths, cut loading screens, and add captions or annotations. The AI polish tool removes silences and filler words from your commentary automatically.",
      },
      {
        heading: "Share or export",
        body: "Export your best moments as MP4 (H.264/H.265) for YouTube or Twitch, or share a cloud link with your squad. High-quality GIF export is great for Discord and short clips.",
      },
    ],
    faqs: [
      {
        question: "Will recording slow down my game?",
        answer:
          "No. ScreenFlow encodes in the cloud, so recording doesn't compete for your CPU or GPU. Most players see zero impact on frame rate.",
      },
      {
        question: "Can I put my webcam over the gameplay?",
        answer:
          "Yes. ScreenFlow combines the game capture and your webcam into one frame with picture-in-picture, fully configurable during editing.",
      },
      {
        question: "Can I record voice chat with friends?",
        answer:
          "Yes. ScreenFlow captures your microphone and system audio, so game audio and voice chat are recorded together in sync.",
      },
    ],
    related: [
      { label: "Screen recording software", href: "/screen-recording-software" },
      { label: "Free screen recorder", href: "/screen-recorder" },
      { label: "Record a Zoom meeting", href: "/record-zoom-meetings" },
    ],
  },
  {
    path: "/best-free-screen-recorders",
    title: "Best Free Screen Recorders in 2026 (Compared) | ScreenFlow",
    description:
      "We compared the best free screen recorders of 2026. See how ScreenFlow stacks up against OBS, Loom, and the built-in options — and find the right one for you.",
    keywords: [
      "best screen recorder",
      "best free screen recorder",
      "screen recorder comparison",
      "free screen recording software",
    ],
    h1: "The best free screen recorders of 2026, compared",
    intro:
      "There are more free screen recorders than ever — but they're not all equal. We compared the most popular options across quality, ease of use, watermarks, and editing so you can pick the right one.",
    sections: [
      {
        heading: "How we tested",
        body: "We evaluated each recorder on capture quality (up to 4K/60fps), whether the free tier watermarks or limits recording time, how easy it is to edit, and how simple sharing is.",
        bullets: [
          "Capture quality at 1080p and 4K",
          "Watermarks or time limits on free plans",
          "Built-in editing and annotations",
          "Ease of sharing — links vs. large files",
        ],
      },
      {
        heading: "The shortlist",
        body: "Here's how the most common options stack up.",
        bullets: [
          "OBS Studio — powerful and free, but a steep learning curve and no editing or easy sharing",
          "Loom — easy sharing, but free tier caps length and adds a watermark",
          "Windows Xbox Game Bar / macOS QuickTime — built-in and free, but no webcam overlay or editing",
          "ScreenFlow — free with no watermark, unlimited recording time, editing, and cloud links",
        ],
      },
      {
        heading: "When to choose which",
        body: "Choose OBS if you're a streamer who wants total control. Choose a built-in tool for a quick one-off clip. For tutorials, demos, and team communication — where editing and sharing matter most — ScreenFlow is the best free balance.",
      },
      {
        heading: "Why ScreenFlow stands out",
        body: "It's the only option on this list that combines no watermarks, unlimited recording time, an editor, and instant sharing on the free plan — all from the browser.",
      },
    ],
    faqs: [
      {
        question: "What's the best free screen recorder for beginners?",
        answer:
          "ScreenFlow. It has the least setup, no watermark, unlimited recording time, and an intuitive editor — everything a beginner needs without a learning curve.",
      },
      {
        question: "Is OBS Studio still free?",
        answer:
          "Yes, OBS is open source and free. It's excellent for streaming, but it requires more configuration and offers no built-in editing or cloud sharing.",
      },
      {
        question: "Do free screen recorders add watermarks?",
        answer:
          "Many do. ScreenFlow's free plan records without a watermark and doesn't limit recording time.",
      },
    ],
    related: [
      { label: "Free screen recorder", href: "/screen-recorder" },
      { label: "Screen recording software", href: "/screen-recording-software" },
      { label: "How to record your screen", href: "/how-to-record-your-screen" },
    ],
  },
];
