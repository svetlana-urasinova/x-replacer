// ==UserScript==
// @name         X-Replacer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Replace the new X logo with the old bird logo on Twitter.
// @author       spacefugu
// @match        https://twitter.com/*
// @match        https://X.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitter.com
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const X_LOGO_PATH =
    'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z';

  const BIRD_LOGO_PATH =
    'M221.95 51.29c.15 2.17.15 4.34.15 6.53 0 66.73-50.8 143.69-143.69 143.69v-.04c-27.44.04-54.31-7.82-77.41-22.64 3.99.48 8 .72 12.02.73 22.74.02 44.83-7.61 62.72-21.66-21.61-.41-40.56-14.5-47.18-35.07 7.57 1.46 15.37 1.16 22.8-.87-23.56-4.76-40.51-25.46-40.51-49.5v-.64c7.02 3.91 14.88 6.08 22.92 6.32C11.58 63.31 4.74 33.79 18.14 10.71c25.64 31.55 63.47 50.73 104.08 52.76-4.07-17.54 1.49-35.92 14.61-48.25 20.34-19.12 52.33-18.14 71.45 2.19 11.31-2.23 22.15-6.38 32.07-12.26-3.77 11.69-11.66 21.62-22.2 27.93 10.01-1.18 19.79-3.86 29-7.95-6.78 10.16-15.32 19.01-25.2 26.16z';

  const BIRD_LOGO_VIEWBOX = '0 0 248 204';

  const BIRD_LOGO_FAVICO =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABDlBMVEUAAAAAgP8AquoEqPMEqPQDqfQDqfQDqfMAqvcEqfMArfUEqPQDqPUArvICqfQDqfQEqfQEqfQDqfQA//8DqfQDqPMDqfQCqvQDqPUDqPMDqfQDqfQEqfMAtv8DqfQArfYCqfQDqfUDqfQAmf8EqvQAp/UCqfQDqfQDqfMDqvMAqvIEqPQEqPQAr+8DqvQCqvQDqfQDqfQDqfQDqfQFqvQDqfQDqfQDqfMDqfQEqfQApfADqfUDqvQDqfQAn/8DqfQDqPUEp/MEqfQGpvQDqvQDqfQFqPUDqvQDqfQEqvMDqPQCqfQFp/UDqfQEqfQApO0As/8DqvQDqfUDqfQCqfQAqv8AqvMEqfMDqfT///+oALeJAAAAWHRSTlMAAgyB2vrlmh4+GZBPE9LskdXAAeFSqdFMVfX9hQfiHNPcXAVFGnTol1cnRooQwnXpuvu4MPzfU/aMEVDI+Ajkk0DZLrP3MmDwP2HNMeaPDgpd88l5AypBRoDRRQAAAAFiS0dEWZqy9BgAAAAJcEhZcwAACdcAAAnXAbFuF7cAAAAHdElNRQfnBxkKNiTgLLXtAAAA3klEQVQ4y92RZRLCMBCFg0Nxl+JQ3N3d3cn9TwJ0aJM0nID3682+bzObXQD+RzLMyxVKlVqjBUDHoKLeIFqjCX5ktlhtdgQ4VE7BuuBXbo8XAT7I+gO8Y1gBYIMhBITfhUg09nZxIYcmDhsswZeSqXQmKwI5/BP5AqRUxAB7qVyhgCi+hyr9AMzgQK1O5Q1ylc2WFGiTQKfbI/M+RwKDoeSBkfRcYx+RT+TUQaezOcrni183X4qDrtZ0ymy2Yr9jJ0115T02/+FI95/O1Quf1q83DvzW/fFsZncn8J96Ad9EXc7vor5RAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIzLTA3LTI1VDEwOjU0OjM2KzAwOjAw2VPSvwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMy0wNy0yNVQxMDo1NDozNiswMDowMKgOagMAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAV3pUWHRSYXcgcHJvZmlsZSB0eXBlIGlwdGMAAHic4/IMCHFWKCjKT8vMSeVSAAMjCy5jCxMjE0uTFAMTIESANMNkAyOzVCDL2NTIxMzEHMQHy4BIoEouAOoXEXTyQjWVAAAAAElFTkSuQmCC';

  function getExistingIcon() {
    return document.querySelector(
      "link[rel='icon'], link[rel='shortcut icon']"
    );
  }

  function createBase64IconElement(href) {
    const iconElement = document.createElement('link');

    iconElement.setAttribute('rel', 'shortcut icon');
    iconElement.setAttribute('type', 'image/x-icon');
    iconElement.setAttribute('href', href);

    return iconElement;
  }

  function replaceXIcon() {
    const xIconElement = getExistingIcon();

    if (xIconElement) {
      document.head.removeChild(xIconElement);
    }

    const birdIconElement = createBase64IconElement(BIRD_LOGO_FAVICO);

    document.head.appendChild(birdIconElement);
  }

  function checkIfPathIsX(pathElement) {
    return pathElement.getAttribute('d') === X_LOGO_PATH;
  }

  function updateXPath(pathElement) {
    pathElement.setAttribute('d', BIRD_LOGO_PATH);
    pathElement.setAttribute('fill', 'currentColor');
  }

  function updateXSvg(svgElement) {
    svgElement.setAttribute('viewBox', BIRD_LOGO_VIEWBOX);
  }

  function updateAllXSvgs() {
    const svgElements = document.querySelectorAll('svg');

    for (const svgElement of svgElements) {
      const pathElement = svgElement.querySelector('path');

      if (pathElement && checkIfPathIsX(pathElement)) {
        updateXSvg(svgElement);

        updateXPath(pathElement);
      }
    }
  }

  function startXObserver() {
    const observer = new MutationObserver(updateAllXSvgs);

    const observerOptions = {
      childList: true,
      attributes: true,
      subtree: true,
    };

    observer.observe(document, observerOptions);
  }

  startXObserver();

  window.addEventListener('load', function () {
    replaceXIcon();
  });
})();
