import { useState } from "react";
import { FloatingLabel } from "../FloatingLabel/FloatingLabel";
import { PositionRadio } from "../PositionRadio/PositionRadio";
import { PhotoUploader } from "../PhotoUploader/PhotoUploader";
import { Button } from "../Button/Button";
import { getToken } from "../../api/getToken";
import { registerUser } from "../../api/registerUser";
import { formatPhone } from "../../helper/formatPhone";
import { validateField } from "../../helper/validateField";

type Props = {
  onUserRegistered: () => void;
};

export const Form: React.FC<Props> = ({ onUserRegistered }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    positionId: "",
    photo: null as File | null,
  });

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

      if (error) {
        valid = false;
      }
    }

    return valid;
  };

  const handleChange = async (name: string, value: string) => {
    if (name === "phone") {
      const formatted = formatPhone(value);
      setFormData((prev) => ({ ...prev, phone: formatted }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    setTouchedFields((prev) => ({ ...prev, [name]: true }));

    const error = await validateField(
      name,
      name === "phone"
        ? formatPhone(value)
        : setErrors((prev) => ({ ...prev, [name]: error }))
    );
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

    setTouchedFields({
      name: true,
      email: true,
      phone: true,
      photo: true,
      positionId: true,
    });

    const formValid = await checkFormValidity();

    if (!formValid) {
      return;
    }

    try {
      const token = await getToken();

      const userData = {
        name: formData.name,
        email: formData.email,
        phone: "+" + formData.phone.replace(/\D/g, ""),
        position_id: Number(formData.positionId),
        photo: formData.photo!,
      };

      const response = await registerUser(userData, token);

      if (response.success) {
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
      }
    } catch (error: any) {
      alert(error.message || "Something went wrong. Try again.");
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
          onClick={handleSubmit}
          disabled={!isFormValid()}
        />
      </div>
    </form>
  );
};
