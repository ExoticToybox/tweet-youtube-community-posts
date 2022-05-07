//@ts-check
/** @type {string} */
const xmlns = "http://www.w3.org/2000/svg";

/**
 * Creates SVG Icon of Twitter
 * @returns {Element} SVG
 */
const createTwitterIconSVG = () => {
  /** @type {Element} */
  const path = document.createElementNS(xmlns, "path");
  path.setAttribute("class", "style-scope yt-icon");
  path.setAttribute(
    "style",
    "stroke:none;fill-rule:nonzero;fill:rgb(128,128,128);fill-opacity:1;"
  );
  path.setAttribute(
    "d",
    "M 15 3.296875 C 14.476562 3.523438 13.949219 3.691406 13.367188 3.746094 C 13.949219 3.410156 14.417969 2.84375 14.648438 2.226562 C 14.066406 2.5625 13.484375 2.789062 12.84375 2.902344 C 12.257812 2.339844 11.5 2 10.683594 2 C 9.109375 2 7.824219 3.242188 7.824219 4.765625 C 7.824219 4.988281 7.824219 5.214844 7.882812 5.386719 C 4.875 5.386719 2.8125 3.691406 1.414062 2 C 1.121094 2.394531 1.003906 2.902344 1.003906 3.410156 C 1.003906 4.367188 1.53125 5.214844 2.289062 5.722656 C 1.820312 5.667969 1.355469 5.554688 1.003906 5.386719 C 1.003906 5.386719 1.003906 5.386719 1.003906 5.441406 C 1.003906 6.796875 1.996094 7.921875 3.28125 8.148438 C 3.046875 8.203125 2.8125 8.261719 2.519531 8.261719 C 2.347656 8.261719 2.171875 8.261719 1.996094 8.207031 C 2.347656 9.335938 3.976562 10.632812 5.257812 10.632812 C 4.265625 11.363281 3.34375 12 1.5 12 C 1.265625 12 1.453125 12 1 12 C 2.28125 12.789062 3.800781 13 5.375 13 C 10.683594 13 13.542969 8.769531 13.542969 5.101562 C 13.542969 4.988281 13.542969 4.878906 13.542969 4.765625 C 14.125 4.367188 14.59375 3.863281 15 3.296875 "
  );

  /** @type {Element} */
  const g = document.createElementNS(xmlns, "g");
  g.id = "surface269867";
  g.setAttribute("class", "style-scope yt-icon");
  g.setAttribute("color", "gray");
  g.appendChild(path);

  /** @type {Element} */
  const svg = document.createElementNS(xmlns, "svg");
  svg.setAttribute("viewbox", "0 0 16 16");
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
  svg.setAttribute("focusable", "false");
  svg.setAttribute("class", "style-scope yt-icon");
  svg.setAttribute(
    "style",
    "pointer-events: none; display: block; width: 16; height: 16;"
  );
  svg.appendChild(g);
  return svg;
};

/**
 * Adds tweet button enabling to tweet text
 * @param {Node} toolbar - div#toolbar
 * @param {string} text - text for tweet
 */
const addTweetButton = (toolbar, text) => {
  /** @type {Node} yt-icon-button#button */
  const ytIconButton =
    toolbar.lastChild./** @type {Node}, empty text in div#toolbar */
    previousSibling./** @type {Node}, div#reply-button-end */
    firstChild./** @type {Node}, empty text in div#author-thumbnail */
    nextSibling./** @type {Node}, ytd-button-renderer */
    firstChild./** @type {Node}, a.yt-simple-endpoint.style-scope.ytd-button-renderer */
    firstChild./** @type {Node}, yt-icon-button#button */
    cloneNode(false);
  ytIconButton.appendChild(createTwitterIconSVG());
  ytIconButton.addEventListener("click", (event) => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}`;
    const w = 640;
    const h = 360;
    const x = (screen.width - w) / 2;
    const y = (screen.height - h) / 2;
    window.open(
      url,
      null,
      `left=${x},top=${y},width=${w},height=${h},status=no`
    );
  });
  toolbar.appendChild(ytIconButton);
};

// @ts-ignore
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  /** @type {HTMLCollectionOf<Element>} */
  const contents = document.getElementsByTagName(
    "ytd-backstage-post-thread-renderer"
  );
  Array.prototype.forEach.call(
    contents,
    (
      /** @type {Node} ytd-backstage-post-thread-renderer.ytd-item-section-renderer */
      content
    ) => {
      /** @type {Node} div#main */
      const main =
        content.firstChild
          ./** @type {Node}, unvisible HTML comment */
          nextSibling./** @type {Node}, div#post */ firstChild
          ./** @type {Node}, ytd-backstage-post-renderer.ytd-backstage-post-thread-renderer */
          firstChild./** @type {Node}, unvisible HTML comment */ nextSibling
          ./** @type {Node}, div#body */
          firstChild./** @type {Node}, empty text in div#body */ nextSibling
          ./** @type {Node}, div#author-thumbnail */
          nextSibling
          ./** @type {Node}, empty text in div#author-thumbnail */
          nextSibling;
      /** @type {Node} div#toolbar */
      const toolbar =
        main.lastChild
          ./** @type {Node}, empty text in div#main */
          previousSibling
          ./** @type {Node}, ytd-comment-action-buttons-renderer#action-buttons */
          firstChild./** @type {Node}, unvisible HTML comment */ nextSibling;
      /** @type {string} */
      const text =
        main./** @type {Node}, div#main */ firstChild
          ./** @type {Node}, empty text in div#main */
          nextSibling./** @type {Node}, div#header */ nextSibling
          ./** @type {Node}, empty text in div#header */
          nextSibling./** @type {Node}, div#expander */ firstChild
          ./** @type {Node}, unvisible HTML comment */
          nextSibling./** @type {Node}, div#content */ firstChild
          ./** @type {Node}, empty text in div#content */
          nextSibling
          ./** @type {Node}, yt-formatted-string#voted-option */
          nextSibling
          ./** @type {Node}, yt-formatted-string#content-text */
          textContent;
      addTweetButton(toolbar, text);
    }
  );
});
