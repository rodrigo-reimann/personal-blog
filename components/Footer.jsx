import React from 'react';

const Footer = () => {
    return (
        <footer className='py-4 text-center dark:text-white'>
            <p className="text-sm">© {new Date().getFullYear()} Tech Tavern. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
