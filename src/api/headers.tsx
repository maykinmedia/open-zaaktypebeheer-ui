const CSRFTokenHeaderName = 'X-CSRFToken';

/**
 * Extract the CSRF Token from the `document.cookie` string.
 * @todo Add to 'utils/extract.tsx' after merge
 */
let cookieToken = document.cookie.match(new RegExp('(^| )' + 'csrftoken' + '=([^;]+)'));

const factoryHeader = (headerName: string, headerValue: any) => {
  return {
    headerName: headerName,
    value: headerValue,
    getValue() {
      return headerValue;
    },
    setValue(value: any) {
      headerValue = value;
    },
  };
};

/**
 * Global module-scoped variable to track the value of the CSRF Token.
 *
 * Embedders can set the CSRF Token value, which allows admin users to be recognized
 * so they can use demo auth plugins (as one use case example).
 *
 * The Open Zaaktype Beheer includes the value of the CSRF Token as a header in fetch api
 * calls if it's set.
 */
let CSRFToken = factoryHeader(CSRFTokenHeaderName, cookieToken ? cookieToken[2] : null);

export { CSRFToken };
