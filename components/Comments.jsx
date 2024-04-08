import React, {useState, useEffect} from "react";
import moment from "moment";
import parse from 'html-react-parser';
import { getComments } from "@/services";

// Receive the slug as a prop from the parent [slug].js component
const Comments = ({ slug }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        getComments(slug)
            .then((result) => setComments(result))
    }, [slug])

    return (
        <div>
            <div className="shadow-lg rounded-lg p-8 pb-12 mb-8 dark:bg-gray-800 dark:text-white">
                <h3 className="text-xl font-semibold border-b pb-4">
                    {comments.length > 1 || comments.length === 0 ? (
                        <div>
                            {comments.length} Comments
                        </div>
                    ) : (
                        <div>
                            {comments.length} Comment
                        </div>
                    )}
                </h3>
                {comments.map((comment) => (
                    <div className="border-b border-gray-100 mb-4 pb-4" key={comment.createdAt}>
                        <p className="mb-4">
                            <span className="font-semibold">{comment.name}</span>
                            {' '}
                            on
                            {' '}
                            {moment(comment.createdAt).format('MMM DD YYYY')}
                        </p>
                        <p className="text-base whitespace-pre-line text-gray-600 w-full dark:text-white">
                            {parse(comment.comment)}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Comments