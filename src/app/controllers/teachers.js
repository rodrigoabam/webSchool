const { age, graduation, date } = require('../../lib/dtProcessing')

module.exports = {
    index(req, res){
        return res.render('teachers/index')
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

        let { photo, name, birth, scholarity, type_class, matters }

        return
    },
    edit(req, res){
        return
    },
    show(req, res){
        return
    },
    put(req, res){
        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == ""){
                return res.send("Todos os campos são obrigatórios")
            }
        }

        return
    },
    delete(req, res){
        return
    },
}