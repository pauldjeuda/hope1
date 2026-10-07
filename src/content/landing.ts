export const BRAND = "hope bridge";
export const BRAND_FULL = "HOPE Bridge for the Needy";
export const BIG_WORD = "espoir";

export const CONTACT = {
  city: "Yaoundé, Cameroun",
  address:
    "Département du Mfoundi, Région du Centre, République du Cameroun",
  email: "contact@hopebridge.cm",
  phone: "",
};

/** Numéros à remplacer dès que l'asso les confirme */
export const PAYMENTS = {
  mtn: {
    id: "mtn",
    label: "MTN Mobile Money",
    short: "MTN MoMo",
    number: "6XX XX XX XX",
    name: "HOPE Bridge for the Needy",
    color: "#FFCC00",
    ink: "#1a1a1a",
  },
  orange: {
    id: "orange",
    label: "Orange Money",
    short: "Orange Money",
    number: "6XX XX XX XX",
    name: "HOPE Bridge for the Needy",
    color: "#FF7900",
    ink: "#ffffff",
  },
  referenceHint: "HOPE-DON",
} as const;

export const DONATE_AMOUNTS = [5000, 10000, 25000, 50000] as const;
