/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import moment from "moment";

const PostDetail = ({ post }) => {
    // This function transforms a piece of text content based on its formatting and type
    const getContentFragment = (index, text, obj, type) => {
        let modifiedText = text;
        
        // Check if the content block has any styling (bold, italic, underline)
        if (obj) {
          // Apply bold formatting if specified
          if (obj.bold) {
            modifiedText = (<b key={index}>{text}</b>);
          }
          // Apply italic formatting if specified
          if (obj.italic) {
            modifiedText = (<em key={index}>{text}</em>);
          }
          // Apply underline formatting if specified
          if (obj.underline) {
            modifiedText = (<u key={index}>{text}</u>);
          }
        }
        // Switch statement to handle different types of content blocks
        switch (type) {
          case 'heading-three':
            return <h3 key={index} className=" text-black text-xl font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
          case 'paragraph':
            return <p key={index} className="text-black mb-8">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;
          case 'heading-four':
            return <h4 key={index} className="text-black text-md font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
          case 'image':
            return (
                <img
                  key={index}
                  alt={obj.title}
                  height={obj.height}
                  width={obj.width}
                  src={obj.src}
                />
              );
            // Default case: return the modified text without additional formatting
            default:
              return modifiedText;
          }
        };

    return (
        <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
            <div className="relative overflow-hidden shadow-md mb-6">
                <img
                    src={post.featuredImage.url}
                    alt={post.title}
                    className="object-top w-full h-full rounded-t-lg"
                 />
            </div>
            <div className="px-4 lg:px-0">
                <h1 className=" text-black mb-8 text-3xl font-semibold">{post.title}</h1>
                <div className="flex items-left mb-4 lg:mb-0 w-full">
                    <div className='block lg:flex text-left items-left justify-left mb-8 w-full '>
                        <div className='flex items-left justify-left mb-4 lg:mb-0 w-full lg:w-auto mr-8'>
                            <img
                                alt={post.author.name}
                                height='30px'
                                width='30px'
                                src={post.author.photo.url}
                                className='align-middle rounded-full'
                            />
                            <p className='inline align-middle text-gray-700 ml-2 text-base'>{post.author.name}</p>
                        </div>
                        <div className='font-medium text-base text-gray-700'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>
                                {moment(post.createdAt).format('MMM DD, YYYY')}
                            </span>
                        </div>
                    </div>
                </div>

                {/* The function iteratively processes each piece of the post's content, transforming nested structures into 
                renderable elements. The outer map handles content blocks (like paragraphs or headings),
                 while the inner map processes individual elements or text pieces within those blocks.
                */}
                {post.content.raw.children.map((typeObj, index) => {
                    const children = typeObj.children.map((item, itemIndex) => getContentFragment(itemIndex, item.text, item))

                    return getContentFragment(index, children, typeObj, typeObj.type)
                })}
            </div>
        </div>
    )
}

export default PostDetail