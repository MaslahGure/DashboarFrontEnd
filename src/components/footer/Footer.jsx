import React from 'react'

function Footer() {
  const today = new Date();
  return (
    <footer>
      
        <p> Copyright Cairo Lab &copy; {today.getFullYear()}</p>
        <hr />
    </footer>
  )
}

export default Footer