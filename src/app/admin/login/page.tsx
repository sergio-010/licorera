'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        setLoading(false);

        if (error) {
            setErrorMsg('Correo o contraseña incorrectos');
        } else {
            const redirect = searchParams.get('redirect') || '/admin';
            router.push(redirect);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1c1c1c] to-black text-white px-4">
            <form
                onSubmit={handleLogin}
                className="bg-[#2e2e2e] p-4 sm:p-6 rounded-lg border border-gold w-full max-w-sm shadow-lg space-y-4"
            >
                <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">Iniciar sesión</h1>
                {errorMsg && (
                    <div className="bg-red-500 text-white p-2 rounded mb-4 text-sm">
                        {errorMsg}
                    </div>
                )}
                <input
                    type="email"
                    placeholder="Correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-2 mb-3 rounded bg-black text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gold"
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-2 mb-3 rounded bg-black text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gold"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-gold text-black font-semibold w-full py-2 rounded-md shadow hover:bg-yellow-400 transition-transform transform hover:scale-105 disabled:opacity-70"
                >
                    {loading ? 'Ingresando...' : 'Ingresar'}
                </button>
            </form>
        </main>
    );
}
