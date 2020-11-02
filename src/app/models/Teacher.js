const { date } = require('../../lib/dtProcessing')

const db = require('../config/db')

module.exports = {
  all(callback){

    db.query(`
    SELECT teachers.*, count(students) AS total_students
    FROM teachers
    LEFT JOIN students ON (students.teacher_id = teachers.id)
    GROUP BY teachers.id
    ORDER BY total_students DESC
    `, 
      function(err, results){
      if(err) throw `Database error! ${err}`

      callback(results.rows)
    })

  },
  create(data, callback){
    const query = `
      INSERT INTO teachers (
          photo,
          name,
          scholarity,
          type_class,
          matters,
          birth
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `

    const values = [
        data.photo,
        data.name,
        data.scholarity,
        data.type_class,
        data.matters,
        date(data.birth).iso,
    ]

    db.query(query, values, function(err, results){
        if(err) throw `Database error! ${err}`

        callback(results.rows[0])
    })
  },
  find(id, callback){
    db.query(`SELECT * FROM teachers WHERE id = $1`, [id], function(err, results){
      if(err) throw `Database error! ${err}`

      callback(results.rows[0])
    })
  },
  findBy(filter, callback){

    db.query(`
    SELECT teachers.*, count(students) AS total_students
    FROM teachers
    LEFT JOIN students ON (students.teacher_id = teachers.id)
    WHERE teachers.name  ILIKE '%${filter}%' OR
    teachers.matters  ILIKE '%${filter}%'
    GROUP BY teachers.id
    ORDER BY total_students DESC
    `, 
      function(err, results){
      if(err) throw `Database error! ${err}`

      callback(results.rows)
    })

  },
  update(data, callback){
    const query = `
      UPDATE teachers SET
        photo=($1),
        name=($2),
        scholarity=($3),
        type_class=($4),
        matters=($5),
        birth=($6)
      WHERE id = $7
    `

    const values = [
      data.photo,
      data.name,
      data.scholarity,
      data.type_class,
      data.matters,
      date(data.birth).iso,
      data.id
    ]

    db.query(query, values, function(err, results){
      if(err) throw `Database error! ${err}`

      callback()
    })
  },
  delete(id, callback){
    db.query(`DELETE FROM teachers WHERE id = $1`, [id], function(err, results){
      if(err) throw `Database error! ${err}`

      callback()
    })
  },

}