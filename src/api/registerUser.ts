import { ApiResponse } from ".";

export interface RegisterUserData {
  name: string;
  email: string;
  phone: string;
  position_id: number;
  photo: File;
}

export interface RegisterUserResponse extends ApiResponse<{ user_id: number }> {
  message: string;
  fails: Record<string, string[]>
}

export const registerUser = async (
  data: RegisterUserData,
  token: string
): Promise<RegisterUserResponse> => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("phone", data.phone);
  formData.append("position_id", data.position_id.toString());
  formData.append("photo", data.photo);

  const res = await fetch(
    "https://frontend-test-assignment-api.abz.agency/api/v1/users",
    {
      method: "POST",
      headers: {
        Token: token,
      },
      body: formData,
    }
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || `HTTP error, status: ${res.status}`);
  }

    return res.json() as Promise<RegisterUserResponse>;
};
