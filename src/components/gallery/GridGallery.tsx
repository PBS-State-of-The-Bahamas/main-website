import React from "react";

type Props = {
  images: {
    source: string;
    altText: string;
  }[];
};

const GridGallery = (props: Props) => {
  return (
    <ul
      role="list"
      className="p-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
    >
      {props.images.map((image) => (
        <li key={image.source} className="relative">
          <div className="block w-full overflow-hidden rounded-sm bg-gray-100">
            <img
              src={image.source}
              alt={image.altText}
              className="object-cover hover:opacity-75 hover:cursor-pointer"
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GridGallery;
