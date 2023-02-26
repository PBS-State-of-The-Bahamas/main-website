export interface MemberThumbnailProps {
  memberPhotoUrl: string;
}

export default function MemberThumbnail(props: MemberThumbnailProps) {
  return (
    <div className="border">
      <img className="w-12 h-12" src={props.memberPhotoUrl} alt="member"></img>
    </div>
  );
}
