process.on('exit', (code) => {
    console.log(`About to exit with code: ${code}`);
  });
  

const p=new Promise((resolve,reject)=>{
    resolve(console.log('start'));
});


p.then(function() {
  console.log('promise');
});
