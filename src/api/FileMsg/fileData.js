//我的文件--模拟数据


//右边的文件数据
const fileListItem = [
  {id:'0', update:'2022-4-21',size:'200kb',type:"文件", label:'文件0.zip',isChecked:false,},
  {id:'1', update:'2022-4-21',size:'200kb',type:"文件", label:'文件1.zip',isChecked:false,},
  {id:'2', update:'2022-4-21',size:'200kb',type:"文件", label:'文件2.dir',isChecked:false,},
  {id:'3', update:'2022-4-21',size:'200kb',type:"文件", label:'文件3.doc',isChecked:false,},
  {id:'4', update:'2022-4-21',size:'200kb',type:"文件", label:'文件3.docx',isChecked:false,},
  {id:'5', update:'2022-4-21',size:'200kb',type:"文件", label:'文件3.avi',isChecked:false,},
  {id:'6', update:'2022-4-21',size:'200kb',type:"文件", label:'文件3.chm',isChecked:false,},
  {id:'7', update:'2022-4-21',size:'200kb',type:"文件", label:'文件3.code',isChecked:false,},
  {id:'8', update:'2022-4-21',size:'200kb',type:"文件", label:'文件3.css',isChecked:false,},
  {id:'9', update:'2022-4-21',size:'200kb',type:"文件", label:'文件3.csv',isChecked:false,},
  {id:'10',update:'2022-4-21',size:'200kb',type:"文件", label:'文件3.dmg',isChecked:false,},
  {id:'11',update:'2022-4-21',size:'200kb',type:"文件", label:'文件3.excel',isChecked:false,},
  {id:'12',update:'2022-4-21',size:'200kb',type:"文件", label:'文件3.exe',isChecked:false,},
  {id:'13',update:'2022-4-21',size:'200kb',type:"文件", label:'文件3.gif',isChecked:false,},
  {id:'14',update:'2022-4-21',size:'200kb',type:"文件", label:'文件3.html',isChecked:false,},
  {id:'15',update:'2022-4-21',size:'200kb',type:"文件", label:'文件3.img',isChecked:false,},
  {id:'16',update:'2022-4-21',size:'200kb',type:"文件", label:'文件3.jar',isChecked:false,},
  {id:'17',update:'2022-4-21',size:'200kb',type:"文件", label:'文件3.js',isChecked:false,},
  {id:'18',update:'2022-4-21',size:'200kb',type:"文件", label:'文件3.json',isChecked:false,},
  {id:'19',update:'2022-4-21',size:'200kb',type:"文件", label:'文件3.md',isChecked:false,},
  {id:'20',update:'2022-4-21',size:'200kb',type:"文件", label:'文件3.music',isChecked:false,},
  {id:'21',update:'2022-4-21',size:'200kb',type:"文件", label:'文件3.oa',isChecked:false,},
  {id:'22',update:'2022-4-21',size:'200kb',type:"文件", label:'文件3.open',isChecked:false,},
  {id:'23',update:'2022-4-21',size:'200kb',type:"文件", label:'文件3.pdf',isChecked:false,},
  {id:'24',update:'2022-4-21',size:'200kb',type:"文件", label:'文件3.pic',isChecked:false,},
  {id:'25',update:'2022-4-21',size:'200kb',type:"文件", label:'文件3.ppt',isChecked:false,},
  {id:'26',update:'2022-4-21',size:'200kb',type:"文件", label:'文件3.rar',isChecked:false,},
  {id:'27',update:'2022-4-21',size:'200kb',type:"文件", label:'文件3.rtf',isChecked:false,},
  {id:'28',update:'2022-4-21',size:'200kb',type:"文件", label:'文件3.sql',isChecked:false,},
  {id:'29',update:'2022-4-21',size:'200kb',type:"文件", label:'文件3.svg',isChecked:false,},
  {id:'30',update:'2022-4-21',size:'200kb',type:"文件", label:'测试3.txt',isChecked:false,},
]

const fileList = [
  {id:'31',update:'2022-4-21',size:'200kb',type:"文件", label:'文件夹1.dir',isChecked:false,
    children: [{id:'32',update:'2022-4-21',size:'200kb',type:"文件", label:'文件夹11.dir',isChecked:false, children: fileListItem}]
  },
  {id:'33',update:'2022-4-21',size:'200kb',type:"文件", label:'文件夹2.dir',isChecked:false,
    children: [{id:'34',update:'2022-4-21',size:'200kb',type:"文件", label:'文件夹21.dir',isChecked:false}]
  },
  {id:'35',update:'2022-4-21',size:'200kb',type:"文件", label:'文件夹3.dir',isChecked:false,
    children: [{id:'36',update:'2022-4-21',size:'200kb',type:"文件", label:'文件夹31.dir',isChecked:false}]
  },
  {id:'37',update:'2022-4-21',size:'200kb',type:"文件", label:'测试3.txt',isChecked:false,},
  {id:'38',update:'2022-4-21',size:'200kb',type:"文件", label:'测试3.txt',isChecked:false,},
]

const treeList = [
  {label: "文件夹1", open: true, children: [{label: "文件夹11"}]},
  {label: "文件夹2", open: true, children: [{label: "文件夹21"}, {label: "收集系统",children: [{label: "采集系统"}, {label: "收集系统"}]}]},
  {label: "文件夹3", open: true, children: [{label: "文件夹31"}, {label: "二级 3-2"}]}
]
// export default fileData;
export {
  fileList,treeList
}
