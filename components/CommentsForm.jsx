import React, { useState, useEffect, useRef } from "react";
import { submitComment } from "@/services";

const CommentsForm = ({ slug }) => {
    const [error, setError] = useState(false); 
    const [localStorage, setLocalStorage] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    // useRef is a React Hook that lets you reference a value that’s not needed for rendering.
    // We don't need to keep these values in the state because we just want to read them and send them to GraphCMS
    const commentEl = useRef(); 
    const nameEl = useRef();
    const emailEl = useRef();
    const storeDataEl = useRef();

    // This hook retrieves the saved user name and email from the browser's localStorage if the
    // user has chosen to store it in the handleCommentSubmission function.
    useEffect(() => {
        nameEl.current.value = window.localStorage.getItem('name');
        emailEl.current.value = window.localStorage.getItem('email');
    }, [])
    

    const handleCommentSubmission = () => {
        setError(false); // Clear previous error messages
        
        const { value: comment } = commentEl.current; // Destructure the value property from the ref object (value) referring to the comment input element (the DOM element "comment").
        const { value: name } = nameEl.current;
        const { value: email } = emailEl.current;
        const { value: storeData } = storeDataEl.current;

        const commentObj = { name, email, comment, slug };

        if(!comment || !name || !email) {
            setError(true);
            return; // Stop execution
        }

        // localStorage is a web storage object that allows web applications to store data in the browser with no expiration date. 
        // This means the data stored in localStorage will persist even after the browser is closed and reopened.
        if(storeData) {
            window.localStorage.setItem('name', name);
            window.localStorage.setItem('email', email);
        } else {
            window.localStorage.removeItem('name', name);
            window.localStorage.removeItem('email', email);
        }


        // The fetch API is used to make an asynchronous HTTP request to the server-side 
        // endpoint /api/comments. Since fetch returns a Promise, you can use the 
        // .then() method to handle the response from the server.
        submitComment(commentObj) // Call the submitComment service function with the commentObj as the argument
            .then((res) => { // Once the submission is successful, execute the following callback function with the response as 'res'
                setShowSuccessMessage(true);

                setTimeout(() => { // Set up a timeout function to execute after a certain duration
                    setShowSuccessMessage(false);
                }, 3000); // After 3000 milliseconds (3 seconds), set the 'showSuccessMessage' state back to false
            })
    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
            <h3 className="text-black text-xl mb-8 font-semibold border-b pb-4">Leave a Comment</h3>
            <div className=" grid grid-cols-1 gap-4 mb-4">
                <textarea 
                    ref={commentEl} 
                    className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                    placeholder="Comment"
                    name="comment"
                />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <input 
                    type="text"
                    ref={nameEl}
                    className="mb-4 py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                    placeholder="Name"
                    name="name"
                />
                <input 
                    type="text"
                    ref={emailEl}
                    className="mb-4 py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                    placeholder="Email"
                    name="email"
                />
            </div>
            <div className="grid grid-cols-1 gap-4 mb-4">
                <div>
                    <input ref={storeDataEl} type="checkbox" id="storeData" name="storeData" value={true}/>
                    <label className="text-gray-500 cursor-pointer ml-2" htmlFor="storeData">Save my e-mail and name for the next time I comment</label>
                </div>
            </div>
            {/* This is a conditional rendering statement using the logical AND (&&) operator. It checks if the error state is 
            truthy. If error is true, the following JSX code will be rendered. Error will be handled in the handleCommentSubmission */}
            {error && <p className="text-xs text-red-500">All fields are required</p>}
            <div className="mt-8">
                <button 
                    type="button" 
                    onClick={handleCommentSubmission}
                    className=" text-white transition duration-500 ease hover:bg-indigo-900 bg-black text-lg rounded-full px-8 py-3 cursor-pointer"
                    >
                    Post Comment
                </button>
                {/* This conditional redering statement shows a success message IF showSuccessMessage if TRUE */}
                {showSuccessMessage && <span className="text-xl float-right font-semibold text-green-500">Comment submitted for review</span>}
            </div>
        </div>
    )
}

export default CommentsForm