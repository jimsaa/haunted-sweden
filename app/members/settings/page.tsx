import { MembersShell } from "@/components/members/MembersShell";
import { MembersSettingsPage } from "@/components/members/MembersSettingsPage";

export default function Page() {
  return (
    <MembersShell>
      <MembersSettingsPage />
    </MembersShell>
  );
}
