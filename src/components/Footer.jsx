import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-col text-xl justify-center items-center mt-20 mb-4 bg-base-100 mx-auto lg:mt-12 lg:flex-row lg:px-20 lg:justify-start">
      <p className="hidden lg:block lg:mr-12">&copy; 2024</p>
      <a
        href="https://twitter.com"
        target="_blank"
        className="lg:mr-12"
        rel="noopener noreferrer"
      >
        Twitter
      </a>
      <a
        href="https://linkedin.com"
        target="_blank"
        className="lg:mr-12"
        rel="noopener noreferrer"
      >
        Linkedin
      </a>
      <a
        href="https://mail.google.com"
        target="_blank"
        className="lg:mr-12"
        rel="noopener noreferrer"
      >
        Email
      </a>
      <a
        href="https://rss.com"
        target="_blank"
        className="lg:mr-12"
        rel="noopener noreferrer"
      >
        RSS feed
      </a>
      <a
        href="https://feedly.com"
        target="_blank"
        className="lg:mr-12"
        rel="noopener noreferrer"
      >
        Add to Feedly
      </a>
      <p className="block mt-4 lg:hidden">&copy; 2024</p>
    </footer>
  );
};

export default Footer;
