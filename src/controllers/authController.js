import db from "../database/db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { STATUS_CODE } from "../enums/statusCode.js";
import { COLLECTIONS } from "../enums/collections.js";

async function signUp(req, res) {
    const { name, password, email, image } = req.body;

    const passwordHash = bcrypt.hashSync(password, 10);

    try {
        await db
            .collection(COLLECTIONS.USERS)
            .insertOne({ name, email, image, password: passwordHash });
        res.sendStatus(STATUS_CODE.OK);
    } catch (error) {
        console.log(error.message);
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}
export { signUp };
