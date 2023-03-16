const express = require('express')
const app = express()
const port = 3000
const bodyparser = require('body-parser')
const cookieparser = require('cookie-parser')
const jwt = require('jsonwebtoken')


const members = [
    {id:3, name:'도서관', loginId:"lib", loginPw:"africa"},
    {id:4, name:'김태후니', loginId:"nippon", loginPw:"banjai"},
]


app.use(cookieparser());
app.use(bodyparser.json())

app.get('/api/account', (req, res) => {
//   if(req.cookies && req.cookies.account){
//     const member = JSON.parse(req.cookies.account);
//     if(member.id){
//         res.send(member);
//     }
//   }
    if(req.cookies && req.cookies.token){
        jwt.verify(req.cookies.token, "abc123456", (err, decoded) =>{
            if(!err){
                res.send(decoded);
            }
            else{
                res.send(401);
            }
        })
    }
    else{
        res.send(401);
    }


})

app.post('/api/account', (req, res) => {
    const loginId = req.body.loginId;
    const loginPw = req.body.loginPw;
    console.log(loginId, loginPw);

    const mmbr = members.find(x=> x.loginId === loginId && x.loginPw === loginPw);
    if(mmbr){
        const options ={
            domain:'localhost',
            path:"/",
            httpOnly:true
        };

        const token = jwt.sign({
            id: mmbr.id,
            name: mmbr.name,
        }, "abc123456",{expiresIn:"10s", issuer:"devkahn"})

        res.cookie("token", token, options);
        res.send(mmbr);
    }
    else{
        res.send(404);
    }
})


app.delete('/api/account', (req,res) =>{
    if(req.cookies && req.cookies.token){
        res.clearCookie("token");
    }

    res.sendStatus(200);
})







app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})