var express = require('express');
var fs = require('fs');
var student = require('./db.js')


var info = [{
    name: '杨剑豪',
    age: 20
}, {
    name: '刘海宇',
    age: 18
}, {
    name: "李鑫",
    age: 22
}];

//创建一个路由容器
var router = express.Router();


//匹配首页
router.get('/', function(req, res) {
    student.find(function(err, students) {
        if (err) {
            return res.status(500).send('server error')
        }
        res.render('index', {
            students: students,
            info: info
        });
    });

});

//匹配添加学生页
router.get('/new', function(req, res) {
    res.render('new');
});

//匹配添加提交页
router.post('/addsub', function(req, res) {

    new student(req.body).save(function(err) {
        if (err) {
            return res.status(500).send('server error')
        }
        res.redirect('/')
    })
});

//匹配编辑页
router.get('/edit', function(req, res) {
    var id = req.query.id.replace(/"/g, '')
    student.findById(id, function(err, student) {
        if (err) {
            return res.status(500).send('server error')
        }
        res.render('edit', {
            student: student
        })
    })
})

//匹配编辑提交页
router.post('/editFinish', function(req, res) {
    student.findByIdAndUpdate(req.body.id.replace(/"/g, ''), req.body, function(err) {
        if (err) {
            return res.status(500).send("server error")
        }
        res.redirect('/')
    })
})

//匹配删除操作
router.get('/delete', function(req, res) {
    student.findByIdAndDelete(req.query.id.replace(/"/g, ''), function(err) {
        if (err) {
            return res.status(500).send('server error')
        }
        res.redirect('/')
    })

})
module.exports = router;