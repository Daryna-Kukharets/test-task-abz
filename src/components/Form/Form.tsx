import { useState } from "react";
import { FloatingLabel } from "../FloatingLabel/FloatingLabel";
import { PositionRadio } from "../PositionRadio/PositionRadio";
import { PhotoUploader } from "../PhotoUploader/PhotoUploader";
import { Button } from "../Button/Button";
import { getToken } from "../../api/getToken";
import { registerUser } from "../../api/registerUser";
import { formatPhone } from "../../helper/formatPhone";
import { validateField } from "../../helper/validateForm";

type Props = {
  onUserRegistered: () => void;
};

export const Form: React.FC<Props> = ({ onUserRegistered }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    positionId: "1",
    photo: null as File | null,
  });
  const [serverError, setServerError] = useState<string>("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touchedFields, setTouchedFields] = useState<{
    [key: string]: boolean;
  }>({});

  const handleFocus = () => {
    if (!formData.phone) {
      setFormData((prev) => ({ ...prev, phone: "+38 (0" }));
    }
  };

  const checkFormValidity = async () => {
    const fields = ["name", "email", "phone", "photo"];
    let valid = true;

    for (const field of fields) {
      const value = (formData as any)[field];
      const error = await validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
      if (error) valid = false;
    }

    return valid;
  };

  const handleChange = async (name: string, value: string) => {
    const formattedValue = name === "phone" ? formatPhone(value) : value;

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
    setTouchedFields((prev) => ({ ...prev, [name]: true }));

    const error = await validateField(name, formattedValue);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handlePhotoChange = async (file: File | null) => {
    setFormData((prev) => ({ ...prev, photo: file }));
    setTouchedFields((prev) => ({ ...prev, photo: true }));

    const error = await validateField("photo", file);
    setErrors((prev) => ({ ...prev, photo: error }));
  };

  const handlePositionChange = (id: number) => {
    setFormData((prev) => ({ ...prev, positionId: id.toString() }));
    setTouchedFields((prev) => ({ ...prev, positionId: true }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setServerError(""); // очистити глобальну помилку

    setTouchedFields({
      name: true,
      email: true,
      phone: true,
      photo: true,
      positionId: true,
    });

    const formValid = await checkFormValidity();
    if (!formValid) return;

    try {
      const token = await getToken();

      const phoneDigits = (formData.phone || "").replace(/[^\d]/g, ""); // ✅ лише цифри
      const userData = {
        name: formData.name,
        email: formData.email,
        phone: `+${phoneDigits}`,
        position_id: Number(formData.positionId),
        photo: formData.photo!,
      };

      const response = await registerUser(userData, token);

      // ✅ випадок, коли бекенд повертає success=false з fails
      if (!response?.success) {
        const mapKeys: Record<string, string> = { position_id: "positionId" };
        const fails = (response?.fails ?? {}) as Record<string, string[]>;
        const newErrors: Record<string, string> = {};

        Object.entries(fails).forEach(([key, msgs]) => {
          const clientKey = mapKeys[key] || key;
          newErrors[clientKey] =
            msgs?.[0] || response?.message || "Validation failed";
        });

        if (Object.keys(newErrors).length) {
          setErrors((prev) => ({ ...prev, ...newErrors }));
          setTouchedFields((prev) => ({
            ...prev,
            ...Object.keys(newErrors).reduce(
              (acc, k) => (((acc as any)[k] = true), acc),
              {} as Record<string, boolean>
            ),
          }));
          const firstKey = Object.keys(newErrors)[0];
          if (firstKey) {
            const el = document.querySelector(
              `[name="${firstKey}"]`
            ) as HTMLElement | null;
            el?.focus();
          }
        }

        setServerError(response?.message || "Validation failed");
        return;
      }

      // ✅ успіх
      setFormData({
        name: "",
        email: "",
        phone: "",
        positionId: "1",
        photo: null,
      });
      setErrors({});
      setTouchedFields({});
      onUserRegistered?.();
    } catch (error: any) {
      // ✅ мережеві/несподівані помилки або 4xx/5xx з тілом { message, fails }
      let message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong. Try again.";
      const fails = error?.response?.data?.fails as
        | Record<string, string[]>
        | undefined;

      if (fails) {
        const mapKeys: Record<string, string> = { position_id: "positionId" };
        const newErrors: Record<string, string> = {};
        Object.entries(fails).forEach(([key, msgs]) => {
          const clientKey = mapKeys[key] || key;
          newErrors[clientKey] = msgs?.[0] || message;
        });
        if (Object.keys(newErrors).length) {
          setErrors((prev) => ({ ...prev, ...newErrors }));
          setTouchedFields((prev) => ({
            ...prev,
            ...Object.keys(newErrors).reduce(
              (acc, k) => (((acc as any)[k] = true), acc),
              {} as Record<string, boolean>
            ),
          }));
          const firstKey = Object.keys(newErrors)[0];
          if (firstKey) {
            const el = document.querySelector(
              `[name="${firstKey}"]`
            ) as HTMLElement | null;
            el?.focus();
          }
        }
      }

      setServerError(message);
    }
  };

  const isFormValid = () => {
    const requiredFields = ["name", "email", "phone", "photo", "positionId"];
    return requiredFields.every((field) => {
      const value = (formData as any)[field];
      return value && value.toString().trim() !== "" && !errors[field];
    });
  };

  return (
    <form encType="multipart/form-data" className="form">
      {serverError && (
        <div className="form__server-error" role="alert" aria-live="assertive">
          {serverError}
        </div>
      )}
      <div className="form__inputs">
        <div className="form__input-box">
          <FloatingLabel
            name="name"
            label="Your name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />
          {touchedFields.name && errors.name && (
            <p className="form__error">{errors.name}</p>
          )}
        </div>
        <div className="form__input-box">
          <FloatingLabel
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          {touchedFields.email && errors.email && (
            <p className="form__error">{errors.email}</p>
          )}
        </div>
        <div className="form__input-box">
          <FloatingLabel
            name="phone"
            label="Phone"
            value={formData.phone}
            onChange={handleChange}
            onFocus={handleFocus}
            error={errors.phone}
          />
          <p className="form__phone">+38 (XXX) XXX - XX - XX</p>
          {touchedFields.phone && errors.phone && (
            <p className="form__error">{errors.phone}</p>
          )}
        </div>
      </div>
      <div className="form__position">
        <PositionRadio
          selectedId={Number(formData.positionId)}
          onChange={handlePositionChange}
        />
      </div>
      <div className="form__input-box">
        <PhotoUploader
          onChange={handlePhotoChange}
          value={formData.photo}
          error={errors.photo}
        />
        {touchedFields.photo && errors.photo && (
          <p className="form__error">{errors.photo}</p>
        )}
      </div>
      <div className="form__button">
        <Button
          name="Sign up"
          onClick={(e) =>
            handleSubmit(e as React.MouseEvent<HTMLButtonElement>)
          }
          disabled={!isFormValid()}
        />
      </div>
    </form>
  );
};
