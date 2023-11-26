import { useState } from "react";

const LinkCheckerForm = ({ onSubmit }) => {
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(url);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2">
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Enter URL to check</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary btn-wide">
        Check Links
      </button>
    </form>
  );
};

export default LinkCheckerForm;
