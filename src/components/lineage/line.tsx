type Terms = "Spring" | "Summer" | "Fall";

export interface LineProps {
  id: number;
  term: Terms;
  year: number;
  ship_name: string;
  total_members: number;
}

export default function Line(props: LineProps) {
  return (
    <div key={props.id}>
      <h4>
        {props.term} {props.year} {props.total_members}
      </h4>
      <div>{props.ship_name}</div>
    </div>
  );
}
