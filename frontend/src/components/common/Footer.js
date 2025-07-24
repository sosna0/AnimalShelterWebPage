import React from "react";

/* TODO: add links to the social apps */

const Footer = () => {
    return (
        <footer className="bg-light text-center text-lg-start mt-auto">
            <div className="text-center p-3">
                © {new Date().getFullYear()} Animal Shelter.
            </div>
        </footer>
    );
}

export default Footer;