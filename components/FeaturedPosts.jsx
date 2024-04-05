/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react'
import moment from 'moment'
import Link from 'next/link'
import { getFeaturedPosts } from '@/services';

const FeaturedPosts = () => {
    const [featuredPosts, setfeaturedPosts] = useState([]);

    useEffect(() => {
            getFeaturedPosts()
                .then((result) => setfeaturedPosts(result))
    }, [])

    return (
        <div className='bg-white shadow-lg rounded-lg p-8 mb-8'>
            <h3 className='text-xl text-black mb-8 font-semibold border-b pb-4'>
                Most Popular Pages
            </h3>
            {featuredPosts.map((post) => (
                <div key={post.title} className='flex items-center w-full mb-4'>
                    <div className='w-16 flex-none'>
                        <img
                            alt={post.title}
                            height="60px"
                            width="60px"
                            className='align-middle rounded-full'
                            src={post.featuredImage.url}
                        />
                    </div>
                    <div className='flex-grow ml-4'>
                        <Link href={`/post/${post.slug}`} key={post.title} className='text-md text-black hover:underline'>
                            {post.title}
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default FeaturedPosts