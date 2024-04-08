import React, { useContext } from "react";
import Link from "next/link";
import { ThemeSwitcher } from ".";

const Header = () => {
    return (
        <div className="bg-black text-white">
            <div className="container mx-auto py-4 mb-8 dark:border-b border-blue-400">
                <div className="flex justify-normal">
                    <div className="text-blue-500">
                        <Link href="/">
                            <span className="cursor-pointer font-bold text-xl mr-12">
                                Tech Tavern
                            </span>
                        </Link>
                    </div>
                    <div className="hidden mx-8 md:float-left md:contents">
                        <Link href="/">
                            <span className="cursor-pointer font-bold text-xl">
                                Home
                            </span>
                        </Link>
                        <Link href="/about">
                            <span className="cursor-pointer mx-8 font-bold text-xl">
                                About
                            </span>
                        </Link>
                    <div className="ml-auto">
                        <ThemeSwitcher />
                    </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Header