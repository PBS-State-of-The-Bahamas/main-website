import BoardMemberThumbnail from "../e-board/BoardMemberThumbnail";

export interface BoardMemberProps {
  memberName: string;
  memberPhotoUrl: string;

}

export default function BoardMember(props: BoardMemberProps) {
  return (
    <div className="p-2 h-[75px]">
      <BoardMemberThumbnail boardMemberPhotoUrl={props.memberPhotoUrl} />
      <div className="">
        <div className="text-heading-5">{props.memberName}</div>
      </div>
    </div>
  );
}
