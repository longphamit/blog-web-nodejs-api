import express from "express"
import clientRouter from "./router/client"
import ejs from "ejs"
const app=express();
app.use(express.static("public"))
app.set('view engine','ejs')
// set rouer
clientRouter(app)
app.listen(4000,()=>{
    console.log("app listening on port 4000")
})