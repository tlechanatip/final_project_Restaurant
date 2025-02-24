import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="flex flex-col items-center">
                <h2
                    className="mb-4 text-3xl font-bold text-yellow-800"
                    style={{ fontFamily: "'TH Sarabun New', sans-serif" }}
                >
                    Forgot Password
                </h2>

                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}

                <form
                    onSubmit={submit}
                    className="p-6 w-full max-w-md bg-white shadow-lg rounded-xl border border-yellow-500"
                    style={{
                        backgroundImage: "url('/images/thai-pattern.jpg')",
                        backgroundSize: 'cover',
                    }}
                >
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-yellow-900 font-medium mb-2"
                        >
                            Email Address
                        </label>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full border-yellow-500"
                            autoComplete="email"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4 flex items-center justify-end">
                        <PrimaryButton className="bg-yellow-700 hover:bg-yellow-800 text-white font-bold py-2 px-4 rounded-lg" disabled={processing}>
                            Send Password Reset Link
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
