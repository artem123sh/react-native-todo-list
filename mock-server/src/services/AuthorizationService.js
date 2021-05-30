import jwt from 'jsonwebtoken';
import util from 'util';

export default class AuthorizationService {
    constructor() {
        this.secret = process.env.SECRET;
    }

    async verifyAccessToken(token) {
        return util.promisify(jwt.verify, jwt)(token, this.secret);
    }
}
