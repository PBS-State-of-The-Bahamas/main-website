import { LineMemberProps } from "../lineage/line_member";
import MemberThumbnail from "../member/member_thumbnail";

export interface MemberProps {
  id: number;
  member_name: string;
  member_photo_url: string;
  children: React.ReactNode;
}

export default function Member(props: MemberProps) {
  return (
    <div key={props.id} className="border flex flex-no-wrap grid-cols-2 gap-2">
      <MemberThumbnail member_photo_url={props.member_photo_url} />
      <div className="pt-6">
        <div className="text-heading-5">{props.member_name}</div>
        {props.children}
      </div>
    </div>
  );
}
