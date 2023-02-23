export interface MemberThumbnailProps {
  member_photo_url: string;
}

export default function MemberThumbnail(props: MemberThumbnailProps) {
  return (
    <div className="border">
      <img
        className="w-12 h-auto"
        src={props.member_photo_url}
        alt="member"
      ></img>
    </div>
  );
}
