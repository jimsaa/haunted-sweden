import { MembersShell } from "@/components/members/MembersShell";
import { MembersBadgesPage } from "@/components/members/MembersBadgesPage";

export default function Page() {
  return (
    <MembersShell>
      <MembersBadgesPage />
    </MembersShell>
  );
}
