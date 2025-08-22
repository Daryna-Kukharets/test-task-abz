export interface TokenResponse {
  success: boolean;
  token?: string;
  message?: string;
}

export const getToken = async (): Promise<string> => {
  const res = await fetch("https://frontend-test-assignment-api.abz.agency/api/v1/token", {
    method: "POST",
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || `Cannot get token, status: ${res.status}`);
  }

  const data: TokenResponse = await res.json();

  if (!data.success || !data.token) {
    throw new Error(data.message || "Failed to get token");
  }

  return data.token;
};
