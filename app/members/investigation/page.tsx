import { MembersShell } from "@/components/members/MembersShell";
import { MembersInvestigationPage } from "@/components/members/MembersInvestigationPage";

export default function Page() {
  return (
    <MembersShell>
      <MembersInvestigationPage />
    </MembersShell>
  );
}
