const clientRouter=(app)=>{
    app.get("/",(req,res)=>{
        res.render("index")
    })
    app.get("/contact",(req,res)=>{
        res.render("contact")
    })
    app.get("/about",(req,res)=>{
        res.render("about")
    })
    app.get("/post",(req,res)=>{
        res.render("post")
    })
}
export default clientRouter;