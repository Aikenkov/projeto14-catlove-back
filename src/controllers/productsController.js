import db from "../database/db.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import { COLLECTIONS } from "../enums/collections.js";

async function getProducts(req, res) {
    const session = res.locals.session;

    try {
        const products = await db.collection("produtos").find().toArray();

        return res.status(STATUS_CODE.OK).send(products);
    } catch (error) {
        console.error(error.message);
        return res.sendStatus(STATUS_CODE.BAD_REQUEST);
    }
}

export { getProducts };
