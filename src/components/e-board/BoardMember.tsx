import BoardMemberThumbnail from "../e-board/BoardMemberThumbnail";

export interface BoardMemberProps {
  boardMemberName: string;
  boardMemberPhotoUrl: string;
}

export default function BoardMember(props: BoardMemberProps) {
  return (
    <div className="p-2 h-[75px]">
      <BoardMemberThumbnail boardMemberPhotoUrl={props.boardMemberPhotoUrl} />
      <div className="">
        <div className="text-heading-5">{props.boardMemberName}</div>
      </div>
    </div>
  );
}
