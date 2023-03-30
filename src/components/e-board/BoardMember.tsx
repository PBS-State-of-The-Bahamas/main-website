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
      <h5 className="text-heading-5">{props.memberName}</h5>
      <p>{props.position}</p>
    </div>
  );
}
