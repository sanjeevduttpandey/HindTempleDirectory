"use client"

/**
 * Minimal WYSIWYG replacement until a rich-text editor (e.g. TipTap/Lexical) is wired up.
 */
export default function Editor({
  value,
  onChange,
  className,
}: {
  value: string
  onChange: (val: string) => void
  className?: string
}) {
  return (
    <textarea
      className={`w-full min-h-[10rem] rounded border p-2 focus:outline-none ${className ?? ""}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
