// Tipos comunes para el proyecto
export interface User {
  id: number;
  name: string;
  email: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

// Agrega más tipos según necesites
export type Status = 'idle' | 'loading' | 'success' | 'error';