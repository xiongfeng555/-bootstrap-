var fs = require('fs');
var express = require('express');
var dbPath = './db.json';


// exports.add = function(callback) {
//     fs.readFile(dbpath, function(err, data) {
//         if (err) {
//             return callback(err)
//         }
//         var students = JSON.parse(data).students;
// var info = req.body;
// var len = students.length;
// info.id = len + 1;
// students.push(info);
// var newdata = {
//     students: students
// };
// fs.writeFile('./db.json', JSON.stringify(newdata), function() {
//     console.log('文件写入成功');
//     res.redirect('/');
// });
//     })
// }


//查找全部学生列表
exports.find = function(callback) {
    fs.readFile(dbPath, function(err, data) {
        if (err) {
            return callback(err);
        }
        callback(null, JSON.parse(data).students)
    })
}

//添加并保存新学生
exports.save = function(student, callback) {
    fs.readFile(dbPath, function(err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students;
        var len = students.length;
        student.id = len + 1;
        students.push(student)
        var fileData = JSON.stringify({
            students: students
        })
        fs.writeFile(dbPath, fileData, function(err) {
            if (err) {
                return callback(err)
            }
            callback()
        })
    })
}

//编辑学生信息
exports.updateById = function(student, callback) {
    fs.readFile(dbPath, function(err, data) {
        if (err) {
            return callback(err);
        }
        var students = JSON.parse(data).students;

        student.id = parseInt(student.id)
        var stu = students.find(function(item) {
            return item.id === parseInt(student.id);
        });
        for (var key in student) {
            stu[key] = student[key];
        }

        var fileData = JSON.stringify({
            students: students
        })
        fs.writeFile(dbPath, fileData, function(err) {
            if (err) {
                return callback(err)
            }
            callback()
        })
    });
};

//按照id值查找学生
exports.findById = function(id, callback) {
    fs.readFile(dbPath, function(err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        var ret = students.find(function(item) {
            return item.id === parseInt(id);
        })
        callback(null, ret)
    })
}

//按照id值删除学生
exports.deleteById = function(id, callback) {
    fs.readFile(dbPath, function(err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        var studentId = students.findIndex(function(item) {
            return item.id === parseInt(id)
        })
        students.splice(studentId, studentId + 1)
        for (var i = 0; i < students.length; i++) {
            students[i].id = i + 1
        }
        var fileData = JSON.stringify({
            students: students
        })
        fs.writeFile(dbPath, fileData, function(err) {
            if (err) {
                return callback(err)
            }
            callback()
        })

    })
}