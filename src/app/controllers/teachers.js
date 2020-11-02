const Teacher = require('../models/Teacher')

const { age, date, graduation } = require('../../lib/dtProcessing')


module.exports = {
    index(req, res){
        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 2
        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(teachers){
                return res.render("teachers/index", {teachers, filter})
            }
        }

        Teacher.paginate(params)

        /* if( filter ){
            Teacher.findBy(filter, function(teachers){
                return res.render("teachers/index", {teachers, filter})
            })
        } else {
            Teacher.all(function(teachers){
                return res.render("teachers/index", {teachers})
            })
        }  */
        
    },
    create(req, res){
        return res.render('teachers/create')
    },
    post(req, res){
        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == ""){
                return res.send("Todos os campos são obrigatórios")
            }
        }

        Teacher.create(req.body, function(teacher){
            return res.redirect(`/teachers/${teacher.id}`)
        })

    },
    show(req, res){
        Teacher.find(req.params.id, function(teacher){
            if(!teacher) return res.send("Professor não encontrado!")

            teacher.birth = age(teacher.birth)
            teacher.scholarity = graduation(teacher.scholarity)
            teacher.matters = teacher.matters.split(",")

            return res.render("teachers/profile", {teacher})
        })
    },
    edit(req, res){
        Teacher.find(req.params.id, function(teacher){
            if(!teacher) return res.send("Professor não encontrado!")

            teacher.birth = date(teacher.birth).iso

            return res.render("teachers/edit", {teacher})
        })
    },
    put(req, res){
        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == ""){
                return res.send("Todos os campos são obrigatórios")
            }
        }

        Teacher.update(req.body, function(){
            return res.redirect(`/teachers/${req.body.id}`)
        })
        
    },
    delete(req, res){
        Teacher.delete(req.body.id, function(){
            return res.redirect(`/teachers`)
        })
    },
}