import React from "react";
import { Footer } from './';
import Header2 from "./Header2";

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header2 />
            <div className="flex-grow overflow-x-hidden overflow-y-scroll">
                <div className="flex"> {/* Wrap children in a flex container */}
                    {children}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
