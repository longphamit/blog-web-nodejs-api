import express from "express"
import ejs from "ejs"
import mongoose from "mongoose"
import {accountRouter} from "./src/api/routers/account.router"
import logger from "morgan"
import HttpStatusCode from "http-status-codes"
import cors from "cors"
import swaggerUI from "swagger-ui-express"
import swaggerDocument from "./src/api/config/swagger.json"
import {userRouter} from "./src/api/routers/user.router"
const app=express();
const port=process.env.PORT
const host=process.env.HOST_DATABASE
app.use(cors())
app.use(express.json());
app.use(express.urlencoded())
app.use(logger('combined'));
app.use('/api/user/',userRouter)
app.use('/api/admin/account',accountRouter)
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocument,{
    explorer:true
}))
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