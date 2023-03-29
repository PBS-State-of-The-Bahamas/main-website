import BoardMemberThumbnail from "../e-board/BoardMemberThumbnail";

export interface BoardMemberProps {
  memberName: string;
  memberPhotoUrl: string;
  position: string;
}

export default function BoardMember(props: BoardMemberProps) {
  return (
    <div className="h-13">
      <BoardMemberThumbnail boardMemberPhotoUrl={props.memberPhotoUrl} />
      <div className="text-heading-5">{props.memberName}</div>
      <div>{props.position}</div>
    </div>
  );
}
