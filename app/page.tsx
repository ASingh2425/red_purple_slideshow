export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{ team?: string; teamId?: string; launchToken?: string }> | { team?: string; teamId?: string; launchToken?: string };
}) {
  const resolved = searchParams ? await Promise.resolve(searchParams) : {};
  const team = (resolved?.team || resolved?.teamId || "").trim();
  const launchToken = (resolved?.launchToken || "").trim();
  const params = new URLSearchParams();
  if (team) params.set("team", team);
  if (launchToken) params.set("launchToken", launchToken);
  const queryStr = params.toString();
  const src = queryStr ? `/experience/index.html?${queryStr}` : "/experience/index.html";
  return <iframe title="MANU Protocol — Final Transit" src={src} style={{ border: 0, display: "block", height: "100svh", width: "100vw" }} />;
}
