import React from "react";

type Props = {
  title: string;
  icon: JSX.Element;
  subtitle: string;
  description: string;
};

const Card = (props: Props) => {
  return (
    <li
      key={props.title}
      className="col-span-1 flex rounded shadow-sm border border-gray-2 px-2 pt-2 pb-4"
    >
      <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 text-sm font-medium rounded-md bg-gray-2">
        {props.icon}
      </div>
      <div className="flex flex-1 items-center justify-between bg-white">
        <div className="flex-1 px-2 text-sm">
          <p className="font-bold text-black uppercase">{props.title}</p>
          <p className="text-gray-5">
            <span className="font-bold">{props.subtitle}</span>
            {props.description && <span> - {props.description}</span>}
          </p>
        </div>
      </div>
    </li>
  );
};

export default Card;
