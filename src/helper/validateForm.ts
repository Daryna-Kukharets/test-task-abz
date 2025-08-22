export const validateField = async (name: string, value: any) => {
  let error = "";

  switch (name) {
    case "name":
      if (!value || !value.trim()) {
        error = "Name is required";
      } else if (value.length < 2 || value.length > 60) {
        error = "Name must be 2-60 characters";
      }
      break;

    case "email":
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value || !value.trim()) {
        error = "Email is required";
      } else if (!emailRegex.test(value)) {
        error = "Invalid email format";
      }
      break;

    case "phone":
      if (!value || !value.trim()) {
        error = "Phone is required";
      } else {
        const phoneDigits = value.replace(/\D/g, "");
        if (phoneDigits.length < 12) {
          error = "Phone must be complete";
        }
      }
      break;

    case "photo":
      if (!value) {
        error = "Photo is required";
      } else {
        const file = value as File;
        const validTypes = ["image/jpeg", "image/jpg"];
        if (!validTypes.includes(file.type)) {
          error = "Photo must be JPG/JPEG format";
        } else if (file.size > 5 * 1024 * 1024) {
          error = "Photo size must not exceed 5MB";
        } else {
          await new Promise<void>((resolve) => {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
              if (img.width < 70 || img.height < 70) {
                error = "Photo resolution must be at least 70x70px";
              }
              URL.revokeObjectURL(img.src);
              resolve();
            };
            img.onerror = () => {
              error = "Invalid image file";
              URL.revokeObjectURL(img.src);
              resolve();
            };
          });
        }
      }
      break;
  }

  return error;
};