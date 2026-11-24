/** Values shared by the Privacy Policy and Terms of Use pages. */
export const LEGAL = {
  company: "Rascal Dev Labs LLC",
  siteName: "the Rascal Dev Labs website",
  /** Bump whenever either legal page changes. */
  lastUpdated: "November 24, 2026",
  /** How long contact messages are kept after the last contact. */
  retention: "24 months",
  // TODO: replace with the US state where the LLC is registered,
  // e.g. "the State of Wyoming, USA".
  governingLaw: "the state in which Rascal Dev Labs LLC is registered, USA",
} as const;
