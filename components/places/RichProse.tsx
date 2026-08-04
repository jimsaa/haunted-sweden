/** Renders editorial place copy with optional ## / ### markdown headings. */
export function RichProse({ text }: { text: string }) {
  const blocks = text
    .split(/\n\n+/)
    .map((b) => b.trim())
    .filter(Boolean);

  if (blocks.length === 0) return null;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-5 sm:px-6 sm:py-6 space-y-4">
      {blocks.map((block, i) => {
        if (block.startsWith("### ")) {
          return (
            <h3
              key={i}
              className="text-lg font-semibold text-white pt-2"
              style={{ fontFamily: "var(--font-display), serif" }}
            >
              {block.slice(4).trim()}
            </h3>
          );
        }
        if (block.startsWith("## ")) {
          return (
            <h3
              key={i}
              className="text-xl font-semibold text-white pt-3 first:pt-0"
              style={{ fontFamily: "var(--font-display), serif" }}
            >
              {block.slice(3).trim()}
            </h3>
          );
        }
        return (
          <p
            key={i}
            className="leading-relaxed text-white/80 text-[15px] sm:text-base whitespace-pre-line"
          >
            {block}
          </p>
        );
      })}
    </div>
  );
}
