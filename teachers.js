const fs = require('fs')
const data = require('./data.json')
const { age } = require('./dataPro')

//create
exports.post = function(req, res){
    const keys = Object.keys(req.body)

    for(key of keys){
        if(req.body[key] == ""){
            return res.send("Todos os campos são obrigatórios")
        }
    }

    let { photo, name, birth, scholarity, type_class, matters } = req.body

    birth = Date.parse(birth)
    const id = Number(data.teachers.length + 1)

    data.teachers.push({
        id,
        photo,
        name,
        birth,
        scholarity,
        type_class,
        matters
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Erro na escrita")

        return res.redirect(`/teachers/${id}`)
    })

}

//show
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
    }

    return res.render("teachers/profile", { teacher })
}
