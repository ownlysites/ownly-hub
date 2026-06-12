import { VAULT_CATEGORIES, linksByCategory } from "../data/links";

/* ItemList structured data for the tool categories. Org + WebSite schema
   already live in layout.tsx — this extends, never duplicates. */
export default function SeoSchema() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Ownly ONCE Tools & Programs",
    description:
      "Business credit, cash flow, capital, AI, and wealth tools in the Ownly ONCE ecosystem.",
    itemListElement: VAULT_CATEGORIES.flatMap((cat) =>
      linksByCategory(cat.key).filter((l) => !l.pending)
    )
      // De-dupe (a link can appear under one category only, but stay safe)
      .filter((l, i, arr) => arr.findIndex((x) => x.id === l.id) === i)
      .map((l, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: l.label,
        description: l.desc,
        url: l.url,
      })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
    />
  );
}
