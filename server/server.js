const express = require("express");
const app = express();
const jwt = require("jwt-simple");
const cors = require("cors");
const mongoose = require("mongoose");
const port = 3001 || process.ENV.port;
const secret = "@MaSTerMgT@";
const moment = require("moment");

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://ahrudxo:a9937935@ds145923.mlab.com:45923/doje", err => {
    if(err) {
        console.error("Mongo Connection Error",err);
    }
    console.log("MongoDB Connected");
})

const userSchema = new mongoose.Schema({
    id : {
        type : String,
        unique : true,
        max : 20,
        required : true
    },
    pw : {
        type : String,
        max : 15,
        required : true
    },
    name : {
        type : String,
        required : true
    }
});

const boardSchema = new mongoose.Schema({
    idx : {
        type : Number,
        unique : true
    },
    writer : {
        type : String,
        max : 20
    },
    subject : {
        type : String,
        max : 255
    },
    content : {
        type : String
    },
    date : {
        type : Date,
        default : Date.now
    }
});

const commentSchema = new mongoose.Schema({
    idx : {
        type : Number,
        unique : true
    },
    bidx : {
        type : Number
    },
    writer : {
        type : String,
        max : 20
    },
    content : {
        type : String
    },
    date : {
        type : Date,
        default : Date.now
    }
});

let userModel = mongoose.model("User", userSchema);
let boardModel = mongoose.model("Board", boardSchema);
let commentModel = mongoose.model("Comment", commentSchema);

app.get("/", (req, res) => {
    res.send("그걸 믿었음? 째트킥!")
})

app.get("/board", (req,res) => {
    boardModel.find()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        console.log(err);
    })
})

app.get("/board/:idx", (req,res) => {
    boardModel.findOne({idx : req.params.idx})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        console.log(err);
    })
})

app.get("/comment/:bidx", (req,res) => {
    commentModel.find({bidx : req.params.bidx})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        console.log(err);
    })
})

app.post("/register", (req,res) => {
    userModel.find({id : req.body.id})
    .then(data => {
        if(!data || !data.length) {
            let user = new userModel();
            user.id = req.body.id;
            user.pw = req.body.pw;
            user.name = req.body.name;
            user.save()
            .then(data => {
                console.log(data);
                res.send({result : true});
            })
            .catch(err => {
                console.log(err)
            })
        } else {
            res.send({result : false, msg : "이미 있는 아이디입니다."});
        }
    })
    .catch(err => {
        console.log(err);
    })
})

app.post("/login", (req,res) => {
    userModel.findOne({id : req.body.id, pw : req.body.pw})
    .then(data => { 
        console.log(data);
        if(!data) {
            res.send({result : false, msg : "없는 아이디거나 틀린 아이디입니다."});
            return;
        }
        let payload = {
            id : data.id,
            _id : data._id,
            name : data.name
        };
        let token = jwt.encode(payload, secret);
        res.json({
            result : 1,
            token : token,
            info : data
        })
    })
    .catch(err => {
        console.log(err)
    })
})

app.post("/board/add", (req,res) => {
    boardModel.find().sort({idx : -1}).limit(1)
    .then(data => {
        let lastIdx = data[0].idx + 1;
        let {writer, subject, content} = req.body;
        
        let time = moment().format("YYYY-MM-DD kk:mm:ss");

        let board = new boardModel();
        board.idx = lastIdx;
        board.writer = writer;
        board.subject = subject;
        board.content = content;
        board.date = time;
        board.save()
        .then(data => {
            res.json({
                result : true
            })
        })
        .catch(err => {
            console.log(err);
        })
    })
    .catch(err => {
        console.log(err);
    })
})

app.post("/board/delete/:bidx", (req,res) => {
    boardModel.findOne({idx : idx})
    .then(data =>{

    })
    .catch(err => {
        console.log(err);
    })
})

app.listen(port, err => {
    console.log("Server is On Port %s", port);
})
