import { ReactChildren } from "react";

const Header = ({ children }: { children?: ReactChildren }) => {
  return (
    <header className="mx-auto max-w-7xl sm:px-6 lg:px-8">{children}</header>
  );
};

export default Header;
