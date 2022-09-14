import db from "../database/db.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import { COLLECTIONS } from "../enums/collections.js";

async function getProducts(req, res) {
    const queryName = req.query.search;
    const queryCategory = req.query.category;

    let products;

    try {
        products = await db.collection("produtos").find().toArray();
    } catch (error) {
        console.error(error.message);
        return res.sendStatus(STATUS_CODE.BAD_REQUEST);
    }

    if (queryCategory) {
        let filtered = products.filter((e) => {
            const name = e.category.toUpperCase();
            return name.includes(queryCategory.toUpperCase());
        });

        return res.status(STATUS_CODE.OK).send(filtered);
    }

    if (queryName) {
        let filtered = products.filter((e) => {
            const name = e.name.toUpperCase();
            return name.includes(query.toUpperCase());
        });

        return res.status(STATUS_CODE.OK).send(filtered);
    }

    res.status(STATUS_CODE.OK).send(products);
}

export { getProducts };
