import React, { useContext } from "react";
import Link from "next/link";

const Header = () => {
    return (
        <div className="bg-black text-white">
            <div className="container mx-auto py-2 mb-8">
                <div className="flex justify-between items-center">
                    <div className="text-red-500">
                        <Link href="/">
                            <span className="cursor-pointer font-bold text-xl">
                                Tech Tavern
                            </span>
                        </Link>
                    </div>
                    <div className="hidden md:float-left md:contents">
                        <Link href="/about">
                            <span className="cursor-pointer font-bold text-xl">
                                About
                            </span>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Header