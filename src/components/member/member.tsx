import MemberThumbnail from "../member/member_thumbnail";

export interface MemberProps {
  memberName: string;
  memberPhotoUrl: string;
  children: React.ReactNode;
}

export default function Member(props: MemberProps) {
  return (
    <div className="border inline-flex items-center">
      <MemberThumbnail memberPhotoUrl={props.memberPhotoUrl} />
      <div className="ml-2 pr-4">
        <div className="text-heading-5">{props.memberName}</div>
        {props.children}
      </div>
    </div>
  );
}
