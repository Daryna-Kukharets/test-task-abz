import { ChangeEvent, useEffect, useState } from "react";

type Props = {
  onChange: (file: File | null) => void;
  value: File | null;
  error: string;
};

export const PhotoUploader: React.FC<Props> = ({ onChange, value, error }) => {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (value) {
      const url = URL.createObjectURL(value);
     
      setPreview(url);

      return () => URL.revokeObjectURL(url);
    } else {
      setPreview(null);
    }
  }, [value]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    onChange(file);
  };

  return (
    <div className="photoUploader">
      <input
        type="file"
        id="photoUpload"
        accept="image/jpeg, image/jpg"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <label htmlFor="photoUpload" className="photoUploader__label">
        <p
          className={`photoUploader__upload ${
            error ? "photoUploader__upload--error" : ""
          }`}
        >
          Upload
        </p>
      </label>
      <div
        className={`photoUploader__border ${
          error ? "photoUploader__border--error" : ""
        }`}
      >
        {preview ? (
          <a href={preview} target="_blank" className="photoUploader__preview">
            {value?.name}
          </a>
        ) : (
          <p className="photoUploader__text">Upload your photo</p>
        )}
      </div>
    </div>
  );
};
