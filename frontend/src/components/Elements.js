import React from 'react'

import { Box } from 'rebass'

export const AccountBox = props => (
  <Box
    {...props}
    sx={{
      padding: 2,
      backgroundColor: 'backgroundHighlight',
      boxShadow: '2px 3px 0px 0px rgba(255, 255, 255, 0.125)',
      marginRight: 2,
      marginTop: 3,
      minWidth: '100px',
      cursor: 'pointer',
      ':hover': {
        boxShadow: '3px 3px 1px 0px #49346f',
      }
    }}

  />
)

// 2px 2px 3px 2px rgba(0,0,0,.125);
// box-sizing: border-box;
// margin: 0;
// min-width: 0;
// background-color: #5e35b17a;
// padding: 10px;
// margin-right: 5px;
// box-shadow: 2px 2px 3px 2px rgba(0,0,0, .125);
// margin-top: 20px;
