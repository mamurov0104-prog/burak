console.log("APP.TS LOADED!")
import express from "express";
import path from "path";
import router from "./router";
import routerAdmin from "./router-admin";
import morgan from "morgan";
import {MORGAN_FORMAT} from "./libs/config"
import session from "express-session";
import ConnectMongoDB from "connect-mongodb-session";
// import { Collection } from "mongoose";
const MongoDBStore = ConnectMongoDB(session);
const store = new MongoDBStore({
    uri:String(process.env.MONGO_URL),
    collection: "session"
})
// -- ENTRANCE --
const app = express();
console.log("_dirname",__dirname);
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(morgan(MORGAN_FORMAT));
// -- SESSIONS --
app.use(
    session({
        secret:String(process.env.SESSION_SECRET),
        cookie:{
            maxAge:1000 * 3600 * 6 , //6h
            // maxAge:1000 * 10 , //10s

        },
        store:store, // agar false bolsa 10:30 access => 13:30 gacha / true da oxirgi kirgandan keyin uch soat mobaynida
        resave:true,
        saveUninitialized:true,
    })


)
// -- VIEWS --
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
// -- ROUTER --
//BSSR -Backend service side render : EJS
app.use('/admin',routerAdmin);//single page application : React via rest API
app.use('/',router);


export default app; // = module.export = app;