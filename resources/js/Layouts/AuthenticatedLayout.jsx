import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <>

            {/* Navigation Bar */}
            <nav className="border-b border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between items-center">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link href="/">
                                <ApplicationLogo className="h-10 w-10 rounded-full bg-white fill-current text-gray-500" />
                            </Link>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden space-x-6 sm:flex">
                            <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                เพิ่มเมนู
                            </NavLink>

                            <NavLink href={route('admin.index')} active={route().current('admin.index')}>
                                รายการเมนู
                            </NavLink>

                            <NavLink href={route('promotions.index')} active={route().current('promotions.index')}>
                                รายการโปรโมชั่น
                            </NavLink>
                            <NavLink href={route('reservations.index')} active={route().current('reservations.index')}>
                                รายการจองโต๊ะ
                            </NavLink>
                        </div>

                        {/* User Dropdown (Desktop) */}
                        <div className="hidden sm:flex sm:items-center">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex items-center bg-white px-3 py-2 rounded-md text-gray-500 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-300">
                                        {user.name}
                                        <svg className="ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                                        </svg>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">Log Out</Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="sm:hidden">
                            <button onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                className="p-2 rounded-md text-gray-400 hover:bg-gray-100 dark:text-gray-500 dark:hover:bg-gray-900">
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    {showingNavigationDropdown ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`${showingNavigationDropdown ? 'block' : 'hidden'} sm:hidden`}>
                    <div className="space-y-2 pb-3 pt-2">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            เพิ่มเมนู
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('menu.index')} active={route().current('menu.index')}>
                            เมนู
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('admin.index')} active={route().current('admin.index')}>
                            รายการเมนู
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('tables.index')} active={route().current('tables.index')}>
                            จองโต๊ะ
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('promotions.index')} active={route().current('promotions.index')}>
                            รายการโปรโมชั่น
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-gray-200 pb-3 pt-4 dark:border-gray-600">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800 dark:text-gray-200">{user.name}</div>
                            <div className="text-sm font-medium text-gray-500">{user.email}</div>
                        </div>
                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>โปรไฟล์</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">ออกจากระบบ</ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Header Section */}
            {header && (
                <header className="bg-white shadow dark:bg-white ">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            {/* Main Content */}
            <main>{children}</main>
        </>
    );
}
