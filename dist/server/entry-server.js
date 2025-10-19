import { j as jsxRuntimeExports, r as renderToString } from "./assets/react-vendor-BDBJ0d-v.js";
import "stream";
import "util";
function AppSSRMinimal() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Moradabad News" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Latest News & Updates" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Welcome to Moradabad News" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Get the latest news, current affairs, and updates from Moradabad and surrounding areas." })
    ] }) })
  ] });
}
function render(url) {
  const html = renderToString(/* @__PURE__ */ jsxRuntimeExports.jsx(AppSSRMinimal, {}));
  return html;
}
export {
  render
};
