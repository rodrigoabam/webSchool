const fs = require('fs')
const data = require('../data.json')
const { schoolYear, date } = require('../dataPro')


exports.index = function(req, res){
    const students = data.students

    return res.render('students/index', { students, schoolYear })
}

exports. create = function(req, res){
    return res.render('students/create')
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
    const lastStudent = data.students[data.students.length -1]

    if(lastStudent) {
        id = lastStudent.id + 1
    }

    data.students.push({
        id,
        birth,
        ...req.body
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Erro na escrita")

        return res.redirect(`/students/${id}`)
    })

}

exports.edit = function(req, res){
    const { id } = req.params

    const foundStudent = data.students.find(function(student){
        return id == student.id
    })

    if(!foundStudent) return res.send("Professor não encontrado")

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth).iso,
    }

    return res.render('students/edit', {student})
}

exports.show = function(req, res){
    const { id } = req.params

    const foundStudent = data.students.find(function(student){
        return id == student.id
    })

    if(!foundStudent) return res.send("Professor não encontrado.")

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth).birthDay,
        grade: schoolYear(foundStudent.grade),
    }

    return res.render("students/profile", { student })
}

exports.put = function(req, res){
    const { id } = req.body
    let index = 0

    const foundStudent = data.students.find(function(student, foundIndex){
        if(id == student.id) {
            index = foundIndex
            return true
        }
    })
    

    if(!foundStudent) return res.send("Professor não encontrado")

    const student = {
        ...foundStudent,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.students[index] = student

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Ocorreu um erro")

        return res.redirect(`/students/${id}`)
    })
}

exports.delete = function(req, res){
    const { id } = req.body
    
    //filtrando os students diferente do que ativou a função delete e colocando dentro da variavel filteredStudents
    const filteredStudents = data.students.filter(function(student){
        return student.id != id
    })

    data.students = filteredStudents

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Ocorreu um erro")

        return res.redirect("students")
    })
}
