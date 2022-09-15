import db from "../database/db.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import { COLLECTIONS } from "../enums/collections.js";
import { ObjectId } from "mongodb";

async function getProducts(req, res) {
    const queryName = req.query.search;
    const queryCategory = req.query.category;

    let products;

    try {
        products = await db.collection(COLLECTIONS.PRODUCTS).find().toArray();
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
            return name.includes(queryName.toUpperCase());
        });

        return res.status(STATUS_CODE.OK).send(filtered);
    }

    res.status(STATUS_CODE.OK).send(products);
}

async function insertOnCart(req, res) {
    const { products } = req.body;
    const session = res.locals.session;

    try {
        const cart = await db
            .collection(COLLECTIONS.CART)
            .findOne({ userId: session.userId });

        if (cart !== null) {
            await db.collection(COLLECTIONS.CART).updateOne(
                { userId: ObjectId(session.userId) },
                {
                    $set: {
                        products: products,
                    },
                }
            );
        }

        if (cart === null) {
            await db.collection(COLLECTIONS.CART).insertOne({
                userId: session.userId,
                products: products,
            });
        }

        res.sendStatus(STATUS_CODE.CREATED);
    } catch (error) {
        console.error(error.message);
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}

async function getCart(req, res) {
    const session = res.locals.session;

    try {
        const cart = await db
            .collection(COLLECTIONS.CART)
            .findOne({ userId: session.userId });

        if (cart === null) {
            return res.send([]);
        }
        res.send(cart.products);
    } catch (error) {
        console.error(error.message);
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}

export { getProducts, insertOnCart, getCart };
