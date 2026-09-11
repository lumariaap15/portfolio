export const en = {
  nav: {
    services: "Services",
    process: "Process",
    work: "Work",
    about: "About",
    faq: "FAQ",
    contact: "Contact",
  },
  cta: {
    bookCall: "Book a free 20-minute call →",
    bookCallShort: "Book a call →",
    sendDetails: "Send project details →",
    cv: "CV",
  },
  hero: {
    headline: "More technology isn't better technology.",
    sub: "Software, automations, integrations and AI solutions that really matter for your business.",
  },
  philosophy: {
    title: "You don't need custom software. Unless you actually do.",
    body: [
      "I help you understand what your business really needs, then improve, integrate or build the right solution.",
      "Sometimes that means making better use of what you already have. Sometimes it means connecting systems or automating repetitive work. And when something new is the right answer, I can build it.",
    ],
  },
  services: {
    title: "Three ways I can help.",
    items: [
      {
        number: "01",
        category: "custom" as const,
        label: "Custom Software & Product Development",
        headline: "Build what matters.",
        body: [
          "Have an idea, an MVP to build, or a business need that existing tools can't solve? I can take it from early definition to working software in production.",
          "Customer portals, SaaS products, operational platforms, dashboards and MVPs built around real business needs.",
        ],
        tags: ["Custom software", "SaaS", "Portals", "Dashboards", "MVPs"],
      },
      {
        number: "02",
        category: "integration" as const,
        label: "API & Systems Integrations",
        headline: "Make what you already have work together.",
        body: [
          "Your tools shouldn't create more work. I connect your systems through reliable APIs and integrations so data moves where it needs to, without replacing software that's already doing its job.",
        ],
        tags: ["APIs", "Webhooks", "Payments", "Authentication", "Data sync", "Third-party platforms"],
      },
      {
        number: "03",
        category: "modernization" as const,
        label: "Product Modernization & Rescue",
        headline: "Improve before you rebuild.",
        body: [
          "Existing software doesn't always need to start over. I improve products that have become slow, fragile, difficult to maintain or aren't ready for their next stage.",
          "I can also help turn a quickly built or AI-generated MVP into software that's ready for real users.",
        ],
        tags: ["Performance", "Architecture", "UX", "Accessibility", "Testing", "Observability", "Production readiness"],
      },
    ],
  },
  ai: {
    title: "AI when it matters.",
    body: [
      "Not every product needs AI. When there's a real use case, I integrate it where it can make the product or the business meaningfully better.",
      "Intelligent search, document processing, assistants, structured extraction and AI-powered workflows.",
    ],
    highlight: "The goal isn't to add AI. It's to solve the problem better.",
  },
  process: {
    title: "From problem to production.",
    subtitle: "Important decisions happen before expensive code does.",
    steps: [
      {
        number: "01",
        label: "Talk",
        title: "Understand the problem.",
        body: "A free 20-minute call to talk about your business, your idea or product, what's happening today and what you're trying to achieve.",
        tags: ["Business context", "Current tools", "Goals", "Constraints"],
        cta: true,
      },
      {
        number: "02",
        label: "Define",
        title: "Find the simplest path.",
        body: "I look at the problem and what already exists before deciding what should be improved, integrated, automated or built.",
        tags: ["Problem brief", "Current workflow", "Solution options", "Scope", "Estimate"],
        cta: false,
      },
      {
        number: "03",
        label: "Design",
        title: "Make the important decisions early.",
        body: "We define how the solution should work before committing to weeks of development.",
        tags: ["User flows", "Architecture", "Data model", "API contracts", "Milestones"],
        cta: false,
      },
      {
        number: "04",
        label: "Build",
        title: "Build in visible steps.",
        body: "Development happens in small milestones, with working software and regular feedback throughout the project.",
        tags: ["Working releases", "Automated tests", "Code review", "Documentation"],
        cta: false,
      },
      {
        number: "05",
        label: "Launch",
        title: "Production is part of the build.",
        body: "The work isn't finished when the software works locally. I prepare it to be reliable, observable and maintainable in production.",
        tags: ["Deployment", "Monitoring", "Error tracking", "Performance", "Handoff"],
        cta: false,
      },
    ],
  },
  work: {
    title: "Selected work.",
    intro: "Real problems. Engineering decisions. Measurable improvements.",
    problemLabel: "Problem",
    approachLabel: "Approach",
    outcomeLabel: "Outcome",
    categoryLabels: {
      custom: "Custom & Product",
      integration: "Integration",
      modernization: "Modernization",
    },
  },
  whyMe: {
    title: "Work with the person building it.",
    intro: "No layers between your business and the engineering decisions. You work directly with me from the first conversation through architecture, development and launch.",
    benefits: [
      { title: "Direct communication", body: "Less gets lost between the problem and the implementation." },
      { title: "Technical ownership", body: "I understand the context behind the code, not just the next ticket." },
      { title: "Small by design", body: "When a project needs specialized expertise, I collaborate with trusted professionals without adding unnecessary overhead." },
    ],
  },
  about: {
    title: "Hi, I'm Luisa.",
    body: [
      "I'm a full-stack software engineer with 5+ years of experience building, integrating and improving production software.",
      "I've worked across frontend, backend, APIs and cloud infrastructure, with a strong focus on product quality and the people using what I build.",
      "Today I work directly with businesses and product teams that need thoughtful engineering without the overhead of a large development team.",
    ],
    location: "Based in Argentina. Working worldwide.",
  },
  faq: {
    title: "Frequently asked questions.",
    items: [
      {
        q: "Do I need to know exactly what I need?",
        a: "No. Start with the problem. I'll help determine whether it makes more sense to improve, integrate, automate or build.",
      },
      {
        q: "I have an idea or MVP. Can you help me build it?",
        a: "Yes. I can help define the scope and technical approach, then take it through development and production.",
      },
      {
        q: "Do you only build custom software?",
        a: "No. If an existing tool, integration or smaller change solves the problem better, that's what I'll recommend.",
      },
      {
        q: "Can you work with our existing software?",
        a: "Yes. Integrating, extending and modernizing existing systems is a core part of my work.",
      },
      {
        q: "Can you work with AI-built software?",
        a: "Yes. I can review, stabilize and prepare rapidly built products for real production use.",
      },
      {
        q: "Can you integrate AI into our product?",
        a: "Yes, when there's a useful case for it. AI should improve the product, not simply be added to it.",
      },
      {
        q: "What happens after the free call?",
        a: "If there's a good fit, I'll recommend the next step. That may be a proposal or a short discovery phase for more complex projects.",
      },
      {
        q: "Do you work internationally?",
        a: "Yes. I work remotely in English and Spanish.",
      },
    ],
  },
  finalCta: {
    title: "Let's figure out what actually makes sense.",
    body: "Bring your business problem, an idea you'd like to build, or software that isn't working the way it should.",
    noSolutionLine: "You don't need to know the technical solution yet.",
    note: "No commitment. Just a conversation about what makes sense.",
  },
  footer: {
    rights: "All rights reserved",
  },
  contactForm: {
    title: "Send project details",
    name: "Name",
    email: "Email",
    company: "Company",
    companyOptional: "Company (optional)",
    project: "What are you trying to solve/build?",
    website: "Website (optional)",
    submit: "Send →",
    sending: "Sending…",
    success: "Thanks — I'll get back to you within a couple of days.",
    error: "Something went wrong sending this. Please email me directly instead.",
  },
};

export type Messages = typeof en;
export default en;
