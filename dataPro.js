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

    },
    schoolYear: function(grade){
        let schoolYear

        if(grade == "EF5") return schoolYear = "5º E.Fundamental"
        if(grade == "EF6") return schoolYear = "6º E.Fundamental"
        if(grade == "EF7") return schoolYear = "7º E.Fundamental"
        if(grade == "EF8") return schoolYear = "8º E.Fundamental"
        if(grade == "EF9") return schoolYear = "9º E.Fundamental"
        if(grade == "EM1") return schoolYear = "1º E.Médio"
        if(grade == "EM2") return schoolYear = "2º E.Médio"
        if(grade == "EM3") return schoolYear = "3º E.Médio"

    },
    date: function(timestamp){
        const date = new Date(timestamp)

        const y = date.getFullYear()
        const m = `0${date.getUTCMonth()+1}`.slice(-2)
        const d = `0${date.getUTCDate()}`.slice(-2)

        return `${y}-${m}-${d}`
    }
}