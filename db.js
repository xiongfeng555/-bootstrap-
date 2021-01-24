const mongoose = require('mongoose');

var Schema = mongoose.Schema;

//连接数据库
mongoose.connect('mongodb://localhost/mydb', { useNewUrlParser: true, useUnifiedTopology: true });

//设计集合结构
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    gender: {
        type: Number,
        enum: [0, 1],
        required: true
    },
    hobby: {
        type: String,
        required: true
    }
});

//发布模型,返回模型构造函数
var User = mongoose.model('User', userSchema);

// var admin = new User({
//     name: '杨建韩',
//     age: 18,
//     gender: 0,
//     hobby: '打游戏'
// });

// //持久保存
// admin.save().then(() => {
//     console.log('保存成功')
// })

//开始使用构造函数对user中的数据操作

// User.find(function(err, data) {
//     if (err) {
//         return console.log(err);
//     }
//     console.log(data);

// });

// User.deleteOne({
//     username: 'admin'
// }, function(err, data) {
//     if (err) {
//         return console.log(err);
//     }
//     console.log(data);

// })

module.exports = User