import MemberThumbnail from "../member/member_thumbnail";

export interface MemberProps {
  id: number;
  member_name: string;
  member_photo_url: string;
}

export default function Member(props: MemberProps) {
  return (
    <div key={props.id}>
      <MemberThumbnail member_photo_url={props.member_photo_url} />
      <h4>{props.member_name}</h4>
    </div>
  );
}
