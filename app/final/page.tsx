import { redirect } from "next/navigation";

export default async function FinalRedirectPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolved = props.searchParams ? await props.searchParams : {};
  const rawTeam = resolved?.team || resolved?.teamId || "";
  const team = (typeof rawTeam === "string" ? rawTeam : Array.isArray(rawTeam) ? rawTeam[0] : "").trim();
  const rawToken = resolved?.launchToken || "";
  const launchToken = (typeof rawToken === "string" ? rawToken : Array.isArray(rawToken) ? rawToken[0] : "").trim();
  
  const params = new URLSearchParams();
  if (team) params.set("team", team);
  if (launchToken) params.set("launchToken", launchToken);
  
  const queryStr = params.toString();
  const targetUrl = queryStr
    ? `https://last-dataset.vercel.app/purple?${queryStr}`
    : "https://last-dataset.vercel.app/purple";
    
  redirect(targetUrl);
}
