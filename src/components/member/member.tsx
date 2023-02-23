import MemberThumbnail from "../member/member_thumbnail";

export interface MemberProps {
  member_name: string;
  member_photo_url: string;
  children: React.ReactNode;
}

export default function Member(props: MemberProps) {
  return (
    <div className="border inline-flex items-center">
      <MemberThumbnail member_photo_url={props.member_photo_url} />
      <div className="ml-2 pr-4">
        <div className="text-heading-5">{props.member_name}</div>
        {props.children}
      </div>
    </div>
  );
}
