import { PortraitImage } from "./components/PortraitImage";
import { Layout } from "./Layout";
import { NodeInfo } from "./NodeInfo";
import SVGIcon from "./components/SVGIcon";
import { github, linkedin, twitter } from "./assets/iconPaths";
import { useHomeState } from "./contexts/windowContext";

export const About: React.FC<{ node: NodeInfo | null }> = ({ node }) => {
  const { windowState } = useHomeState();
  const { singleColumn } = windowState;
  if (node == null) return null;

  const about = node?.children?.find((x) => x.type === "image") || ({} as NodeInfo);
  const items = [
    {
      icon: <SVGIcon iconPath={linkedin} />,
      src: "https://www.linkedin.com/in/marco-juliani-6a09a953",
    },
    {
      icon: <SVGIcon iconPath={twitter} />,
      src: "https://twitter.com/_m_juliani",
    },
    {
      icon: <SVGIcon iconPath={github} />,
      src: "https://github.com/M-JULIANI",
    },
  ];

  const paragraphs = (about?.props?.content || "").split(/(?:\n\n|  )/);

  return (
    <Layout node={node} offsetFactor={singleColumn ? 1.0 : 0.5}>
      <div className="w-full h-full pb-12 pt-12 sm:pt-16 md:pt-24 grid">
        <div className="flex flex-col items-center">
          <h1 className="sr-only">About Marco Juliani</h1>
          <div className="w-[90%] max-w-3xl h-auto aspect-[3/1]">
            <PortraitImage node={about} />
          </div>
          <div className="w-[90%] max-w-lg mx-auto py-8 sm:py-12 md:py-16 font-roboto">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="w-full break-words mb-4 text-justify" tabIndex={0}>
                {paragraph}
              </p>
            ))}
          </div>
          <div className="flex w-full items-center justify-center gap-12">
            {items.map((x, index) => {
              return (
                <button key={index} onClick={() => handleOpen(x.src)} aria-label={`Visit ${new URL(x.src).hostname}`}>
                  {x.icon}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

const handleOpen = (src: string) => {
  window.open(src, "_blank");
};
