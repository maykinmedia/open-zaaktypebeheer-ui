/**
 * Define spacing for Stack components
 */
export const spacing = { xs: 2, sm: 2, md: 3 };

/**
 * Define styling for Search field
 */
export const searchStyling = {
  '&:hover:not(&.Mui-focused) .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(0, 0, 0, 0.12)',
    backgroundColor: 'rgba(0, 0, 0, .04)',
  },
  fieldset: {
    transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    border: '1px solid rgba(0, 0, 0, 0.12)',
  },
};

/**
 * Define media queries for responsive design
 * Should be used in combination with useMediaQuery hook
 * @see https://mui.com/material-ui/react-use-media-query/
 */
export const mediaQueries = {
  mobile: '(max-width:420px)',
  largeMobile: '(max-width:600px)',
  tablet: '(max-width:768px)',
  desktop: '(max-width: 1024px)',
  largeDesktop: '(max-width: 1440px)',
};
