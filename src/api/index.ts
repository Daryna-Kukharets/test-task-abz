export type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
};

export const fetchData = async <T>(url: string): Promise<T> => {
  const res = await fetch(url);

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || `HTTP error, status: ${res.status}`);
  }
  
  return res.json() as Promise<T>;
};
