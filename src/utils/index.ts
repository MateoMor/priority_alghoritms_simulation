// Utilidades comunes para el proyecto

// Formatear fechas
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

// Generar ID único simple
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// Validar email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Capitalizar primera letra
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};