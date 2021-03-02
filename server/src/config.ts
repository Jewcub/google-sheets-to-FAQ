import path = require('path');
const projectPath = path.resolve(__dirname, '../../');
import * as dotenv from 'dotenv';
dotenv.config();

const docID = '1zjKrSJikBnQWo8cKZILTEt63zh_PYjMHQlIgqLny4Rs';

const redirectUris =
  process.env.NODE_ENV === 'production'
    ? ['https://doc2faq-xkmml2qcbq-de.a.run.app/']
    : ['http://localhost:3000', 'http://localhost:3001'];
// console.log("client secret", process.env.CLIENT_SECRET);
export default { projectPath, docID, redirectUris };
