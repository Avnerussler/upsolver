import './style.css';

export const File = ({ name, onClick }: { name: string; onClick: () => void }) => (
  <button className="file item-name" onClick={onClick}>
    {name}
  </button>
);
