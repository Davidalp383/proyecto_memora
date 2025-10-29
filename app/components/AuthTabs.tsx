"use client";

import React, { useState } from "react";
import { Mail, Lock, User, User2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";


type AuthTab = "registro" | "login";

const CustomInput: React.FC<any> = ({ name, label, type, value, onChange, Icon, placeholder }) => (
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

const RegisterForm = () => {
  const { login } = useAuth(); // 👈 esto nos da acceso a login()
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    contrasena: "",
    tipoUsuario: "Estudiante",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Aquí podrías validar o enviar a un backend más adelante
    console.log("Datos enviados:", formData);

    // Simula login al registrarse
    login(); // 👈 cambia isLoggedIn a true, te lleva al Dashboard
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CustomInput
        name="nombre"
        label="Nombre"
        type="text"
        Icon={User}
        placeholder="Tu nombre completo"
        value={formData.nombre}
        onChange={handleChange}
      />
      <CustomInput
        name="correo"
        label="Correo"
        type="email"
        Icon={Mail}
        placeholder="tu@correo.com"
        value={formData.correo}
        onChange={handleChange}
      />
      <CustomInput
        name="contrasena"
        label="Contraseña"
        type="password"
        Icon={Lock}
        placeholder="Mínimo 8 caracteres"
        value={formData.contrasena}
        onChange={handleChange}
      />
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
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <User2 className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150"
      >
        Crear cuenta
      </button>
    </form>
  );
};


const LoginForm = () => {
  const { login } = useAuth(); // 👈 acceso al contexto
  const [formData, setFormData] = useState({
    correo: "",
    contrasena: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Aquí podrías validar o comparar con usuarios reales más adelante
    console.log("Intentando iniciar sesión con:", formData);

    // Simula login exitoso
    login(); // 👈 activa isLoggedIn y redirige al Dashboard
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CustomInput
        name="correo"
        label="Correo"
        type="email"
        Icon={Mail}
        placeholder="tu@correo.com"
        value={formData.correo}
        onChange={handleChange}
      />
      <CustomInput
        name="contrasena"
        label="Contraseña"
        type="password"
        Icon={Lock}
        placeholder="Ingresa tu contraseña"
        value={formData.contrasena}
        onChange={handleChange}
      />
      <Link
        href="/forgot-password"
        className="text-sm text-blue-600 hover:underline block text-right"
      >
        ¿Olvidaste tu contraseña?
      </Link>
      <button
        type="submit"
        className="w-full py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150"
      >
        Iniciar sesión
      </button>
    </form>
  );
};


const AuthTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AuthTab>("registro");

  return (
    <div className="max-w-sm mx-auto">
      {/* Barra de pestañas */}
      <div className="relative flex p-1 bg-gray-100 rounded-xl mb-8">
        <div
          className={`absolute inset-0 bg-white rounded-lg shadow-md transition-transform duration-300 ease-in-out ${
            activeTab === "registro" ? "translate-x-0 w-1/2" : "translate-x-full w-1/2"
          }`}
        ></div>
        <button
          onClick={() => setActiveTab("registro")}
          className={`relative w-1/2 py-2 px-4 rounded-lg font-semibold transition-colors duration-300 z-10 ${
            activeTab === "registro" ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
          }`}
        >
          Crear cuenta
        </button>
        <button
          onClick={() => setActiveTab("login")}
          className={`relative w-1/2 py-2 px-4 rounded-lg font-semibold transition-colors duration-300 z-10 ${
            activeTab === "login" ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
          }`}
        >
          Iniciar sesión
        </button>
      </div>

      {/* Contenedor del formulario con altura mínima fija para que no salte */}
      <div className="min-h-[380px]">{activeTab === "registro" ? <RegisterForm /> : <LoginForm />}</div>

      {/* Divisor */}
      <div className="flex items-center my-6">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 text-gray-500 text-sm">o</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <div className="flex space-x-4">
        <button className="flex-1 flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition duration-150">
          <span className="mr-2">G</span>
          Continuar con Google
        </button>
        <button className="flex-1 flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition duration-150">
          <span className="mr-2">M</span>
          Continuar con Microsoft
        </button>
      </div>

      <div className="mt-6 text-center text-sm">
        <p className="text-gray-500">
          {activeTab === "registro" ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}
          <a
            href="#"
            onClick={() => setActiveTab(activeTab === "registro" ? "login" : "registro")}
            className="ml-1 font-medium text-blue-600 hover:text-blue-500"
          >
            {activeTab === "registro" ? "Inicia sesión" : "Regístrate"}
          </a>
        </p>
        <p className="mt-4 text-xs text-gray-500">
          Al continuar aceptas nuestros Términos y Política de Privacidad.
        </p>
      </div>
    </div>
  );
};

export default AuthTabs;
