import { ChangeEvent, useCallback, useState } from 'react';
import './App.css';
import { Folder } from './components/Folder';
import { SearchField } from './components/SearchField';
import { INode } from './types';

// const data = [
//   'folder_a.folder_b.file1',
//   'folder_a.folder_c.file1',
//   'folder_a.folder_b.file2',
//   'folder_b.file1',
//   'folder_b.folder_a.file1',
//   'folder_b.folder_a.file2',
// ];

const data = [
  'folder_a.folder_b.apple\\.csv',
  'folder_a.folder_c.pear\\.csv',
  'folder_a.folder_b.banana\\.csv',
  'folder_b.apple\\.csv',
  'folder_b.folder_a.apple\\.csv',
  'folder_b.folder_a.pear\\.csv',
  'folder_b.folder_a.folder_c.banana\\.csv',
  'folder_b.folder_a.folder_c.orange\\.csv',
  'folder_c.empty_folder',
];

let helpArray: string[] = [];
data.forEach(element => {
  helpArray.push(element.split('\\.').join('*'));
});

const App = () => {
  const [state, setState] = useState<string>('');
  const [folder, setFolder] = useState<string>('');

  let result: INode[] = [];
  let level = { result };

  helpArray.forEach(path => {
    path.split('.').reduce((r: any, name, i, a) => {
      name = name.replace('*', '.');
      if (!r[name as string]) {
        r[name] = { result: [] };
        r.result.push({
          name,
          children: r[name].result,
        });
      }
      return r[name];
    }, level);
  });

  const treeFilter = useCallback(
    (array: INode[], find: string) => {
      const getNodes = (result: INode[], object: INode) => {
        if (object.name.includes(find)) {
          result.push(object as INode);
          return result;
        }
        if (Array.isArray(object.children)) {
          const children = object.children.reduce(getNodes, []) as [];
          if (children.length) result.push({ ...object, children });
        }
        return result;
      };

      return array.reduce(getNodes, []);
    },
    [state]
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState(event.target.value);
  };

  const handleOnClick = (name: string) => {
    setFolder(name);
  };

  return (
    <div>
      <SearchField value={state} onChange={handleChange} />
      {treeFilter(result, state).length ? (
        treeFilter(result, state).map((node: INode, i: number) => (
          <Folder
            onClick={() => handleOnClick(node.name)}
            key={i}
            name={node.name}
            children={node.children}
            border={node.name === folder}
          />
        ))
      ) : (
        <div className="status">{`No Items Matching: ${state}`}</div>
      )}
    </div>
  );
};

export default App;
