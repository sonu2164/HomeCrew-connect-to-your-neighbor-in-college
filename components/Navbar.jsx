import React from 'react'
import { useAuth } from "../context/authContext";
import { useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import Router from 'next/router';
import Image from 'next/image';
import logo from  "../public/logo.png"



const Navbar = () => {
  const { currentUser, isLoading, signOut } = useAuth();
  const [openMenu, setOpenMenu] = useState(false);
 

  return (
    <div>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">

              <button type="button" className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                <span className="sr-only">Open main menu</span>


                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>

                <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <Image className="block h-8 w-auto lg:hidden" src={logo} alt="handshake" />
                <Image className="hidden h-8 w-auto lg:block" src={logo} alt="handshake" />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {currentUser &&
                    <a href="neighbors" className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Neighbor</a>}
                  {currentUser && <a href="chats" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Chat</a>}
                  <a href="#Features" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Features</a>
                  <a href="#About" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">About</a>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button type="button" className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="sr-only">View notifications</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>
              </button>
              {currentUser ? (<ClickAwayListener onClickAway={() => setOpenMenu(false)}>
                <div className="relative ml-3">
                  <div>
                    <button type="button" className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true" onClick={() => setOpenMenu(true)}>
                      <span className="sr-only">Open user menu</span>
                      <img className="h-8 w-8 rounded-full" src={currentUser ? currentUser.photoURL : "data:image/png;base64,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"} alt="" />
                    </button>
                  </div>



                  <div className={`${!openMenu && "hidden"} absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">

                    <a href="profile" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</a>

                    <button onClick={() => {
                      signOut()
                      Router.push("/login")

                    }} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</button>
                  </div>
                </div>
              </ClickAwayListener>
              ) : (<button onClick={() => Router.push("/login")} className=''>Login</button>)}
            </div>
          </div>
        </div>


        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">

            {currentUser &&
              <a href="neighbors" className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Neighbor</a>}
            {currentUser && <a href="chats" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Chat</a>}
            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Features</a>
            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">About</a>
          </div>
        </div>
      </nav>

    </div>
  )
}

export default Navbar