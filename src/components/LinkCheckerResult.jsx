const LinkCheckerResult = ({ links }) => {
  return (
    <div className="m-2 bg-base-200 p-4 overflow-auto">
      <h2 className="text-xl p-2">Broken Links</h2>
      <ul className="divide-y divide-slate-700">{links.map((link, index) => link && <li key={index} className="p-2">
        <a href={link} target="_blank" rel="noopener noreferrer" className="link link-hover">
          {link}
        </a>
      </li>)}</ul>
    </div>
  );
};

export default LinkCheckerResult;
