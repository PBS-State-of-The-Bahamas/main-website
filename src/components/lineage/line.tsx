export type Terms = "Spring" | "Summer" | "Fall";

export interface LineProps {
  term: Terms;
  year: number;
  shipName: string;
}

export default function Line(props: LineProps) {
  return (
    <div className="rounded-lg shadow-lg p-8 bg-gray-1 hover:bg-gray-2 h-75px">
      <span className="text-heading-4">
        {props.term} {props.year}
      </span>
      <div className="text-heading-6">{props.shipName}</div>
    </div>
  );
}
