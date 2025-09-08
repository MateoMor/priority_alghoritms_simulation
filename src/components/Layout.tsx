import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  githubRepo?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title = "Mi Aplicación React", 
  githubRepo = "https://github.com/tu-usuario/tu-repo" 
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 ">
      {/* Header integrado directamente en Layout */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-800 text-white shadow-lg flex-col ">
        <div className="flex-row flex items-center h-16 px-6 max-w-full justify-between p-4">
             {/* Title - Center */}
          <div className="flex justify-center">
            <h1 className="font-bold text-center">{title}</h1>
          </div>
          {/* GitHub Icon - Left */}
          <div className="">
            <a 
              href={githubRepo} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center p-2 rounded-full text-white hover:bg-white/10 transition-all duration-300 hover:scale-110"
              aria-label="Ver repositorio en GitHub"
            >
              <svg 
                className="w-7 h-7" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
          
         
          
          
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 pt-16 px-6 py-8 max-w-full">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>

    </div>
  );
};

export default Layout;