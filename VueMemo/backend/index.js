const express = require('express')
const app = express()
const port = 3000
const bodyparser = require('body-parser');
const database = require("./database");



const memos =["메모1 내용","매모2 내용", "메모3 내용"];
app.use(bodyparser.json());


app.get('/api/memos', async (req, res) => {
  const result = await database.run("SELECT * FROM memos");
  res.send(result)
})

app.post('/api/memos', async (req, res) => {
  await database.run(`INSERT INTO memos (content) VALUE (?)`,[req.body.content]);
  const result = await database.run("SELECT * FROM memos");
  res.send(result);
})

app.put('/api/memos/:id', async (req, res) =>{
  await database.run(`UPDATE memos SET content=? WHERE id=?`, [req.body.content,req.params.id])
  const result = await database.run("SELECT * FROM memos");
  res.send(result);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})