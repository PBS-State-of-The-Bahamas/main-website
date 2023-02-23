import Image from "next/image";

export interface MemberThumbnailProps {
  id: number;
  member_photo_url: string;
}

export default function MemberThumbnail(props: MemberThumbnailProps) {
  return (
    <div className="border" key={props.id}>
      <img
        className="w-12 h-auto"
        src={props.member_photo_url}
        alt="member"
      ></img>
    </div>
  );
}
