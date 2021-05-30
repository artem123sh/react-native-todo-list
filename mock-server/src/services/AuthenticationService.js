
import jwt from 'jsonwebtoken';
import util from 'util';

export default class AuthenticationService {
    constructor() {
        this.secret = process.env.SECRET;
        this.accessTokenExpiresIn = process.env.EXPIRES_IN;
    }

    async login(login) {
        if (login !== 'admin' && login !== 'user') {
            return null;
        }
        const accessToken = await this.sign({ sub: login }, this.secret, this.accessTokenExpiresIn);
        return { accessToken, type: login };
    }

    async sign(payload) {
        return util.promisify(jwt.sign, jwt)(payload, this.secret, { expiresIn: this.accessTokenExpiresIn });
    }

    async verifyJwt(token) {
        return util.promisify(jwt.verify, jwt)(token, this.secret);
    }
}
