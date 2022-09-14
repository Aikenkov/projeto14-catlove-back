import db from "../database/db.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import { signUpSchema } from "../schemas/authSchemas.js";

async function verifySignUp(req, res, next) {
    const { name, password, email, image, confirm } = req.body;

    if (confirm !== password) {
        return res.sendStatus(STATUS_CODE.BAD_REQUEST);
    }

    const validation = signUpSchema.validate(
        {
            name,
            email,
            password,
            image,
        },
        { abortEarly: false }
    );

    if (validation.error) {
        const erros = validation.error.details.map(
            (details) => details.message
        );
        return res.status(STATUS_CODE.BAD_REQUEST).send(erros);
    }

    const alreadyExists = await db
        .collection("users")
        .findOne({ email: email });

    if (alreadyExists) {
        return res
            .status(STATUS_CODE.BAD_REQUEST)
            .send({ message: "Email já existente" });
    }

    next();
}

export default verifySignUp;
