import { useRef, useState } from "react";

interface Props {
  onUpload: (file: File) => void;
  loading: boolean;
}

export default function UploadForm({ onUpload, loading }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (!dropped?.type.startsWith("image/")) return;
    setFile(dropped);
    setPreview(URL.createObjectURL(dropped));
  };

  const handleClear = () => {
    setFile(null);
    setPreview("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleUpload = () => {
    if (file) onUpload(file);
  };

  return (
    <div className="space-y-4">

      {/* Drop Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => !preview && inputRef.current?.click()}
        className={`relative rounded-2xl border-2 border-dashed overflow-hidden transition-all duration-300
          ${dragging
            ? "border-green-400 bg-green-50 scale-[1.02]"
            : preview
              ? "border-green-200 bg-white"
              : "border-gray-200 bg-gray-50 hover:border-green-400 hover:bg-green-50/50 cursor-pointer"
          }`}
      >
        {preview ? (
          <div className="relative animate-scale-in">
            <img
              src={preview}
              alt="Preview"
              className="w-full max-h-56 object-cover"
            />
            <button
              onClick={(e) => { e.stopPropagation(); handleClear(); }}
              className="absolute top-2 right-2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-all duration-200 backdrop-blur-sm"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-48 gap-2 select-none">
            <div className={`p-3.5 rounded-2xl transition-all duration-300 ${dragging ? "bg-green-200 scale-110" : "bg-green-100"}`}>
              <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-600">
              {dragging ? "Drop it here!" : "Drop a food photo here"}
            </p>
            <p className="text-xs text-gray-400">JPG, PNG, GIF · Max 2 MB</p>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/gif"
        onChange={handleChange}
        className="hidden"
      />

      {preview ? (
        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-xl transition-all duration-200 active:scale-95 shadow-lg shadow-green-200 hover:shadow-xl cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Analyzing…
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Analyze Nutrition
            </>
          )}
        </button>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          className="w-full border border-gray-200 hover:border-green-400 hover:bg-green-50 text-gray-500 hover:text-green-600 font-medium py-2.5 rounded-xl transition-all duration-200 active:scale-95 cursor-pointer text-sm"
        >
          Choose Image
        </button>
      )}
    </div>
  );
}
