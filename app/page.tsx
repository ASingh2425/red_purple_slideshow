export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{ team?: string; teamId?: string }> | { team?: string; teamId?: string };
}) {
  const resolved = searchParams ? await Promise.resolve(searchParams) : {};
  const team = (resolved?.team || resolved?.teamId || "").trim();
  const src = team ? `/experience/index.html?team=${encodeURIComponent(team)}` : "/experience/index.html";
  return <iframe title="MANU Protocol — Final Transit" src={src} style={{ border: 0, display: "block", height: "100svh", width: "100vw" }} />;
}
