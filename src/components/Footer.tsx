import { ReactChildren } from "react";

const Footer = ({ children }: { children?: ReactChildren }) => {
  return (
    <footer className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
      {children}
    </footer>
  );
};

export default Footer;
