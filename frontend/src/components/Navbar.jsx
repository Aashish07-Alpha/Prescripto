import React, { useState, useEffect, useRef } from 'react';
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
    const navigate = useNavigate();
    const { token, setToken, userData } = useContext(AppContext);
    const [showMenu, setShowMenu] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowProfileDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const logout = () => {
        setToken(false);
        localStorage.removeItem('token');
        setShowProfileDropdown(false);
    };

    return (
        <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
            <img onClick={() => navigate("/")} className="w-44 cursor-pointer" src={assets.logo} alt="Logo" />
            
            <ul className="hidden md:flex items-start gap-5 font-medium">
                <NavLink to="/">
                    <li className="py-1">HOME</li>
                    <hr className="border-none outline-none h-0.5 bg-primary w3/5 m-auto hidden" />
                </NavLink>
                
                <NavLink to="/doctors">
                    <li className="py-1">ALL DOCTORS</li>
                    <hr className="border-none outline-none h-0.5 bg-primary w3/5 m-auto hidden" />
                </NavLink>
                
                <NavLink to="/about">
                    <li className="py-1">ABOUT</li>
                    <hr className="border-none outline-none h-0.5 bg-primary w3/5 m-auto hidden" />
                </NavLink>
                
                <NavLink to="/contact">
                    <li className="py-1">CONTACT</li>
                    <hr className="border-none outline-none h-0.5 bg-primary w3/5 m-auto hidden" />
                </NavLink>
            </ul>
            
            <div className="flex items-center gap-4">
                {token && userData ? (
                    <div className="flex items-center gap-2 cursor-pointer relative" ref={dropdownRef}>
                        <div 
                            className="flex items-center gap-2"
                            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                        >
                            <img className="w-8 rounded-full" src={userData.image} alt="" />
                            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
                        </div>
                        
                        {/* Dropdown menu */}
                        {showProfileDropdown && (
                            <div className="absolute top-full right-0 mt-2 text-base font-medium text-gray-600 z-20 bg-stone-100 rounded shadow-lg">
                                <div className="min-w-48 flex flex-col gap-4 p-4">
                                    <p 
                                        onClick={() => {
                                            navigate('my-profile');
                                            setShowProfileDropdown(false);
                                        }} 
                                        className="hover:text-black cursor-pointer"
                                    >
                                        My Profile
                                    </p>
                                    <p 
                                        onClick={() => {
                                            navigate('my-appointments');
                                            setShowProfileDropdown(false);
                                        }} 
                                        className="hover:text-black cursor-pointer"
                                    >
                                        My Appointment
                                    </p>
                                    <p 
                                        onClick={logout} 
                                        className="hover:text-black cursor-pointer"
                                    >
                                        Logout
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <button onClick={() => navigate('/login')} className="bg-blue-500 text-white px-8 py-3 rounded-full font-light">
                        Create Account
                    </button>
                )}

                <img onClick={() => setShowMenu(true)} className="w-6 md:hidden" src={assets.menu_icon} alt="" />
                
                {/* Mobile menu */}
                <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
                    <div className="flex items-center justify-between px-5 py-6">
                        <img className="w-36" src={assets.logo} alt="" />
                        <img className="w-7" onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
                    </div>
                    <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
                        <NavLink onClick={() => setShowMenu(false)} to='/'>
                            <p className='px-4 py-2 rounded inline-block'>HOME</p>
                        </NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/doctors'>
                            <p className='px-4 py-2 rounded inline-block'>ALL DOCTORS</p>
                        </NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/about'>
                            <p className='px-4 py-2 rounded inline-block'>ABOUT</p>
                        </NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/contact'>
                            <p className='px-4 py-2 rounded inline-block'>CONTACT</p>
                        </NavLink>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;