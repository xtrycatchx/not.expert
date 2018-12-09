import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import { rhythm } from '../utils/typography'

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2.5),
        }}
      >
        <p style={{ maxWidth: 500 }}>
        Yo! I am <a href="https://mobile.twitter.com/xtrycatchblockx">Paul Sydney Orozco</a>, a Software Engineer.
          {' '}
          This is the ugliest tech/programming blog ever created. Im using this to log my personal learnings, attempts, experiments with various technologies that fascinates me.
        </p>
      </div>
    )
  }
}

export default Bio
