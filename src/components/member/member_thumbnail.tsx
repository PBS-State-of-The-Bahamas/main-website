import Image from "next/image";
import styles from "../../styles/Member.module.css";

export interface MemberThumbnailProps {
  member_photo_url: string;
}

export default function LineMemberThumbnail(props: MemberThumbnailProps) {
  return (
    <div className="border">
      <Image
        src={props.member_photo_url}
        alt="member"
        className={styles.thumbnail}
        width="100"
        height="100"
      />
    </div>
  );
}
