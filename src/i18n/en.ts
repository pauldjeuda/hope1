import type { Messages } from "./types";

export const en: Messages = {
  nav: {
    home: "Home",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    contact: "Contact",
    donate: "Donate",
    mainNav: "Main navigation",
    langSwitch: "Switch language",
  },
  navItems: [
    { label: "Home", path: "/" },
    { label: "About", path: "/a-propos" },
    { label: "Actions", path: "/missions" },
    { label: "Contact", path: "/contact" },
  ],
  hero: {
    line: "Humanitarian association in Yaoundé — helping the most vulnerable facing conflict, disasters and disease.",
    donate: "Donate",
    actions: "Our actions",
  },
  philosophy: {
    title: "A bridge to those who need it most",
    titleLines: [
      "A bridge to those",
      "who need it",
      "most",
    ],
    p1: "HOPE Bridge for the Needy is a non-profit association. We relieve the suffering of populations affected by conflict, natural disasters and disease.",
    p2: "We strengthen community resilience, primary health, nutrition and the protection of women and children — with dignity, on the ground.",
    cta: "Who we are",
    note: "Helping people,\nwith dignity.",
  },
  programs: {
    title: "Our focus areas",
    lead: "Four priorities for concrete impact in Cameroon.",
    items: [
      {
        id: "urgence",
        title: "Emergency aid",
        text: "Rapid support for communities hit by crises and disasters.",
        href: "/missions",
      },
      {
        id: "sante",
        title: "Primary health",
        text: "Access to care and strengthening of the local health system.",
        href: "/missions",
      },
      {
        id: "nutrition",
        title: "Nutrition",
        text: "Food security and nutritional wellbeing for the most vulnerable.",
        href: "/missions",
      },
      {
        id: "protection",
        title: "Protection",
        text: "Protection of children, girls, women and people with specific needs.",
        href: "/missions#objectifs",
      },
    ],
  },
  donateBanner: {
    title: "Your gift builds a bridge",
    text: "Every contribution supports emergency aid, health, nutrition and protection for the most vulnerable.",
    cta: "Donate",
  },
  engage: {
    title: "Act with us, from Yaoundé",
    titleLines: ["Act with us,", "from Yaoundé"],
    lead: "Giving is not the only way to support HOPE Bridge.",
    body: "Partnerships, volunteering, questions or a simple hello: our headquarters are in Cameroon, Mfoundi Department. Write to us — every connection matters for the communities we serve.",
    contactCta: "Contact us",
    aboutCta: "Learn more",
  },
  objectives: {
    title: "Our goals",
    items: [
      {
        title: "Fighting poverty",
        text: "Promote the effective participation of women, girls and vulnerable people in Cameroon's development.",
      },
      {
        title: "Health system",
        text: "Promote the strengthening of the health system and access to primary care.",
      },
      {
        title: "Community wellbeing",
        text: "Build community capacities for lasting, shared wellbeing.",
      },
      {
        title: "Protection",
        text: "Contribute to the protection of children, girls, women and anyone with specific needs.",
      },
    ],
  },
  footer: {
    tagline:
      "Humanitarian association in Yaoundé — emergency aid, health, nutrition and protection.",
    about:
      "HOPE Bridge for the Needy works to relieve suffering and strengthen community resilience in Cameroon.",
    programsTitle: "Actions",
    orgTitle: "The association",
    findUs: "Headquarters",
    programs: [
      { label: "Emergency aid", href: "/missions" },
      { label: "Primary health", href: "/missions" },
      { label: "Nutrition", href: "/missions" },
      { label: "Donate", href: "/don" },
    ],
    org: [
      { label: "About", href: "/a-propos" },
      { label: "Actions", href: "/missions" },
      { label: "Contact", href: "/contact" },
      { label: "Donate", href: "/don" },
    ],
    legal: [
      { label: "Legal notice", href: "/mentions-legales" },
      { label: "Privacy", href: "/confidentialite" },
    ],
    contact: {
      city: "Yaoundé, Cameroon",
      address:
        "Mfoundi Department, Centre Region, Republic of Cameroon",
    },
    rights: "© {year} HOPE Bridge for the Needy. All rights reserved.",
  },
  pages: {
    about: {
      title: "About",
      eyebrow: "The association",
      lead: "Relieving suffering, strengthening community resilience.",
      h2: "Who we are",
      p1: "HOPE Bridge for the Needy is a non-profit association created to relieve the suffering of populations affected by conflict, natural disasters and disease.",
      p2: "It works to strengthen local community resilience, promote primary health, nutrition, the protection of women and children, and support emergency aid programmes. Headquarters: Yaoundé, Mfoundi Department, Centre Region, Cameroon.",
      linkMissions: "See our actions",
      linkContact: "Contact us",
      linkDonate: "Donate",
    },
    missions: {
      title: "Actions",
      eyebrow: "What we do",
      lead: "Emergency aid, health, nutrition and protection of the most vulnerable.",
      h2: "Our mandate",
      p1: "The association's mission is to help vulnerable people and improve their living conditions.",
      p2: "To that end, it aims to fight poverty, strengthen the health system, build community capacities and protect children, girls, women and anyone with specific needs.",
    },
    contact: {
      title: "Contact",
      eyebrow: "Get in touch",
      lead: "Headquarters in Yaoundé — Mfoundi Department, Centre Region.",
      h2: "Write to the association",
      p1: "For information, partnership or volunteering, contact us. To donate, use the dedicated page — it's simpler and clearer.",
      emailLabel: "Email",
      locationLabel: "Address",
      donateHint: "Want to support our work?",
      donateCta: "Go to the Donate page",
    },
    donate: {
      title: "Donate",
      eyebrow: "Support HOPE Bridge",
      lead: "Your gift funds emergency aid, health, nutrition and protection in Cameroon.",
      whyTitle: "Why give?",
      why: "Every contribution strengthens our ability to reach vulnerable people in Yaoundé and beyond. As a non-profit, we act with transparency and dignity.",
      amountsTitle: "Choose an amount",
      customLabel: "Other amount",
      customPlaceholder: "e.g. 15000",
      currency: "FCFA",
      allocationTitle: "Allocate my gift (optional)",
      allocations: [
        { id: "general", label: "Where the need is greatest" },
        { id: "urgence", label: "Emergency aid" },
        { id: "sante", label: "Primary health" },
        { id: "nutrition", label: "Nutrition" },
        { id: "protection", label: "Protection" },
      ],
      methodsTitle: "How to pay",
      methodsLead:
        "Send your gift via MTN Mobile Money or Orange Money, then confirm with us if you wish.",
      stepsTitle: "Steps",
      steps: [
        "Choose an amount (and an allocation if you want).",
        "Open MTN MoMo or Orange Money on your phone.",
        "Send the amount to the number shown, with the reference HOPE-DON.",
        "Keep the confirmation — you can email us for a receipt.",
      ],
      numberLabel: "Number",
      nameLabel: "In the name of",
      copyNumber: "Copy number",
      copied: "Copied",
      referenceLabel: "Reference to include",
      referenceHint: "Add this reference in the transfer message.",
      confirmTitle: "After your transfer",
      confirmText:
        "Email us to confirm your gift (amount, operator, date). We can thank you and, if needed, send an acknowledgement.",
      confirmCta: "Confirm my gift by email",
      trustTitle: "Trust",
      trustItems: [
        "Non-profit association — Yaoundé, Cameroon",
        "Your funds support concrete field actions",
        "Contact available for follow-up and receipt",
      ],
      placeholderNote:
        "Mobile Money numbers will be updated once confirmed by the association.",
    },
    legal: {
      title: "Legal notice",
      eyebrow: "Information",
      lead: "Publisher and site responsibility.",
      sections: [
        {
          title: "Publisher",
          body: "HOPE Bridge for the Needy — non-profit association. Headquarters: Yaoundé, Mfoundi Department, Centre Region, Republic of Cameroon.",
        },
        {
          title: "Purpose of the site",
          body: "This site presents the association, its actions and ways to support its programmes. Information is provided for informational purposes.",
        },
        {
          title: "Donations",
          body: "Mobile Money gifts are sent directly by the donor to the numbers shown on the Donate page. Keep your transfer proof.",
        },
        {
          title: "Intellectual property",
          body: "Content (texts, images, trademarks) is protected. Unauthorized reproduction is prohibited.",
        },
      ],
    },
    privacy: {
      title: "Privacy",
      eyebrow: "Personal data",
      lead: "How we handle your information.",
      sections: [
        {
          title: "Collection",
          body: "Data collected via email or gift confirmation is used only to respond to your request and follow up on your support.",
        },
        {
          title: "Retention",
          body: "Exchanges are kept as long as needed to process your request, then archived or deleted according to the association's legitimate needs.",
        },
        {
          title: "Your rights",
          body: "You may request access, correction or deletion of your data by writing to contact@hopebridge.cm.",
        },
      ],
    },
  },
  alts: {
    hero_bg: "Community and solidarity — HOPE Bridge",
    mission: "Helping hand, humanitarian solidarity",
    care_a: "Community health and care",
    care_b: "Children and family",
    care_c: "Aid and solidarity",
    allinone_a: "Humanitarian action on the ground",
    allinone_b: "Support for vulnerable people",
  },
};
