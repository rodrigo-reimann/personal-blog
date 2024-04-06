import React from 'react';
import Image from 'next/image';

const Author = ({ author }) => (
  <div className="text-left mt-20 mb-8 p-12 relative rounded-lg bg-white shadow-lg bg-opacity-20">
    <div className="absolute left-0 right-0 -top-14">
      <Image
        unoptimized
        alt={author.name}
        height={70}
        width={70}
        className="align-middle rounded-full"
        src={author.photo.url}
      />
    </div>
    <h3 className=" mt-4 mb-4 text-xl font-bold">{author.name}</h3>
    <p className="text-base">{author.bio}</p>
  </div>
);

export default Author;