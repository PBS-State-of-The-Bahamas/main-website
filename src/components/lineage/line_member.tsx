import LineMemberThumbnail from "./line_member_thumbnail";

export interface LineMemberProps {
  id: number;
  member_name: string;
  line_number: number;
  line_name: string;
  member_photo_url: string;
}

export default function LineMember(props: LineMemberProps) {
  return (
    <div key={props.id}>
      <LineMemberThumbnail member_photo_url={props.member_photo_url} />
      <h4>{props.member_name}</h4>
      <div>
        #{props.line_number}-{props.line_name}
      </div>
    </div>
  );
}
