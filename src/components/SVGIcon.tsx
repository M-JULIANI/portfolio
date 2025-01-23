import React from "react";

interface SVGIconProps {
  iconPath: string;
  size?: number;
  color?: string;
  className?: string;
}

const SVGIcon: React.FC<SVGIconProps> = ({
  size = 24, // Default size of 24px is common for icons
  color = "currentColor", // Inherits color from parent by default
  className = "",
  iconPath,
}) => {
  // Check if the input is a complete SVG string
  const isSVGString = iconPath.trim().startsWith("<svg");

  if (isSVGString) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`svg-icon ${className}`}
        dangerouslySetInnerHTML={{ __html: iconPath }}
      />
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`svg-icon ${className}`}
      aria-hidden="true"
    >
      {iconPath ? (
        <path d={iconPath} />
      ) : (
        <path d="M12 4v16m-8-8h16" /> // Default "plus" icon if name not found
      )}
    </svg>
  );
};

export default SVGIcon;
