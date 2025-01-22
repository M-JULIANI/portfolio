import React from "react";
import { useNavigate } from "react-router-dom";
import { LayoutImage } from "./components/LayoutImage";
import { NodeInfo } from "./NodeInfo";
import { BasicMenu } from "./Menu";

export const openCV = () => window.open("assets/Marco-Juliani-Resume-2024.pdf", "_blank");
export const openGithub = () => window.open("https://github.com/M-JULIANI", "_blank");

export const openBlog = () => window.open("https://m-juliani.github.io/blog/", "_blank");

export type MenuItemInfo = {
  label: string;
  action: () => void;
  type: "page" | "link";
};

const initMenuItems = (navigate: (path: string) => void, handleClose?: () => void): MenuItemInfo[] => [
  {
    label: "About",
    action: () => {
      navigate("/about");
    },
    type: "page",
  },
  {
    label: "CV",
    action: () => {
      openCV();
      handleClose ? handleClose() : null;
    },
    type: "link",
  },
  {
    label: "Github",
    action: () => {
      openGithub();
      handleClose ? handleClose() : null;
    },
    type: "link",
  },
  {
    label: "Blog",
    action: () => {
      openBlog();
      handleClose ? handleClose() : null;
    },
    type: "link",
  },
];

export const Layout: React.FC<{ node: NodeInfo | null; children: JSX.Element; offsetFactor?: number }> = ({
  node,
  children,
  offsetFactor,
}) => {
  const navigate = useNavigate();
  const menuItems = initMenuItems(navigate);

  // Using window.matchMedia for responsive design
  const isOneCol = window.matchMedia("(min-width: 200px) and (max-width: 488px)").matches;
  const drawerHeight = 100;

  if (node == null) return null;

  return (
    <>
      <header className="fixed top-0 left-0 w-full h-[100px] bg-white shadow-md z-50">
        <div className="h-full flex justify-evenly items-cente items-center justify-center">
          <button
            className="w-[150px] h-[100px] hover:bg-gray-100 rounded-md transition-colors"
            onClick={() => navigate("/")}
          >
            <LayoutImage node={node} width={80} isThumbnail={true} />
          </button>

          {isOneCol ? (
            <BasicMenu menuItems={menuItems} />
          ) : (
            <>
              {menuItems.map((m) => (
                <button
                  key={m.label}
                  onClick={m.action}
                  className="px-4 py-2 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <span className="text-gray-800 font-medium font-space-mono">{m.label}</span>
                </button>
              ))}
            </>
          )}
        </div>
      </header>

      <main
        className="flex items-center justify-center"
        style={{
          position: "relative",
          top: `${drawerHeight * (offsetFactor ?? 1)}px`,
        }}
      >
        {children}
      </main>
    </>
  );
};
