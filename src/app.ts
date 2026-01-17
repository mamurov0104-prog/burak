import express from "express";
import path from "path";
import router from "./router";
import routerAdmin from "./routerAdmin";

// -- ENTRANCE --
const app = express();
console.log("_dirname",__dirname);
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
// -- SESSIONS --
// -- VIEWS --
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
// -- ROUTER --
//BSSR -Backend service side render : EJS
app.use('/admin',routerAdmin);//single page application : React via rest API
app.use('/',router);


export default app; // = module.export = app;