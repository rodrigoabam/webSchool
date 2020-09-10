const fs = require('fs')
const data = require('../data.json')
const { age, graduation, date } = require('../dataPro')


exports.index = function(req, res){
    return res.render('teachers/index', { teachers: data.teachers })
}

exports. create =function(req, res){
    return res.render('teachers/create')
}

exports.post = function(req, res){
    const keys = Object.keys(req.body)

    for(key of keys){
        if(req.body[key] == ""){
            return res.send("Todos os campos são obrigatórios")
        }
    }

    birth = Date.parse(req.body.birth)

    let id = 1;
    const lastTeacher = data.teachers[data.teachers.length -1]

    if(lastTeacher) {
        id = lastTeacher.id + 1
    }

    data.teachers.push({
        id,
        birth,
        ...req.body
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Erro na escrita")

        return res.redirect(`/teachers/${id}`)
    })

}

exports.edit = function(req, res){
    const { id } = req.params

    const foundTeacher = data.teachers.find(function(teacher){
        return id == teacher.id
    })

    if(!foundTeacher) return res.send("Professor não encontrado")

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth)
    }

    return res.render('teachers/edit', {teacher})
}

exports.show = function(req, res){
    const { id } = req.params

    const foundTeacher = data.teachers.find(function(teacher){
        return id == teacher.id
    })

    if(!foundTeacher) return res.send("Professor não encontrado.")

    const teacher = {
        ...foundTeacher,
        matters: foundTeacher.matters.split(","),
        birth: age(foundTeacher.birth),
        scholarity: graduation(foundTeacher.scholarity)
    }

    return res.render("teachers/profile", { teacher })
}

exports.put = function(req, res){
    const { id } = req.body
    let index = 0

    const foundTeacher = data.teachers.find(function(teacher, foundIndex){
        if(id == teacher.id) {
            index = foundIndex
            return true
        }
    })
    

    if(!foundTeacher) return res.send("Professor não encontrado")

    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.teachers[index] = teacher

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Ocorreu um erro")

        return res.redirect(`/teachers/${id}`)
    })
}

exports.delete = function(req, res){
    const { id } = req.body
    
    //filtrando os teachers diferente do que ativou a função delete e colocando dentro da variavel filteredTeachers
    const filteredTeachers = data.teachers.filter(function(teacher){
        return teacher.id != id
    })

    data.teachers = filteredTeachers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Ocorreu um erro")

        return res.redirect("teachers")
    })
}

