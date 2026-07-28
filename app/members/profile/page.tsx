import { MembersShell } from "@/components/members/MembersShell";
import { MembersProfilePage } from "@/components/members/MembersProfilePage";

export default function Page() {
  return (
    <MembersShell>
      <MembersProfilePage />
    </MembersShell>
  );
}
