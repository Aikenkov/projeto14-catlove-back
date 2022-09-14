import db from "../database/db.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import { productSchema } from "../schemas/productSchema.js";

async function verifySignUp(req, res, next) {
    const { _id, amount } = req.body;

    const validation = productSchema.validate(
        {
            _id,
            amount,
        },
        { abortEarly: false }
    );

    if (validation.error) {
        const erros = validation.error.details.map(
            (details) => details.message
        );
        return res.status(STATUS_CODE.BAD_REQUEST).send(erros);
    }

    next();
}

export default verifySignUp;
