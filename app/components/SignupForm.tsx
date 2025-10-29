"use client"; // Añade esta línea al inicio del archivo

import React, { useState } from 'react';
import { Mail, Lock, User, User2 } from 'lucide-react'; // Asumiendo que usas 'lucide-react' o similar

// Tipo para el estado del formulario
interface SignupData {
  nombre: string;
  correo: string;
  contrasena: string;
  tipoUsuario: string;
}

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState<SignupData>({
    nombre: '',
    correo: '',
    contrasena: '',
    tipoUsuario: 'Estudiante',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datos de registro:', formData);
    // Lógica para enviar el formulario (ej. llamada a una API)
  };

  // Componente Input reutilizable con icono
  const CustomInput: React.FC<{
    name: keyof SignupData;
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    Icon: React.ElementType; // Usamos React.ElementType para el componente de icono
    placeholder?: string;
  }> = ({ name, label, type, value, onChange, Icon, placeholder }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          className="block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-sm mx-auto">
      <div className="flex justify-between mb-8">
        {/* Botones de Pestaña/Inicio de Sesión */}
        <button className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-150">
          Crear cuenta
        </button>
        <button className="text-gray-600 font-semibold py-2 px-6 rounded-lg hover:text-blue-600 transition duration-150">
          Iniciar sesión
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input Nombre */}
        <CustomInput 
          name="nombre"
          label="Nombre"
          type="text"
          value={formData.nombre}
          onChange={handleChange}
          Icon={User}
          placeholder="Tu nombre completo"
        />

        {/* Input Correo */}
        <CustomInput 
          name="correo"
          label="Correo"
          type="email"
          value={formData.correo}
          onChange={handleChange}
          Icon={Mail}
          placeholder="tu@correo.com"
        />

        {/* Input Contraseña */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Contraseña</label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <input
              type="password"
              name="contrasena"
              value={formData.contrasena}
              onChange={handleChange}
              placeholder="Mínimo 8 caracteres"
              required
              className="block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
          </div>
          <p className="mt-1 text-xs text-gray-500">Mínimo 8 caracteres</p> {/* Texto debajo del campo */}
        </div>


        {/* Dropdown Tipo de Usuario */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Tipo de usuario</label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <select
              name="tipoUsuario"
              value={formData.tipoUsuario}
              onChange={handleChange}
              className="block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm appearance-none"
            >
              <option value="Estudiante">Estudiante</option>
              <option value="Profesor">Profesor</option>
            </select>
            {/* Ícono de flecha personalizada (simula la flecha del dropdown) */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              {/* <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" /> */}
              <User2 className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* Botón Principal de Crear Cuenta */}
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150"
        >
          Crear cuenta
        </button>
      </form>

      {/* Divisor "o" */}
      <div className="flex items-center my-6">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 text-gray-500 text-sm">o</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      {/* Botones de Inicio de Sesión Social */}
      <div className="flex space-x-4">
        {/* Botón Google */}
        <button className="flex-1 flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition duration-150">
          {/* <GoogleIcon className="h-5 w-5 mr-2" /> (Reemplazar con ícono de Google) */}
          <span className="mr-2">G</span>
          Continuar con Google
        </button>

        {/* Botón Microsoft */}
        <button className="flex-1 flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition duration-150">
          {/* <MicrosoftIcon className="h-5 w-5 mr-2" /> (Reemplazar con ícono de Microsoft) */}
          <span className="mr-2">M</span>
          Continuar con Microsoft
        </button>
      </div>

      {/* Enlaces de Pie de Formulario */}
      <div className="mt-6 text-center text-sm">
        <p className="text-gray-500">
          ¿Ya tienes cuenta? 
          <a href="#" className="ml-1 font-medium text-blue-600 hover:text-blue-500">
            Inicia sesión
          </a> 
          | 
          <a href="#" className="ml-1 font-medium text-blue-600 hover:text-blue-500">
            ¿Olvidaste tu contraseña?
          </a>
        </p>
        <p className="mt-4 text-xs text-gray-500">
          Al continuar aceptas nuestros Términos y Política de Privacidad.
        </p>
      </div>
    </div>
  );
};

export default SignupForm;