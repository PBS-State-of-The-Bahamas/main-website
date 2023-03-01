export interface LineMemberProps {
  id: number;
  lineNumber: number;
  lineName: string;
}

export default function LineMember(props: LineMemberProps) {
  if (!(props.lineNumber && props.lineName)){
    return <div></div>
  }
  return (
    <div className="text-heading-6">
      #{props.lineNumber}-{props.lineName}
    </div>
  );
}
