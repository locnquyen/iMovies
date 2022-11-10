import React, { useEffect } from 'react'
import './header.scss';

import { Link, useLocation } from 'react-router-dom';
import { useRef } from 'react';

import logo from '../../assets/tmovie.png';

const headerNav = [
  {
    display: 'Home',
    path: '/'
  },
  {
    display: 'Movies',
    path: '/movie'
  },
  {
    display: 'TV Series',
    path: '/tv'
  }
];

const Header = () => {

  const { pathname } = useLocation(); //current local - pathname = '/'
  const headerRef = useRef(null);

  //trả về index đầu tiên thoả điều kiện
  const index = headerNav.findIndex(e => e.path === pathname); // 0 1 2

  useEffect(() => {

    const shrinkHeader = () => {

      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        headerRef.current.classList.add('shrink');
      } else {
        headerRef.current.classList.remove('shrink');
      }

    }

    window.addEventListener('scroll', shrinkHeader);

    return () => {
      window.removeEventListener('scroll', shrinkHeader);
    }

  }, [])


  return (
    <div ref={headerRef} className="header">
      <div className="header__wrap container">

        {/* Logo */}
        <div className="logo">
          <img src={logo} alt="" />
          <Link to="/">iMovies</Link>
        </div>
        
        {/* navbar */}
        <ul className="header__nav">
          {headerNav.map((e, i) => (
            <li key={i} className={`${i === index ? 'active' : ''}`}>
              <Link to={e.path}>
                {e.display}
              </Link>
            </li>
          ))}
        </ul>

      </div>
    </div>
  )
}

export default Header