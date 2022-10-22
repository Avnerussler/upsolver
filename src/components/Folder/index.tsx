import { FC, Fragment, useState } from 'react';
import { INode } from '../../types';
import { File } from '../File';
import './style.css';

interface FolderProps {
  name: string;
  children: INode[];
  onClick: () => void;
  border: boolean;
}

export const Folder: FC<FolderProps> = ({ name, children, onClick, border }: FolderProps) => {
  const [expand, setExpand] = useState(false);

  return (
    <Fragment>
      <div className="item-warper">
        {children.length > 0 ? (
          <>
            <div className="icon" onClick={() => setExpand(!expand)}>
              {expand ? '-' : '+'}
            </div>
            <div onClick={onClick} className={`item-name ${border && 'folder-border'}`}>
              {name}
            </div>
          </>
        ) : (
          <File onClick={onClick} name={name} />
        )}
      </div>

      <div className={`warper ${expand ? 'expand' : ''}`}>
        {children.map((node: INode) => (
          <Folder
            border={border}
            key={node.name}
            name={node.name}
            onClick={onClick}
            children={node.children}
          />
        ))}
      </div>
    </Fragment>
  );
};
