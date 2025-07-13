/**
 * Simple network helper — point to your real API later.
 */
export async function createDiscussion(payload: {
  title: string
  body: string
}) {
  // Example POST – replace `/api/discussions` with actual route.
  const res = await fetch("/api/discussions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  if (!res.ok) throw new Error("Failed to create discussion")
  return res.json() as Promise<{ id: number; title: string; body: string }>
}
