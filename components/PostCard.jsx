/* eslint-disable @next/next/no-img-element */
import React from 'react';
import moment from 'moment';
import Link from 'next/link';

const PostCard = ({post}) => {
    console.log(post);
    return (
        <div className='p-8 lg:p-10 pb-12 mb-8 shadow-lg dark:bg-gray-800 dark:rounded-lg dark:text-white'>
            <div className='relative overflow-hidden pb-80 mb-6'>
                <img 
                    src={post.featuredImage.url} 
                    alt={post.title}
                    className='object-top absolute h-80 w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg'
                />
            </div>
            <h1 className='transition duration-100 mb-8 cursor-pointer hover:text-blue-700 text-3xl font-semibold'>   
                <Link href={`/post/${post.slug}`}>{post.title}</Link>
            </h1>
            <div className='block lg:flex text-left items-left justify-left mb-8 w-full'>
                <div className='flex items-left justify-left mb-4 lg:mb-0 w-full lg:w-auto mr-8'>
                    <img
                        alt={post.author.name}
                        height='30px'
                        width='30px'
                        src={post.author.photo.url}
                        className='rounded-full'
                    />
                    <p className='inline text-gray-700 ml-2 text-base dark:text-white'>{post.author.name}</p>
                </div>
                <div className='font-medium ml-1 text-base text-gray-700 dark:text-white'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className='ml-1'>
                        {moment(post.createdAt).format('MMM DD, YYYY')}
                    </span>
                </div>
            </div>
            <p className='text-left text-base font-normal px-4 lg:px-2 mb-8'>{post.excerpt}</p>
            <div className='text-left'>
                <Link href={`/post/${post.slug}`}>
                    <span className='transition duration-100 bg-black hover:bg-blue-800 text-base font-medium rounded-full text-white px-8 py-3 cursor-pointer'>
                        Continue Reading
                    </span>
                </Link>
            </div>
        </div>
    )
}

export default PostCard