import Image from "next/image";
export interface MemberThumbnailProps {
  memberPhotoUrl: string;
}

export default function MemberThumbnail(props: MemberThumbnailProps) {
  return (
    <div className="border">
      <Image
        fill={true}
        src={props.memberPhotoUrl}
        alt="member"
        width={12}
        height={12}
      ></Image>
    </div>
  );
}
