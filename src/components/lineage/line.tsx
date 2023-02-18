type Terms = "Spring" | "Summer" | "Fall";

export interface LineProps {
  key: number;
  term: Terms;
  year: number;
  ship_name: string;
}

export default function Line(props: LineProps) {
  return (
    <div key={props.key}>
      <h4>
        {props.term} {props.year}
      </h4>
      <div>{props.ship_name}</div>
    </div>
  );
}
