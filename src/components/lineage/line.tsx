export type Terms = "Spring" | "Summer" | "Fall";

export interface LineProps {
  id: number;
  term: Terms;
  year: number;
  ship_name: string;
}

export default function Line(props: LineProps) {
  return (
    <div
      key={props.id}
      className="rounded-lg shadow-lg p-8 bg-pure-white hover:bg-gray-2"
    >
      <span className="text-heading-4">
        {props.term} {props.year}
      </span>
      <div className="text-heading-6">{props.ship_name}</div>
    </div>
  );
}
