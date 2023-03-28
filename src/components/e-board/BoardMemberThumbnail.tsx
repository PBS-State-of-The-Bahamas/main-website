export interface BoardMemberThumbnailProps {
    boardMemberPhotoUrl: string;
  }
  
  export default function MemberThumbnail(props: BoardMemberThumbnailProps) {
    return (
      <div className="border">
        <img className="w-12 h-12" src={props.boardMemberPhotoUrl} alt="member"></img>
      </div>
    );
  }
  