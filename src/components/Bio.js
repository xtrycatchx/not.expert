import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex'
        }}
      >
        <p style={{ maxWidth: 510, color: '#808080' }}>
        Yo! I am <a href="https://mobile.twitter.com/xtrycatchblockx">Paul Sydney Orozco</a>, a dad, husband, employee, forever newbie and a Software Engineer.
          {' '}
        These are my (ugly) code musings, random rants and some experiments.
        </p>
      </div>
    )
  }
}

export default Bio
