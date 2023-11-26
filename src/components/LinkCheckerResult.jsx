const LinkCheckerResult = ({ links }) => {
  return (
    <div>
      <h2>Broken Links:</h2>
      <ul>{links.map((link, index) => link && <li key={index}>{link}</li>)}</ul>
    </div>
  );
};

export default LinkCheckerResult;
