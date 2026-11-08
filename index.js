const express=require("express");

const app=express();
const PORT=8081;

app.use (express.json());

app.get('/',(req,res) =>{
    res.status(201).json({
        massage:"Home Page !"
    })
})

// app.all('*',(req,res)=>{
//     res.status(500).json({
//         massage:"Not built yet"
//     })
// })

app.listen(PORT,()=>{
    console.log(`Server is up and running on http://localhost:${PORT}`)
})