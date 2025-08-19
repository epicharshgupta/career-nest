import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';


const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-4">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm text-gray-600">
          © 2025 Job Portal. All Rights Reserved. |{" "}
          <a href="/privacy" className="text-blue-500 hover:underline">
            Privacy Policy
          </a>{" "}
          |{" "}
          <a href="/terms" className="text-blue-500 hover:underline">
            Terms of Service
          </a>
        </p>
        <div className="flex justify-center mt-2 space-x-4">
          <a
            href="#"
            className="text-gray-600 hover:text-blue-500"
            aria-label="Facebook"
          >
            <i className="fab fa-facebook text-lg"></i>
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-blue-500"
            aria-label="Twitter"
          >
            <i className="fab fa-twitter text-lg"></i>
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-blue-500"
            aria-label="LinkedIn"
          >
            <i className="fab fa-linkedin text-lg"></i>
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-blue-500"
            aria-label="Instagram"
          >
            <i className="fab fa-instagram text-lg"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
