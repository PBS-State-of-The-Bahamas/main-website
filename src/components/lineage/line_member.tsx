export interface LineMemberProps {
  id: number;
  lineNumber: number;
  lineName: string;
}

export default function LineMember(props: LineMemberProps) {
  return (
    <div className="text-heading-6">
      #{props.lineNumber}-{props.lineName}
    </div>
  );
}
