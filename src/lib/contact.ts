/** Google Form ID from the embed / share URL. */
export const GOOGLE_FORM_ID =
  "1FAIpQLSelvtqu7mVl6co7M1ne5pTCF_W3u9uW-d2ROzdrLPQ2bJqNlQ";

/** POST target for custom form submissions. */
export const GOOGLE_FORM_ACTION = `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`;

/** Field entry IDs from the Google Form. */
export const GOOGLE_FORM_ENTRIES = {
  firstName: "entry.425989822",
  lastName: "entry.901636673",
  email: "entry.483696472",
  subject: "entry.824042015",
  message: "entry.1508793194",
} as const;
