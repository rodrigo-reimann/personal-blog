/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Link from "next/link";
import { ThemeSwitcher } from ".";
import { disablePageScroll, enablePageScroll } from 'scroll-lock';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Header2 = () => {
    const links = [
        { href: '/', title: 'Home' },
        { href: '/about', title: 'About'},
    ];

    const [openNavigation, setOpenNavigation] = useState(false);
    
    const toggleNavigation = () => {
        if (openNavigation) {
            setOpenNavigation(false);
            enablePageScroll();
        } else {
            setOpenNavigation(true);
            disablePageScroll();
        }
    };

    // This function auto-closes the openNavigation when the user clicks a link in an openNavigation state
    const handleClick = () => {
        if (!openNavigation) return;

        enablePageScroll();
        setOpenNavigation(false);
    }

    return (
        <div className="w-full z-50 bg-black text-white border-b border-n-6 relative mb-10">
            <div className="px-5 md:px-7.5 xl:px-10 max-lg:py-2">
                <div className="flex items-center justify-between">
                    <button
                        className={`md:hidden`}
                        onClick={toggleNavigation}
                    >
                        <FontAwesomeIcon icon={faBars} openNavigation={openNavigation} />
                    </button>
                </div>
                <nav className={`${openNavigation ? 'flex' : 'hidden'} bg-n-8 md:static md:flex md:mx-auto pt-4`}>
                    <Link href="/" className="">
                            <img src="/logo.png" width={120} height={40} alt='Tech Tavern' className="mr-2" /> {/* Adjust margin for spacing */}
                    </Link>
                    <div className="relative z-2 flex flex-col items-center justify-center m-auto md:flex-row">
                        {links.map((link, index) => (
                            <a 
                                key={index}
                                href={link.href}
                                onClick={handleClick}
                                className="block relative text-sm font-semibold uppercase transition-colors hover:text-blue-600 px-6 py-6 md:py-4 md:-mr-0.25 md:text-sm md:font-semibold"
                            >
                                {link.title}
                            </a>
                        ))}
                        <div className="md:hidden mt-2"> {/* Theme switcher for mobile menu */}
                            <ThemeSwitcher />
                        </div>
                    </div>
                    <div className="hidden md:block"> {/* Theme switcher for larger screens */}
                        <ThemeSwitcher />
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Header2;
