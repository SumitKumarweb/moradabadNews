import React from 'react'
import { renderToString } from 'react-dom/server'
import AppSSRMinimal from './AppSSRMinimal'

export function render(url) {
  const html = renderToString(<AppSSRMinimal />)
  return html
}
