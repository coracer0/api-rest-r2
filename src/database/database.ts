import mysql from 'promise-mysql'
import keys from '../config/keys'

var connection: mysql.Pool;
var pool= mysql.createPool(keys.database); 

export default pool;