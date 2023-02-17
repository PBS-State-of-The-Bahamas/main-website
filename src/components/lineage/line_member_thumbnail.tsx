import Image from "next/image";
import styles from "../styles/HallOfFame.module.css";

export interface LineMemberThumbnailProps {
  member_photo_url: string;
}

export default function LineMemberThumbnail(props: LineMemberThumbnailProps) {
  return (
    <div>
      <Image
        src={props.member_photo_url}
        alt="member"
        className={styles.thumbnail}
        width="200"
        height="200"
      />
    </div>
  );
}
