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
        Yo! I am <a href="https://mobile.twitter.com/xtrycatchblockx">Paul Sydney Orozco</a>, a dad, husband, employee, forever newbie and a Software Engineer.
          {' '}
        These are my (ugly) code musings, random rants and some experiments. .
        </p>
      </div>
    )
  }
}

export default Bio
