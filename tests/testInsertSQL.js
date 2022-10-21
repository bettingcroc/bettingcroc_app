
let Sqlite = require('better-sqlite3');

let db = new Sqlite('../scripts/db.sqlite');

let insert =  db.prepare(`INSERT INTO Players (address,score,nonce) VALUES (?,?,?)`);
insert.run("address",5,"nonce");
