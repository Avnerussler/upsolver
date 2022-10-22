import './style.css';

interface FileProps {
  name: string;
  onClick: () => void;
}
export const File = ({ name, onClick }: FileProps) => (
  <button onClick={onClick} className="file item-name">
    {name}
  </button>
);
