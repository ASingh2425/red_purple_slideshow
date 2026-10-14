import { redirect } from "next/navigation";

export default async function FinalRedirectPage({
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
  const targetUrl = queryStr
    ? `https://last-dataset.vercel.app/purple?${queryStr}`
    : "https://last-dataset.vercel.app/purple";
    
  redirect(targetUrl);
}
