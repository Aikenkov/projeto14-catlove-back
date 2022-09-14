import joi from "joi";

const signUpSchema = joi.object({
    name: joi.string().trim().min(1).max(30).required().strict(),
    email: joi.string().email().required().trim().strict(),
    password: joi.string().min(4).required().trim().strict(),
    image: joi.string().uri().required(),
});

const signInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required().trim().strict(),
});

export { signUpSchema, signInSchema };
