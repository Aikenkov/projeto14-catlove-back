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

async function signIn(req, res) {
    const { password } = req.body;
    const user = res.locals.user;

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (passwordIsValid) {
        const token = uuid();

        try {
            const exist = await db.collection(COLLECTIONS.USERS).findOne({
                userId: user._id,
            });

            if (exist) {
                await db
                    .collection(COLLECTIONS.SESSIONS)
                    .updateOne({ userId: user._id }, { $set: { token } });
                return res.send({ name: user.name, image: user.image, token });
            }
        } catch (error) {
            console.log(error.message);
            res.sendStatus(STATUS_CODE.SERVER_ERROR);
        }

        try {
            await db.collection(COLLECTIONS.SESSIONS).insertOne({
                userId: user._id,
                token,
            });
        } catch (error) {
            console.log(error.message);
            res.sendStatus(STATUS_CODE.SERVER_ERROR);
        }
        return res.send({ name: user.name, image: user.image, token });
    } else {
        return res
            .status(STATUS_CODE.BAD_REQUEST)
            .send({ message: "Email ou senha incorretos" });
    }
}

export { signUp, signIn };
