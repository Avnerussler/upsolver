import './App.css';
import { Folder } from './components/Folder/Folder';
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
  let result: INode[] = [];
  let level = { result };

  helpArray.forEach(path => {
    path.split('.').reduce((r: any, name, i, a) => {
      name = name.replace('*', '.');
      if (!r[name]) {
        r[name] = { result: [] };
        r.result.push({
          name,
          children: r[name].result,
        });
      }
      return r[name];
    }, level);
  });

  return (
    <div>
      {result.map((item: INode, i: number) => {
        return <Folder key={i} name={item.name} children={item.children} />;
      })}
    </div>
  );
};

export default App;
