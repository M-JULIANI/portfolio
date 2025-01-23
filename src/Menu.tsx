import * as React from "react";
import { MenuItemInfo } from "./Layout";

type MenuProps = {
  menuItems: MenuItemInfo[];
};

export const BasicMenu: React.FC<MenuProps> = ({ menuItems }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Menu
      </button>

      {isOpen && (
        <div className="absolute z-10 w-48 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {menuItems.map((m, index) => (
              <button
                key={index}
                className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                onClick={() => {
                  setIsOpen(false);
                  m.action();
                }}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
