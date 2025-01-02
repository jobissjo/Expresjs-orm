import http from 'http';
//import {readFile} from 'fs';
import {readFile, writeFile, appendFile} from 'fs/promises';

/*const server = http.createServer((req, res)=>{
  res.end("Hello, Jobi da")
})

server.listen(3000, ()=>{
  console.log("server is running on port 3000")
})*/

/*fs.readFile('./learn.txt', 'utf-8',(err, data)=>{
  if(err){
    console.log(`error: ${err}`);
  }
  if(data){
    console.log(`data: ${data}`)
  }
})*/

// ## old method for reading file fs readfile
/*

readFile('learn.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  // console.log('File contents:', data);
})
*/
// ## new method for reading file fs/promises readFile

/*
async function readMyFile(file){
  try{
    const data = await readFile(file, 'utf8');
    console.log("File contents:", data)
  }
  catch (err){
    console.log(`error: ${err}`);
  }
}

*/

// readMyFile('learn.txt');

// # write a file new method
/*

async function writeMyFile(file, data){
  try{
    await writeFile(file, data, 'utf8')
    console.log(`file ${file} is created and written data successful`);
  }
  catch (err){
    console.log(`error: ${err}`);
  }
}*/

// writeMyFile("jobi.txt", "Jobi is good boy, he is learning node js using mobile with replit.\nHe is do his best to learn something with what he have")

// # append a file new method
/*
async function appendMyFile(file, data){
  try{
    await appendFile(file, data, 'utf8')
    console.log(`file ${file} is created and written data successful`);
  }
  catch (err){
    console.log(`error: ${err}`);
  }
}

appendMyFile("jobi.txt", "Node js is easy to learn just like python")
*/


/*
const server = http.createServer((req, res)=>{
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("Hello, Jobi da")
  res.end("Hello, Jobi da")
})

server.listen(3000, ()=>{
  console.log(`serer is running on port 3000`);
})*/

/*
import { EventEmitter } from 'events';

const myEmitter = new EventEmitter();

myEmitter.on('count', (count) => {
  console.log(`Count is: ${count}`);
});

for (let i = 0; i < 5; i++) {
  myEmitter.emit('count', i);
}

*/

// const http = require('http');

import express from 'express';
import bodyParser from 'body-parser';
import { z } from 'zod';



const app = express();

app.use(bodyParser.json())

const UserSchema = z.object({
  name: z.string(),
  age: z.number(),
  email: z.string().email(),
  gender: z.enum(['male', 'female', 'other', 'prefer not to say']). optional().default('prefer not to say'),
})

app.post("/user", (req, res) => {
  console.log("body: ",req.body)
  const parseResult =  UserSchema.safeParse(req.body);

  if (!parseResult.success) {
    // Return validation errors if any
    return res.status(400).json(parseResult.error.errors);
  }

  const validatedData = parseResult.data;
  res.status(200).json({ message: "User data is valid", data: validatedData });
});

// Use body-parser middleware to parse JSON request bodies
app.use(bodyParser.json());

app.get('/', (_req, res) => {
  res.send("Hello world jobi learning ndoe js");
})

app.put('/users', (req, res) => {
  console.log('User data:', req.body);
  res.send('User created!');
});



app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});