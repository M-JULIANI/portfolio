import { FC } from "react";

export const Pill: FC<{ tag: string }> = ({ tag }) => {
  return (
    <span
      key={tag}
      className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-['Space_Mono'] text-[#747474] bg-white truncate shadow-sm shadow-black/10"
    >
      {tag}
    </span>
  );
};
