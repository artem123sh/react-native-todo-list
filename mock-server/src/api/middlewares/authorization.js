export const verifyAdmin = async (req, res, next) => {
    if (req.type !== 'admin') {
        return res.sendStatus(403);
    }
    next();
};

export const verifyTokenWith = (authorizationService) => async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.sendStatus(401);
    }
    try {
        const { sub } = await authorizationService.verifyAccessToken(token);
        req.type = sub;
    } catch (e) {
        return res.sendStatus(403);
    }
    next();
};
