import "./RootFooter.css";

const RootFooter = () => {
  const link = (
    <a
      href="https://codepen.io/AllThingsSmitty"
      target="_blank"
      rel="noreferrer"
    >
      Matt Smith
    </a>
  );

  return (
    <footer className="root__footer">
      <p>Built with React.js | iMessage styling by {link}</p>
    </footer>
  );
};

export default RootFooter;
