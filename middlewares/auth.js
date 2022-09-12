const jwt = require('jsonwebtoken')


const auth = (req, res, next) => {
    const token = req.headers['authorization'];
    //console.log(req.headers)
    // test token in Post with get /api/private
    // set Headers => Authorization + token
    if(token){
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if(err){
                return res.json({ message : "token invalid"})
            } else {
                req.decoded = decoded
                next()
            }
        })
    } else {
        return res.json ({ message: "missing access token"})
    }
}

module.exports = auth