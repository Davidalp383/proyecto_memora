import React from 'react';
// Asegúrate de que este archivo *NO* tenga la directiva "use client"

const WelcomeSection: React.FC = () => {
    // ... tu código de contenido estático y la imagen ...
    return (
        <div className="hidden md:flex md:w-1/2 p-8 lg:p-12 flex-col justify-center bg-white rounded-l-xl">
            {/* ... el resto del contenido ... */}
        </div>
    );
};

export default WelcomeSection;