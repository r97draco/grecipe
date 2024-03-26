import { FaGithub } from "react-icons/fa"; // Import FaGithub component

function Footer() {
  return (
    <footer className="text-gray-600 body-font">
      <div className="container flex flex-col items-center px-5 py-8 mx-auto sm:flex-row">
        <p className="flex items-center justify-center font-medium text-gray-900 title-font md:justify-start">
          <img
            src="/favicon.ico" // Use the relative URL to the favicon.ico file in the public directory
            alt="Grecipe Logo"
          />
          <span className="ml-3 text-xl">Grecipe</span>
        </p>
        <p className="mt-4 text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0">
          © 2024 Grecipe INC.
        </p>
        <span className="inline-flex justify-center mt-4 sm:ml-auto sm:mt-0 sm:justify-start">
          <a
            className="ml-3 text-gray-500"
            href="https://github.com/r97draco/grecipe"
          >
            <FaGithub size={25} /> {/* Use FaGithub component here */}
          </a>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
