import { useState } from "react";

const LinkCheckerForm = ({ onSubmit, isLoading }) => {
  const [url, setUrl] = useState("");

  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidUrl(url)) {
      alert("Please enter a valid URL");
      return;
    }
    onSubmit(url);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2 bg-base-200 p-4 m-2">
      <div className="form-control w-full max-w-md">
        <label className="label">
          <span className="label-text">Enter URL to check</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-md"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-full max-w-md">
        Check Links
        {isLoading && (
          <span className="loading loading-spinner loading-md"></span>
        )}
      </button>
    </form>
  );
};

export default LinkCheckerForm;
