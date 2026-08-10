export type LegalSection = {
  heading: string;
  body: string;
};

export type LegalPageData = {
  path: string;
  title: string;
  description: string;
  h1: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

export const legalPages: LegalPageData[] = [
  {
    path: "/privacy",
    title: "Privacy Policy — ScreenFlow",
    description:
      "Read the ScreenFlow privacy policy to learn what information we collect, how we use it, and the rights you have over your data.",
    h1: "Privacy Policy",
    updated: "August 1, 2026",
    intro:
      "ScreenFlow Inc. (\"ScreenFlow\", \"we\", \"us\") operates the ScreenFlow screen recording service. This Privacy Policy explains what information we collect when you use our website and services, how we use it, and the choices you have.",
    sections: [
      {
        heading: "Information we collect",
        body: "We collect information you provide directly, such as your name, email address, and password when you create an account. When you use the recorder, we process the recordings you create, along with metadata such as title, duration, and creation date. We also collect limited technical data automatically, including your browser type, device type, IP address, and pages you visit, to keep the service secure and understand how it is used.",
      },
      {
        heading: "How we use your information",
        body: "We use the information we collect to provide, maintain, and improve our services; to process recordings and cloud storage; to communicate with you about your account and service updates; to enforce our Terms of Service; and to comply with legal obligations. Recordings are processed to deliver the service you asked for and are not used for unrelated purposes.",
      },
      {
        heading: "Cookies and tracking",
        body: "We use cookies and similar technologies to keep you signed in, remember preferences, and understand how visitors use our site. You can control cookies through your browser settings, though disabling them may affect some features.",
      },
      {
        heading: "How we share information",
        body: "We do not sell your personal information. We share data only with service providers who help us operate the service (such as cloud hosting and email delivery), when required by law, or to protect the rights and safety of our users and the public. When you share a recording via a link, anyone with that link can view it, so share links carefully.",
      },
      {
        heading: "Data retention",
        body: "We retain your account information for as long as your account is active. Recordings remain available according to your plan's storage terms; when you delete a recording, we remove it from active storage and work to delete backups within a reasonable period. You may request deletion of your account and associated data at any time.",
      },
      {
        heading: "Your rights",
        body: "Depending on where you live, you may have rights to access, correct, export, or delete your personal information, and to object to or restrict certain processing. To exercise any of these rights, contact us at screenflowcom@gmail.com and we will respond within a reasonable time.",
      },
      {
        heading: "Security",
        body: "We use industry-standard measures to protect your data, including encryption in transit and at rest. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
      },
      {
        heading: "Children's privacy",
        body: "Our services are not directed to children under the age of 13, and we do not knowingly collect personal information from them. If you believe a child has provided us personal information, contact us and we will delete it.",
      },
      {
        heading: "International transfers",
        body: "We may process and store data on servers located in countries other than your own. By using the service, you consent to the transfer of your information to these locations.",
      },
      {
        heading: "Changes to this policy",
        body: "We may update this Privacy Policy from time to time. We will post any changes on this page and update the effective date at the top. Material changes will be communicated through the service or by email.",
      },
      {
        heading: "Contact us",
        body: "If you have questions about this Privacy Policy or your data, email us at screenflowcom@gmail.com.",
      },
    ],
  },
  {
    path: "/terms",
    title: "Terms of Service — ScreenFlow",
    description:
      "The ScreenFlow Terms of Service govern your use of the ScreenFlow screen recording website and services.",
    h1: "Terms of Service",
    updated: "August 1, 2026",
    intro:
      "These Terms of Service (\"Terms\") govern your access to and use of the ScreenFlow website and services operated by ScreenFlow Inc. By creating an account or using our services, you agree to these Terms.",
    sections: [
      {
        heading: "Acceptance of terms",
        body: "By accessing or using ScreenFlow, you confirm that you accept these Terms and our Privacy Policy. If you do not agree, please do not use the service. You must be at least 13 years old to use the service, and by using it you confirm you meet this requirement.",
      },
      {
        heading: "Description of service",
        body: "ScreenFlow is an online screen recording service that lets you capture your screen, webcam, and audio; edit recordings; and share them via links or export them as files. The service is provided on an 'as is' and 'as available' basis.",
      },
      {
        heading: "Accounts",
        body: "You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. You must provide accurate information and keep it up to date. Notify us immediately of any unauthorized use of your account.",
      },
      {
        heading: "Acceptable use",
        body: "You agree not to misuse the service, including: recording or sharing content that is illegal, infringing, or harmful; attempting to access systems without authorization; interfering with the operation of the service; using the service to send spam or malware; or attempting to reverse engineer our software.",
      },
      {
        heading: "Subscriptions and billing",
        body: "Free plans are available without payment. Paid plans require a valid payment method and renew automatically until cancelled. Every paid plan starts with a 14-day free trial with no credit card required. Prices are listed on our pricing page and may change with notice. You can cancel anytime, and access continues until the end of the current billing period.",
      },
      {
        heading: "Your content",
        body: "You retain ownership of the recordings and content you create with ScreenFlow. By using the service, you grant us a limited license to host, store, and process your content solely to provide and improve the service. You are responsible for the content you record and share, and you confirm you have the right to record and distribute it.",
      },
      {
        heading: "Cloud storage and fair use",
        body: "Storage limits depend on your plan. The Team plan includes unlimited cloud storage for normal use; fair use policies apply to prevent automated abuse. We may place reasonable limits on excessive usage that impacts service reliability.",
      },
      {
        heading: "Intellectual property",
        body: "The ScreenFlow name, logo, website, and software are owned by ScreenFlow Inc. and are protected by intellectual property laws. Except as expressly permitted, you may not copy, modify, or distribute them.",
      },
      {
        heading: "Third-party links",
        body: "The service may link to third-party websites or services. We are not responsible for the content, policies, or practices of any third party, and your use of third-party services is at your own risk.",
      },
      {
        heading: "Disclaimer of warranties",
        body: "To the maximum extent permitted by law, the service is provided 'as is' without warranties of any kind, whether express or implied, including implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the service will be uninterrupted, secure, or error-free.",
      },
      {
        heading: "Limitation of liability",
        body: "To the maximum extent permitted by law, ScreenFlow shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or for any loss of profits, data, or recordings, arising out of or related to your use of the service. Our total liability shall not exceed the amounts you paid to us in the twelve months preceding the claim.",
      },
      {
        heading: "Termination",
        body: "We may suspend or terminate your access if you violate these Terms. You may stop using the service and delete your account at any time. Sections that by their nature should survive termination will survive, including intellectual property, disclaimers, and limitation of liability.",
      },
      {
        heading: "Changes to these terms",
        body: "We may update these Terms from time to time. We will post any changes on this page. Continued use of the service after changes take effect constitutes acceptance of the revised Terms.",
      },
      {
        heading: "Governing law",
        body: "These Terms are governed by the laws of the jurisdiction in which ScreenFlow Inc. is established, without regard to conflict of law principles.",
      },
      {
        heading: "Contact us",
        body: "If you have questions about these Terms, email us at screenflowcom@gmail.com.",
      },
    ],
  },
];
