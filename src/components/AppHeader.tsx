
import React from "react";
import Logo from "./Logo";

const AppHeader: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-border z-30">
      <div className="container mx-auto flex justify-center items-center py-4 px-4 max-w-3xl">
        <Logo variant="horizontal" size="md" />
      </div>
    </header>
  );
};

export default AppHeader;
