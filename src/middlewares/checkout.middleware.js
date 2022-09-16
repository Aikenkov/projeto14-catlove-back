import { STATUS_CODE } from "../enums/statusCode.js";
import { checkoutSchema } from "../schemas/checkoutSchema.js";

async function verifyCheckout(req, res, next) {
    const { value, name, payment, products } = req.body;

    const validation = checkoutSchema.validate(
        {
            value,
            name,
            payment,
            products,
        },
        { abortEarly: false }
    );

    if (validation.error) {
        const erros = validation.error.details.map(
            (details) => details.message
        );
        return res.status(STATUS_CODE.BAD_REQUEST).send(erros);
    }

    if (products.length === 0) {
        return res
            .status(STATUS_CODE.BAD_REQUEST)
            .send({ message: "Nenhum produto no carrinho" });
    }

    next();
}

export default verifyCheckout;
