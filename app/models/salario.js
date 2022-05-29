module.exports = function () {
    this.update = (post, connection, callback) => {
        connection.query("UPDATE salario SET valor="+post.valor+" WHERE idsalario = "+post.id, callback)
    }

    this.insert = (post, connection, callback) => {
        connection.query("INSERT INTO salario SET valor="+post.valor+", data='"+post.data+"', user_id="+post.user_id, callback)
    }

    this.get = (connection,callback) => {
        connection.query("SELECT idsalario, DATE_FORMAT(data,'%Y-%m-%d') as data, valor FROM salario ORDER BY idsalario DESC",callback)
    }

    return this
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               