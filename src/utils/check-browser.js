const isSSR = typeof navigator !== 'undefined';

export const isSafari = isSSR ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent) : false;
