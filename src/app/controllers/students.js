const Student = require('../models/Student')

const { date, schoolYear } = require('../../lib/dtProcessing')


module.exports = {
    index(req, res){

        Student.all(function(students){
            return res.render("students/index", {students, schoolYear})
        })
        
    },
    create(req, res){
        Student.teacherSelectOptions(function(options){
            return res.render('students/create', {teacherOptions: options})
        })

    },
    post(req, res){
        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == ""){
                return res.send("Todos os campos são obrigatórios")
            }
        }

        Student.create(req.body, function(student){
            return res.redirect(`/students/${student.id}`)
        })

    },
    show(req, res){
        Student.find(req.params.id, function(student){
            if(!student) return res.send("Professor não encontrado!")

            student.birth = date(student.birth).birthDay
            student.grade = schoolYear(student.grade)

            return res.render("students/profile", {student})
        })
    },
    edit(req, res){
        Student.find(req.params.id, function(student){
            if(!student) return res.send("Professor não encontrado!")

            student.birth = date(student.birth).iso

            Student.teacherSelectOptions(function(options){
                return res.render('students/edit', {student, teacherOptions: options})
            })

        })
    },
    put(req, res){
        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == ""){
                return res.send("Todos os campos são obrigatórios")
            }
        }

        Student.update(req.body, function(){
            return res.redirect(`/students/${req.body.id}`)
        })
        
    },
    delete(req, res){
        Student.delete(req.body.id, function(){
            return res.redirect(`/students`)
        })
    },
}