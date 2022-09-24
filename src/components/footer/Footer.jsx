import React from 'react'

function Footer() {
  const today = new Date();
  return (
    <footer className='fixed bottom-0 bg-slate-300 w-full text-center p-2'>
      
        <p> Copyright Cairo Lab &copy; {today.getFullYear()}</p>
    </footer>
  )
}

export default Footer