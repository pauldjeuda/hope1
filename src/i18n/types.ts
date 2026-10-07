export type Locale = "fr" | "en";

export type Messages = {
  nav: {
    home: string;
    openMenu: string;
    closeMenu: string;
    contact: string;
    donate: string;
    mainNav: string;
    langSwitch: string;
  };
  navItems: { label: string; path: string }[];
  hero: {
    line: string;
    donate: string;
    actions: string;
  };
  philosophy: {
    title: string;
    titleLines: [string, string, string];
    p1: string;
    p2: string;
    cta: string;
    note: string;
  };
  programs: {
    title: string;
    lead: string;
    items: { id: string; title: string; text: string; href: string }[];
  };
  donateBanner: {
    title: string;
    text: string;
    cta: string;
  };
  engage: {
    title: string;
    titleLines: [string, string];
    lead: string;
    body: string;
    contactCta: string;
    aboutCta: string;
  };
  objectives: {
    title: string;
    items: { title: string; text: string }[];
  };
  footer: {
    tagline: string;
    about: string;
    programsTitle: string;
    orgTitle: string;
    findUs: string;
    programs: { label: string; href: string }[];
    org: { label: string; href: string }[];
    legal: { label: string; href: string }[];
    contact: {
      city: string;
      address: string;
    };
    rights: string;
  };
  pages: {
    about: {
      title: string;
      eyebrow: string;
      lead: string;
      h2: string;
      p1: string;
      p2: string;
      linkMissions: string;
      linkContact: string;
      linkDonate: string;
    };
    missions: {
      title: string;
      eyebrow: string;
      lead: string;
      h2: string;
      p1: string;
      p2: string;
    };
    contact: {
      title: string;
      eyebrow: string;
      lead: string;
      h2: string;
      p1: string;
      emailLabel: string;
      locationLabel: string;
      donateHint: string;
      donateCta: string;
    };
    donate: {
      title: string;
      eyebrow: string;
      lead: string;
      whyTitle: string;
      why: string;
      amountsTitle: string;
      customLabel: string;
      customPlaceholder: string;
      currency: string;
      allocationTitle: string;
      allocations: { id: string; label: string }[];
      methodsTitle: string;
      methodsLead: string;
      stepsTitle: string;
      steps: string[];
      numberLabel: string;
      nameLabel: string;
      copyNumber: string;
      copied: string;
      referenceLabel: string;
      referenceHint: string;
      confirmTitle: string;
      confirmText: string;
      confirmCta: string;
      trustTitle: string;
      trustItems: string[];
      placeholderNote: string;
    };
    legal: {
      title: string;
      eyebrow: string;
      lead: string;
      sections: { title: string; body: string }[];
    };
    privacy: {
      title: string;
      eyebrow: string;
      lead: string;
      sections: { title: string; body: string }[];
    };
  };
  alts: {
    hero_bg: string;
    mission: string;
    care_a: string;
    care_b: string;
    care_c: string;
    allinone_a: string;
    allinone_b: string;
  };
};
