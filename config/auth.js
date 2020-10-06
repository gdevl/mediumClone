const jwt = require('jsonwebtoken');
const { jwtConfig } = require('./config');

const {secret, expiresIn} = jwtConfig;

const getUserToken = (user) => {
    const userDataForToken = {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    };
    const token = jwt.sign(
        {data: userDataForToken},
        secret,
        {expiresIn: parseInt(expiresIn, 10)},
    );
    return token;
}

module.exports = {
    getUserToken,
}
