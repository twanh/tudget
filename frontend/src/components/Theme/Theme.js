import React from 'react'

import { ThemeProvider } from 'emotion-theming'
import theme from "@rebass/preset";
import { Global, css } from '@emotion/core'


import WebFont from 'webfontloader'

WebFont.load({
  google: {
    families: ['Lato:400,900', 'Roboto:300,400:700', 'Roboto Condensed:400,700', 'Roboto Slab: 400, 200, 700']
  }
})

const darkTheme = theme
darkTheme.colors = {
  text: '#E8E9EB',
  background: '#19202c',
  backgroundHighlight: '#5e35b17a',
  primary: '#EF6461',
  secondary: '#E4B363',
  muted: '#f6f6f9',
  gray: '#CAC9C0',
  highlight: 'hsla(205, 100%, 40%, 0.125)'
}
darkTheme.fonts = {
  body: 'Roboto',
  heading: 'Lato',
  monospace: 'Roboto Slab'
}
darkTheme.fontWeights = {
  light: 200,
  body: 400,
  heading: 900,
  bold: 700
}

const lightTheme = theme

function Theme({ children, dark }) {
  let usedTheme = darkTheme
  if (!dark) usedTheme = lightTheme

  return (
    <div>
      <Global styles={
        css`
          html {
            background-color: ${usedTheme.colors.background};
            font-family: 'Roboto';
          }
        `
      } />

      <ThemeProvider theme={usedTheme} >
        {children}
      </ ThemeProvider>
    </div>
  )

}

export default Theme;