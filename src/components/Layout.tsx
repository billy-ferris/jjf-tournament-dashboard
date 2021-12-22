import { FC } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { MessageList, useMessage } from "../lib/message";

type LayoutProps = {
  usePadding?: boolean;
  useBackdrop?: boolean;
};

const Layout: FC<LayoutProps> = ({ children, usePadding, useBackdrop }) => {
  const { messages } = useMessage();

  return (
    <>
      <Header />
      <main
        className={`w-full h-screen mx-auto relative ${
          usePadding && "px-2 sm:px-6 lg:px-8"
        } ${useBackdrop && "bg-gray-200"}`}
      >
        <MessageList messages={messages} />
        {children}
      </main>
      <Footer />
    </>
  );
};

Layout.defaultProps = {
  usePadding: true,
  useBackdrop: false,
};

export default Layout;
