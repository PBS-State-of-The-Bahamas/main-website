export interface LineMemberProps {
  id: number;
  line_number: number;
  line_name: string;
}

export default function LineMember(props: LineMemberProps) {
  return (
    <div className="text-heading-6">
      #{props.line_number}-{props.line_name}
    </div>
  );
}
