import express from "express"
import ejs from "ejs"
import mongoose from "mongoose"
import {accountRouter} from "./src/api/routers/account.router"
import HttpStatusCode from "http-status-codes"
import {userRouter} from "./src/api/routers/user.router"
import {setGlobalMiddleware} from "./src/api/middlewares/global-middlewares"


const app=express();
const port=process.env.PORT
const host=process.env.HOST_DATABASE

setGlobalMiddleware(app)
app.use('/api/user/',userRouter)
app.use('/api/admin/account',accountRouter)

app.use(express.static("public"))
app.use((req,res,next)=>{
    const err= new Error('Not found')
    err.message="invalid router"
    err.status=HttpStatusCode.NOT_FOUND;
    next(err)
})
app.use((err,req,res,next)=>{
    res.status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
    return res.json({
        error:{
            message:err.message
        }
    })
})


app.set('view engine','ejs')


console.log("host database")
console.log(host)
// connect database mongo
mongoose.connect(host)
// set rouer

app.listen(port,()=>{
    console.log("app listening on port "+port)
})