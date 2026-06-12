/* Editorial line icons for the six identity paths — 1.5px gold strokes. */

const S = {
  width: 30,
  height: 30,
  viewBox: "0 0 32 32",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const PATH_ICONS: Record<string, React.ReactNode> = {
  business: (
    <svg {...S}>
      <path d="M5 13l2-7h18l2 7" />
      <path d="M5 13c0 1.7 1.3 3 3 3s3-1.3 3-3c0 1.7 1.3 3 3 3s3-1.3 3-3c0 1.7 1.3 3 3 3s3-1.3 3-3" />
      <path d="M7 16v10h18V16" />
      <path d="M13 26v-6h6v6" />
    </svg>
  ),
  restaurant: (
    <svg {...S}>
      <path d="M4 22h24" />
      <path d="M6 22a10 10 0 0 1 20 0" />
      <path d="M16 12v-2" />
      <circle cx="16" cy="8.5" r="1.5" />
      <path d="M8 26h16" />
    </svg>
  ),
  self: (
    <svg {...S}>
      <circle cx="12" cy="12" r="5" />
      <path d="M15.5 15.5L27 27" />
      <path d="M22 22l3-3" />
      <path d="M25 25l3-3" />
    </svg>
  ),
  household: (
    <svg {...S}>
      <path d="M5 15L16 5l11 10" />
      <path d="M8 13v13h16V13" />
      <path d="M13 26v-7h6v7" />
    </svg>
  ),
  vip: (
    <svg {...S}>
      <path d="M16 4l3.5 7.6 8.5 1-6.2 5.7 1.7 8.3L16 22.4l-7.5 4.2 1.7-8.3L4 12.6l8.5-1L16 4z" />
    </svg>
  ),
  all: (
    <svg {...S}>
      <rect x="5" y="5" width="9" height="9" rx="1.5" />
      <rect x="18" y="5" width="9" height="9" rx="1.5" />
      <rect x="5" y="18" width="9" height="9" rx="1.5" />
      <rect x="18" y="18" width="9" height="9" rx="1.5" />
    </svg>
  ),
};
