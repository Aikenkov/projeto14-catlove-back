import db from "../database/db.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import { COLLECTIONS } from "../enums/collections.js";

async function getProducts(req, res) {
    const session = res.locals.session;

    try {
        lista = await db.collection("produtos").find().toArray();
    } catch (error) {
        console.log("ui");
    }
    console.log(lista);
    res.send(lista);
}

export { getProducts };
