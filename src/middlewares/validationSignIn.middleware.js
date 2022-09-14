import db from "../database/db.js";
import { COLLECTIONS } from "../enums/collections.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import { signInSchema } from "../schemas/authSchemas.js";

async function verifySignIn(req, res, next) {
    const { password, email } = req.body;

    const validation = signInSchema.validate(
        {
            email,
            password,
        },
        { abortEarly: false }
    );

    if (validation.error) {
        const erros = validation.error.details.map(
            (details) => details.message
        );
        return res.status(STATUS_CODE.BAD_REQUEST).send(erros);
    }

    const user = await db.collection(COLLECTIONS.USERS).findOne({ email });
    if (user === null) {
        return res
            .status(STATUS_CODE.BAD_REQUEST)
            .send({ message: "Email ou senha incorretos" });
    }

    res.locals.user = user;

    next();
}

export default verifySignIn;
