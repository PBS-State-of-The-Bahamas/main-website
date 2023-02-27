export interface LifeMemberProps {
  shipName: string;
  lineName: string;
}

export default function LifeMember(props: LifeMemberProps) {
  return (
    <div className="text-heading-6">
      <span className="font-bold">{props.lineName}</span>-{props.shipName}
    </div>
  );
}
