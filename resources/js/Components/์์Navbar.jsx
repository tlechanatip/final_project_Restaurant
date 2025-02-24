import { Link } from '@inertiajs/react';

export default function Navbar({ auth }) {
    return (
        <header className="z-10 w-full bg-transparent shadow-md backdrop-blur-lg">
            <div className="container mx-auto flex items-center justify-between p-2">
                <img
                    src="/storage/images/logo.png"
                    alt="Logo"
                    className="h-12 w-12 rounded-full bg-white fill-current text-gray-500"
                />

                <nav className="flex space-x-4">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="rounded-md px-4 py-2 text-white hover:bg-white/20"
                        >
                            แก้ไข(Admin)
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('tables.index')}
                                className="rounded-md px-4 py-2 text-white hover:bg-white/20"
                            >
                                จองโต๊ะ
                            </Link>
                            <Link
                                href={route('menu.index')}
                                className="rounded-md px-4 py-2 text-white hover:bg-white/20"
                            >
                                เมนู
                            </Link>
                            <Link
                                href={route('login')}
                                className="rounded-md px-4 py-2 text-white hover:bg-white/20"
                            >
                                Log in
                            </Link>
                            {/* Register
                                    <Link
                                        href={route('register')}
                                        className="rounded-md px-4 py-2 text-white hover:bg-white/20"
                                    >
                                        Register
                                    </Link>
                                */}
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}
