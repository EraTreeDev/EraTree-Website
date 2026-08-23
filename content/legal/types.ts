export type LegalSection = {
  /** null for the lead-in blocks that sit above the first heading. */
  heading: string | null;
  level: 2 | 3;
  /** Paragraph text. Inline links are encoded as [text](href). */
  blocks: string[];
};

export type LegalDoc = {
  title: string;
  /** e.g. "December 01, 2025". Empty if the source page omits it. */
  updated: string;
  sections: LegalSection[];
};
