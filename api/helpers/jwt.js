'use-strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clavesecreta';

exports.createToken = function(user)
{
    var payload = {
        sub: user._id,
        nombres: user.nombres,
        apellidos: user.apellidos,
        email: user.email,
        rol: user.rol,
        iat : moment().unix(),
        exp: moment().add(30,'days').unix()

    }

    return jwt.encode(payload,secret);
}