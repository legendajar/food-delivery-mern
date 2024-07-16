import jwt from 'jsonwebtoken'


const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Not Authorize, Login Again!'
        })
    }

    try {
        // this will convert the token to userid
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log(token_decode);

        // using this we can add, remove and get data
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            success: false,
            message: "Error"
        })
    }
}

export default authMiddleware