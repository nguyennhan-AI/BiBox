import { FaFilePdf, FaFileWord, FaFileImage } from "react-icons/fa";

const getFileIcon = (fileType: string) => {
  switch (fileType) {
    case "application/pdf":
      return <FaFilePdf className="text-red-500 text-2xl" />;
    case "document":
      return <FaFileWord className="text-blue-500 text-2xl" />;
    case "document":
      return <FaFileWord className="text-blue-500 text-2xl" />;
    case "image/jpeg":
      return <FaFileImage className="text-green-500 text-2xl" />;
    case "image/png":
      return <FaFileImage className="text-green-500 text-2xl" />;
    default:
      return <FaFilePdf className="text-gray-500 text-2xl" />;
  }
};

export default function FileType({ fileName }: { fileName: string }) {
  const fileType = fileName.split(".").pop()?.toLowerCase() || "";
  return (
    <div>
      {getFileIcon(fileType)}
    </div>
  );
}
