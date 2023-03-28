export interface BoardMemberThumbnailProps {
    boardMemberPhotoUrl: string;
  }
  
  export default function BoardMemberThumbnail(props: BoardMemberThumbnailProps) {
    return (
      <div className="border">
        <img className="w-[324px] h-[223px]" src={props.boardMemberPhotoUrl} alt="member"></img>
      </div>
    );
  }
  