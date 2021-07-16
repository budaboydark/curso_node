module.exports = function () {
    this.getLimiteLast = (connection, callback) => {
        connection.query("SELECT * FROM limite_conta ORDER BY id DESC LIMIT 1", callback)
    }

    this.updateBanco = (post, connection, callback) => {
        var saldo = (post.total - post.utilizado);
        connection.query("UPDATE limite_conta SET total="+post.total+", utilizado="+post.utilizado+",saldo = "+saldo+" WHERE id = "+post.id, callback)
    }

    return this
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               