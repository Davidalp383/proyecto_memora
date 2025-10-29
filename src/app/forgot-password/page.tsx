// app/forgot-password/page.tsx
import Link from 'next/link';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Recuperar Contraseña</h1>

        <p className="text-gray-600 text-sm mb-6 text-center">
          Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
        </p>

        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              placeholder="tu@email.com"
              className="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-150"
          >
            Enviar enlace
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Recordaste tu contraseña?{' '}
          <Link href="/login" className="text-indigo-600 hover:underline">
            Inicia Sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
