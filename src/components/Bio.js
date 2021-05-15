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
        These are my (ugly) code musings, random rants and some experiments. If you like the contents and wish to donate ₿itcoin, its at <a href="https://www.blockchain.com/btc/address/3KM3ArLmdFCvGvyp77DbBcvBgNrw58LoFM">3KM3ArLmdFCvGvyp77DbBcvBgNrw58LoFM</a> 
        </p>
      </div>
    )
  }
}

export default Bio
