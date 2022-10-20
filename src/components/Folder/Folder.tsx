import { useState } from 'react';
import { INode } from '../../types';
import './style.css';
export const Folder = ({ name, children }: INode) => {
  const [expand, setExpand] = useState(false);

  return (
    <div>
      <div className="item-warper">
        {name.includes('folder') && (
          <div className="icon" onClick={() => setExpand(!expand)}>
            {expand ? '-' : '+'}
          </div>
        )}
        <div className="item-name">{name}</div>
      </div>

      <div
        style={{
          display: expand ? 'block' : 'none',
          marginLeft: 15,
          borderLeft: '1px solid  #80808021',
        }}>
        {children.map((node: INode) => {
          return <Folder key={node.name} name={node.name} children={node.children} />;
        })}
      </div>
    </div>
  );
};
