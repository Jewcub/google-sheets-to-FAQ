import path = require('path');
const projectPath = path.resolve(__dirname, '../../');
const srcPath = path.resolve(__dirname);
import * as dotenv from 'dotenv';
dotenv.config();

// complete faq '1imzQociewnWFW8dfPM_4cRDrDWdBvhYMcbQ8C6e1-7g'
// test faq '1zjKrSJikBnQWo8cKZILTEt63zh_PYjMHQlIgqLny4Rs'
const docID = '1imzQociewnWFW8dfPM_4cRDrDWdBvhYMcbQ8C6e1-7g';
const PORT = process.env.PORT || process.env.NODE_ENV === 'production' ? 3000 : 3001;

const redirectUris =
  process.env.NODE_ENV === 'production'
    ? ['https://jacob-testing-app.xyz']
    : ['http://localhost:3000', 'http://localhost:3001'];
// console.log("client secret", process.env.CLIENT_SECRET);
export default { projectPath, srcPath, docID, redirectUris, PORT };
