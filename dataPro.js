module.exports = {
    age: function(timestamp){
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()

        if(month < 0 || month == 0 && today.getDate() < birthDate.getDate()){
            age = age - 1
        }

        return age
    },
    graduation: function(scholarity){
        let graduation

        if(scholarity == "medio") return graduation = "Ensino Médio Completo"
        if(scholarity == "superior") return graduation = "Ensino Superior Completo"
        if(scholarity == "mestre") return graduation = "Mestrado"
        if(scholarity == "doutor") return graduation = "Doutorado"

    }
}