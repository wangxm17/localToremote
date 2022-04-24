//我的文件--模拟数据
//右边的文件数据
const fileListItem = [
  {id:'0',update:'2022-4-21',size:'200kb',type:"文件", name:'文件0.zip',isChecked:false,leaf:true,},
  {id:'1',update:'2022-4-21',size:'200kb',type:"文件", name:'文件1.zip',isChecked:false,leaf:true,},
  {id:'2',update:'2022-4-21',size:'200kb',type:"文件", name:'文件2.dir',isChecked:false,leaf:false,},
  {id:'3',update:'2022-4-21',size:'200kb',type:"文件", name:'文件3.doc',isChecked:false,leaf:true,},
  {id:'4',update:'2022-4-21',size:'200kb',type:"文件", name:'文件3.docx',isChecked:false,leaf:true,},
  {id:'5',update:'2022-4-21',size:'200kb',type:"文件", name:'文件3.avi',isChecked:false,leaf:true,},
  {id:'6',update:'2022-4-21',size:'200kb',type:"文件", name:'文件3.chm',isChecked:false,leaf:true,},
  {id:'7',update:'2022-4-21',size:'200kb',type:"文件", name:'文件3.code',isChecked:false,leaf:true,},
  {id:'8',update:'2022-4-21',size:'200kb',type:"文件", name:'文件3.css',isChecked:false,leaf:true,},
  {id:'9',update:'2022-4-21',size:'200kb',type:"文件", name:'文件3.csv',isChecked:false,leaf:true,},
  {id:'10',update:'2022-4-21',size:'200kb',type:"文件", name:'文件3.dmg',isChecked:false,leaf:true,},
  {id:'11',update:'2022-4-21',size:'200kb',type:"文件", name:'文件3.excel',isChecked:false,leaf:true,},
  {id:'12',update:'2022-4-21',size:'200kb',type:"文件", name:'文件3.exe',isChecked:false,leaf:true,},
  {id:'13',update:'2022-4-21',size:'200kb',type:"文件", name:'文件3.gif',isChecked:false,leaf:true,},
  {id:'14',update:'2022-4-21',size:'200kb',type:"文件", name:'文件3.html',isChecked:false,leaf:true,},
  {id:'15',update:'2022-4-21',size:'200kb',type:"文件", name:'文件3.img',isChecked:false,leaf:true,},
  {id:'16',update:'2022-4-21',size:'200kb',type:"文件", name:'文件3.jar',isChecked:false,leaf:true,},
  {id:'17',update:'2022-4-21',size:'200kb',type:"文件", name:'文件3.js',isChecked:false,leaf:true,},
  {id:'18',update:'2022-4-21',size:'200kb',type:"文件", name:'文件3.json',isChecked:false,leaf:true,},
  {id:'19',update:'2022-4-21',size:'200kb',type:"文件", name:'文件3.md',isChecked:false,leaf:true,},
  {id:'20',update:'2022-4-21',size:'200kb',type:"文件", name:'文件3.music',isChecked:false,leaf:true,},
  {id:'21',update:'2022-4-21',size:'200kb',type:"文件", name:'文件3.oa',isChecked:false,leaf:true,},
  {id:'22',update:'2022-4-21',size:'200kb',type:"文件", name:'文件3.open',isChecked:false,leaf:true,},
  {id:'23',update:'2022-4-21',size:'200kb',type:"文件", name:'文件3.pdf',isChecked:false,leaf:true,},
  {id:'24',update:'2022-4-21',size:'200kb',type:"文件", name:'文件3.pic',isChecked:false,leaf:true,},
  {id:'25',update:'2022-4-21',size:'200kb',type:"文件", name:'文件3.ppt',isChecked:false,leaf:true,},
  {id:'26',update:'2022-4-21',size:'200kb',type:"文件", name:'文件3.rar',isChecked:false,leaf:true,},
  {id:'27',update:'2022-4-21',size:'200kb',type:"文件", name:'文件3.rtf',isChecked:false,leaf:true,},
  {id:'28',update:'2022-4-21',size:'200kb',type:"文件", name:'文件3.sql',isChecked:false,leaf:true,},
  {id:'29',update:'2022-4-21',size:'200kb',type:"文件", name:'文件3.svg',isChecked:false,leaf:true,},
  {id:'30',update:'2022-4-21',size:'200kb',type:"文件", name:'测试3.txt',isChecked:false,leaf:true,},
]

const fileList = [
  {id:'31',update:'2022-4-21',size:'200kb',type:"文件", name:'文件夹1.dir',isChecked:false,leaf:false,
    children: [{id:'32',update:'2022-4-21',size:'200kb',type:"文件", name:'文件夹11.dir',isChecked:false,leaf:false, children: fileListItem}]
  },
  {id:'33',update:'2022-4-21',size:'200kb',type:"文件", name:'文件夹2.dir',isChecked:false,leaf:false,
    children: [{id:'34',update:'2022-4-21',size:'200kb',type:"文件", name:'文件夹21.dir',isChecked:false,leaf:false, children: fileListItem}]
  },
  {id:'35',update:'2022-4-21',size:'200kb',type:"文件", name:'文件夹3.dir',isChecked:false,leaf:false,
    children: [{id:'36',update:'2022-4-21',size:'200kb',type:"文件", name:'文件夹31.dir',isChecked:false,leaf:false, children: fileListItem}]
  },
  {id:'333',update:'2022-4-21',size:'200kb',type:"文件", name:'测试3.txt',isChecked:false,leaf:true,},
  {id:'555',update:'2022-4-21',size:'200kb',type:"文件", name:'测试3.txt',isChecked:false,leaf:true,},
]

const treeList = [
  {id:'31',update:'2022-4-21',size:'200kb',type:"文件", name:'文件夹1',isChecked:false,leaf:false,
    children: [{id:'32',update:'2022-4-21',size:'200kb',type:"文件", name:'文件夹11',isChecked:false,leaf:false, children: {id:'37',update:'2022-4-21',size:'200kb',type:"文件", name:'文件2',isChecked:false,leaf:false,}}]
  },
  {id:'33',update:'2022-4-21',size:'200kb',type:"文件", name:'文件夹2',isChecked:false,leaf:false,
    children: [{id:'34',update:'2022-4-21',size:'200kb',type:"文件", name:'文件夹21',isChecked:false,leaf:false, children: {id:'38',update:'2022-4-21',size:'200kb',type:"文件", name:'文件2',isChecked:false,leaf:false,}}]
  },
  {id:'35',update:'2022-4-21',size:'200kb',type:"文件", name:'文件夹3',isChecked:false,leaf:false,
    children: [{id:'36',update:'2022-4-21',size:'200kb',type:"文件", name:'文件夹31',isChecked:false,leaf:false, children: {id:'39',update:'2022-4-21',size:'200kb',type:"文件", name:'文件2',isChecked:false,leaf:false,}}]
  },
]
// export default fileData;
export {
  fileList,treeList
}
