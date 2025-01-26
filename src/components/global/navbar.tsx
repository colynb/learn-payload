'use client'
import React, { useState } from 'react'
import { Menu, X, Phone, MapPinnedIcon } from 'lucide-react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-brand-primary text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4 lg:h-32 gap-3 flex-row md:flex-col lg:flex-row">
          {/* Logo and Brand */}
          <div className="flex items-center font-display font-black text-3xl gap-1">
            <MapPinnedIcon className=" text-brand-accent" size={32} />
            <div>
              <span>EastTenn</span>
              <span className="text-brand-accent">Homez</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 text-lg">
            <a
              href="#about"
              className="hover:text-brand-accent font-black transition-all antialiased"
            >
              ABOUT
            </a>
            <a
              href="#blog"
              className="hover:text-brand-accent font-black transition-all antialiased"
            >
              BLOG
            </a>
            <a
              href="#properties"
              className="hover:text-brand-accent font-black transition-all antialiased"
            >
              PROPERTIES
            </a>
            <a
              href="#book"
              className="hover:text-brand-accent font-black transition-all antialiased"
            >
              BOOK A CALL
            </a>
            <a
              href="tel:(800)555-6666"
              className="flex items-center text-brand-accent font-black transition-all antialiased"
            >
              <Phone className="h-4 w-4 mr-2" />
              (800) 555-6666
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white hover:text-brand-accent">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#about" className="block px-3 py-2 hover:bg-slate-800 rounded">
                ABOUT
              </a>
              <a href="#blog" className="block px-3 py-2 hover:bg-slate-800 rounded">
                BLOG
              </a>
              <a href="#properties" className="block px-3 py-2 hover:bg-slate-800 rounded">
                PROPERTIES
              </a>
              <a href="#book" className="block px-3 py-2 hover:bg-slate-800 rounded">
                BOOK A CALL
              </a>
              <a
                href="tel:(800)555-6666"
                className="px-3 py-2 text-brand-accent hover:bg-slate-800 rounded flex items-center"
              >
                <Phone className="h-4 w-4 mr-2" />
                (800) 555-6666
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
