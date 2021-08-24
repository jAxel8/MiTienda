'use-strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clavesecreta';

exports.auth = function(req,res,next)
{
    
    if(!req.headers.authorization)
    {
        return res.status(403).send({message:'NO-HEADERS-ERROR'});
    }

    var token = req.headers.authorization.replace(/['"]+/g,'');

    var segment = token.split('.');


    if(segment.length != 3)
    {
        return res.status(403).send({message:'INVALID TOKEN'});
    }else{
        try {
            var payload = jwt.decode(token,secret);
            if(payload.exp <= moment().unix())
            {
                return res.status(403).send({message:'EXPIRED TOKEN'});
            }
            
        } catch (error) {
            return res.status(403).send({message:'INVALID TOKEN'});

        }
    }

    req.user = payload;
    
    next();
}