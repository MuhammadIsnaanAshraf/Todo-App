import React from 'react'

export const Navbar = () => {
    return (
        <>
            <nav className='flex justify-around bg-cyan-500  text-white font-bold text-xl py-2'>

            
            <div className="logo">
                <span className='font-serif cursor-pointer'>eTodo</span>
            </div>
            <div className="nav-items">
                    <ul className='flex gap-8' >
                        <li className='cursor-pointer hover:text-'>Home</li>
                        <li className='cursor-pointer'>Add Todo</li>
                </ul>
            </div>
      </nav>
      </>
  )
}
