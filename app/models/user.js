module.exports = function () {
    this.update = (post, validate, connection, callback) => {
        var pass = (validate.password) ? ',pass=?' : '';
        connection.query("UPDATE user SET name= ?,name_last= ?" + pass + " WHERE id = ?", post, callback)
    }

    this.insert = (post, connection, callback) => {
        connection.query("INSERT INTO user SET name=?, name_last=?,email=?,pass=?", post, callback)
    }

    this.get = (data, connection, callback) => {
        connection.query("SELECT email,id,name,pass,name_last FROM user WHERE email='" + data.email + "'", callback)
    }

    return this
}