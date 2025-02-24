import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, promotions }) {
    return (
        <>
            <Head title="Welcome" />

            {/* Background */}
            <div
                className="fixed inset-0 h-screen w-screen bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: 'url(/storage/image_welcome/m1.jpg)',
                }}
            ></div>

            {/* Overlay */}
            <div className="fixed inset-0 bg-black/40 backdrop-blur-md"></div>

            {/* Content */}
            <div className="relative flex min-h-screen flex-col">
                {/* Navbar */}
                <header className="z-10 w-full bg-transparent shadow-md backdrop-blur-lg">
                    <div className="container mx-auto flex items-center justify-between p-4">
                        <img
                            src="/storage/images/logo.png"
                            alt="Logo"
                            className="h-12 w-12 rounded-full bg-white fill-current text-gray-500"
                        />

                        <nav className="flex space-x-4">
                            {auth.user ? (
                                <>
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md px-4 py-2 text-white hover:bg-white/20"
                                    >
                                        แก้ไข(Admin)
                                    </Link>
                                    <Link
                                        href={route('menu.index')}
                                        className="rounded-md px-4 py-2 text-white hover:bg-white/20"
                                    >
                                        เมนู
                                    </Link>
                                    <Link
                                        href={route('tables.index')}
                                        className="rounded-md px-4 py-2 text-white hover:bg-white/20"
                                    >
                                        จองโต๊ะ
                                    </Link>
                                </>
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
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                {/* Main Content */}
                <main className="z-10 flex flex-1 flex-col items-center justify-center p-4 text-center text-white sm:p-6">
                    <h1 className="text-3xl font-bold drop-shadow-lg sm:text-4xl md:text-5xl">
                        Welcome to Chomngam
                    </h1>
                    <p className="mt-3 text-base drop-shadow-md sm:text-lg md:text-xl">
                        ร้านโฉมงาม ของดีเมืองพิษณุโลก
                    </p>

                    {/* โปรโมชั่น */}
                    <div className="flex flex-col items-center gap-6 px-2 md:px-4">
                        {promotions?.map((promotion) => (
                            <div
                                key={promotion.id}
                                className="w-full max-w-[98vw]"
                            >
                                <div className="flex h-[30vh] w-full items-center justify-center overflow-hidden rounded-lg bg-gray-300 sm:h-[50vh] md:h-[75vh]">
                                    {promotion.image ? (
                                        <img
                                            src={`/storage/${promotion.image}`}
                                            alt={promotion.title}
                                            className="h-full w-full object-cover max-w-full max-h-full"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center text-xl text-gray-600">
                                            No Photo
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </main>

                {/* Footer */}
                <footer className="z-10 w-full bg-transparent py-4 text-center text-sm text-white backdrop-blur-lg">
                    <p>
                        📍 ที่อยู่ร้าน ร้านโฉมงาม 123/45 ถนนกีฬา เขตนครไทย
                        พิษณุโลก 10110
                    </p>
                    <p>🕒 วันและเวลาเปิดทำการ:</p>
                    <p>วันจันทร์ - ศุกร์: 10:00 น. - 20:00 น.</p>
                    <p>วันเสาร์ - อาทิตย์: 09:00 น. - 21:00 น.</p>
                    <p>หยุดทุกวันอังคาร</p>
                    <p>📞 ช่องทางติดต่อ:</p>
                    <p>โทรศัพท์: 098-765-4321</p>
                    <p>อีเมล: support@xyzbadminton.com</p>
                    <p>Facebook: XYZ Badminton</p>
                </footer>
            </div>
        </>
    );
}
