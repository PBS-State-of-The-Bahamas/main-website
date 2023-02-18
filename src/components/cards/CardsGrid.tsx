import React from "react";

type Props = {
  heading: string;
  items: {
    icon: any;
    title: string;
    subtitle: string;
    description?: string;
  }[];
};

const CardsGrid = (props: Props) => {
  return (
    <div className="p-8">
      <h4 className="text-heading-4 font-bold text-gray-6">{props.heading}</h4>
      <ul
        role="list"
        className="mt-3 grid gap-5 max-sm:grid-cols-1 max-sm:gap-6 md:grid-cols-3 lg:grid-cols-4"
      >
        {props.items.map((prop) => (
          <li
            key={prop.title}
            className="col-span-1 flex rounded-md shadow-sm border border-gray-4 p-2"
          >
            <div className="flex-shrink-0 flex items-center justify-center w-16 text-sm font-medium rounded-md bg-gray-2">
              {prop.icon}
            </div>
            <div className="flex flex-1 items-center justify-between rounded-r-md bg-white">
              <div className="flex-1 px-4 py-2 text-sm uppercase">
                <p className="font-bold text-gray-6">{prop.title}</p>
                <p className="text-gray-5">
                  <span className="font-bold">{prop.subtitle}</span>
                  {prop.description && <span> - {prop.description}</span>}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CardsGrid;
