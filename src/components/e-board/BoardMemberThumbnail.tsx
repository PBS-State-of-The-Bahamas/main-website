export interface BoardMemberThumbnailProps {
    boardMemberPhotoUrl: string;
  }
  
  export default function MemberThumbnail(props: BoardMemberThumbnailProps) {
    return (
      <div className="border">
        <img className="w-20 h-13" src={props.boardMemberPhotoUrl} alt="member"></img>
      </div>
    );
  }
  