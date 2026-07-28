import { MembersShell } from "@/components/members/MembersShell";
import { MembersArchivesPage } from "@/components/members/MembersArchivesPage";

export default function Page() {
  return (
    <MembersShell>
      <MembersArchivesPage />
    </MembersShell>
  );
}
