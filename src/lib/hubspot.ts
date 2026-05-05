import { LeadRecord } from "@/lib/types";

export async function syncLeadToHubSpot(lead: LeadRecord): Promise<void> {
  const accessToken = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!accessToken) return;

  const context = [
    `Fuente: ${lead.source}`,
    `Tipo: ${lead.lead_kind}`,
    lead.diagnosis?.result?.risk ? `Riesgo diagnóstico: ${lead.diagnosis.result.risk}` : null
  ]
    .filter(Boolean)
    .join(" | ");

  await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      properties: {
        email: lead.work_email,
        firstname: lead.first_name,
        lastname: lead.last_name,
        phone: lead.phone ?? "",
        company: lead.company,
        jobtitle: lead.role,
        hs_lead_status: "NEW",
        cademmy_service_interest: lead.service_interest,
        cademmy_team_size: lead.team_size,
        cademmy_preferred_language: lead.preferred_language,
        cademmy_lead_id: lead.id,
        cademmy_challenge_summary: context ? `${lead.challenge_summary}\n${context}` : lead.challenge_summary,
        cademmy_utm_source: lead.utm.utm_source ?? "",
        cademmy_utm_medium: lead.utm.utm_medium ?? "",
        cademmy_utm_campaign: lead.utm.utm_campaign ?? ""
      }
    })
  });
}
