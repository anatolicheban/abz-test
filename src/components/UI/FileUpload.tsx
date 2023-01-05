import { useRef } from "react";
import "../../styles/FileUpload.sass";
import clsx from "clsx";

type FileUploadProps = {
  onChange: (file: File) => void;
  filename?: string;
  error?: string;
  className?: string;
  helperText?: string;
};

const FileUpload = ({ onChange, filename, error, className, helperText }: FileUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const formatFilename = () => {
    if (filename && filename.length > 20) {
      return filename.slice(1, 10) + "..." + filename.slice(-7);
    }
    return filename;
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    inputRef?.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList;
    onChange(files[0]);
  };

  return (
    <div className={clsx("upload", className, error ? "error" : "")}>
      <input
        ref={inputRef}
        onChange={handleChange}
        type={"file"}
        accept="image/png, image/jpeg, image/webp"
      />
      <button onClick={handleClick}>Upload</button>
      <div>{filename ? formatFilename() : "Upload Your Photo"}</div>
      {(helperText || error) && <p>{error || helperText}</p>}
    </div>
  );
};

export default FileUpload;
