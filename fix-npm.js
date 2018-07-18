const files=[{
  path:'chalk/index.js',
  replace:{
    5:'const setprototypeof =require(\'setprototypeof\');',
    6:'Object.setPrototypeOf=Object.setPrototypeOf||setprototypeof;'
  }
}];

const fs=require('fs');
files.forEach((file)=>{
  const path=`./node_modules/${file.path}`;

  if(!fs.existsSync(path)){
    return;
  }

  const content=fs.readFileSync(path).toString().split('\n');
  const lines=Object.keys(file.replace);

  lines.forEach((line)=>{
    content[line-1]=file.replace[line];
  });

  fs.writeFileSync(path,content.join('\n'));
});

console.log('replace');