
const hb = require('handlebars');
const fs=require('fs');


exports.hello = (ctx) => {
 
  //console.log('Received get request',ctx.params);
  let {name}=ctx.params;
  //console.log('name',name);
  
  const view=fs.readFileSync('reply.html','utf-8');
  console.log(view);
  //const view='<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title></head><body><h1>Hello {{name}}!</h1></body></html>';
  const template=hb.compile(view); //TODO combine with Handlebars
  ctx.body= template({name});
 
};

