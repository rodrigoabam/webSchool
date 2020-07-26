const fs = require('fs')
const data = require("./data.json")

//create
exports.post = function(req, res){
    const keys = Object.keys(req.body)

    for(key of keys){
        if(req.body[key] == ""){
            return res.send("Todos os campos são obrigatórios")
        }
    }

    let { photo, name, birth, scholarity, type_class, matter } = req.body

    birth = Date.parse(birth)
    const id = Number(data.teachers.length + 1)

    data.teachers.push({
        id,
        photo,
        name,
        birth,
        scholarity,
        type_class,
        matter
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Erro na escrita")

        return res.redirect("teachers")
    })

}