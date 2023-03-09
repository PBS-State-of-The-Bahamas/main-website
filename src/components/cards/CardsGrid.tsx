import React from "react";
import Card from "./Card";

type Props = {
  heading?: string;
  items: {
    icon: JSX.Element;
    title: string;
    subtitle: string;
    description?: string;
  }[];
};

const CardsGrid = (props: Props) => {
  return (
    <div className="p-8">
      {props.heading && (
        <h4 className="text-heading-4 font-bold text-gray-6">
          {props.heading}
        </h4>
      )}
      <ul
        role="list"
        className="mt-3 grid gap-5 max-sm:grid-cols-1 max-sm:gap-6 md:grid-cols-3 lg:grid-cols-4"
      >
        {props.items.map((prop) => (
          <Card
            title={prop.title}
            subtitle={prop.subtitle}
            icon={prop.icon}
            description={prop.description}
          />
        ))}
      </ul>
    </div>
  );
};

export default CardsGrid;
