function authRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) {
            res.status(401)
            return res.send('Bạn không có quyền vào đây!!!')
        }

        next()
    }
}




module.exports = {
    authRole,

}