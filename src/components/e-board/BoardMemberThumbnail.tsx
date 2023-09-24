import Image from "next/image";

export interface BoardMemberThumbnailProps {
  boardMemberPhotoUrl: string;
}

export default function BoardMemberThumbnail(props: BoardMemberThumbnailProps) {
  return (
    <div className="border">
      <Image
        priority
        src={props.boardMemberPhotoUrl}
        alt={"member"}
        width={324}
        height={223}
        className={"w-[324px] h-[223px]"}
      ></Image>
    </div>
  );
}
