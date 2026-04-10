import { useDropzone } from "react-dropzone";
import { matchResume } from "../services/api";
import { useState } from "react";

export default function UploadResume({ setResult }) {
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  // 📂 File Drop
  const onDrop = (acceptedFiles) => {
    if (!acceptedFiles.length) return;

    const selectedFile = acceptedFiles[0];

    if (selectedFile.type !== "application/pdf") {
      alert("Only PDF files allowed ❌");
      return;
    }

    setFile(selectedFile);
  };

  // 🚀 Submit
  const handleSubmit = async () => {
    try {
      if (!file) {
        alert("Please upload resume ⚠️");
        return;
      }

      if (!jd.trim()) {
        alert("Please enter Job Description ⚠️");
        return;
      }

      setLoading(true);

      const formData = new FormData();
      formData.append("resume", file);
      formData.append("jobDescription", jd);

      const data = await matchResume(formData);

      const resultData = data?.result || data;

      if (!resultData) {
        alert("Invalid response from server ❌");
        return;
      }

      setResult(resultData);

    } catch (error) {
      console.error("Upload error:", error);

      alert(
        error?.response?.data?.error ||
        "Failed to analyze resume ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        onClick={open}
        className="glass p-10 text-center cursor-pointer border-2 border-dashed border-blue-400 hover:border-blue-500 hover:scale-[1.02] transition rounded-xl"
      >
        <input {...getInputProps()} />

        <h2 className="text-xl font-semibold">
          📄 Drag & Drop Resume
        </h2>

        <p className="text-gray-400 mt-2">
          or click to upload (PDF only)
        </p>

        {file && (
          <p className="mt-3 text-green-400 font-medium">
            ✅ {file.name}
          </p>
        )}
      </div>

      <textarea
        placeholder="Paste Job Description here..."
        value={jd}
        onChange={(e) => setJd(e.target.value)}
        className="mt-4 w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
        rows={5}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="btn w-full mt-4 flex justify-center items-center"
      >
        {loading ? "Analyzing..." : "Analyze Resume 🚀"}
      </button>
    </div>
  );
}