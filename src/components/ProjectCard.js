import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
var ProjectCard = function (_a) {
    var title = _a.title, tags = _a.tags, imageUrl = _a.imageUrl;
    return (_jsxs(_Fragment, { children: [imageUrl && _jsx("img", { src: imageUrl, alt: title, className: "card-image" }), _jsxs("div", { className: "card-content", children: [_jsx("h2", { className: "card-title", children: title }), _jsx("div", { className: "card-tags", children: tags.map(function (tag, index) { return (_jsx("span", { className: "card-tag", children: tag }, index)); }) })] })] }));
};
export default ProjectCard;
