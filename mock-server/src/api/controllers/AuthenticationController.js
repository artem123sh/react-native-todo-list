export default class AuthenticationController {
    constructor(service) {
        this.service = service;
    }

    login = async (req, res, next) => {
        try {
            const { login } = req.body;
            const authorization = await this.service.login(login);
            if (authorization && authorization.accessToken) {
                res.cookie('jwt', authorization.accessToken, {
                    maxAge: process.env.EXPIRES_IN,
                    httpOnly: true
                });
                return res.status(200).json({ type: login });
            }
            res.cookie('jwt', null, { maxAge: 0, httpOnly: true });
            res.sendStatus(401);
        } catch (e) {
            return next(e);
        }
    }
}
