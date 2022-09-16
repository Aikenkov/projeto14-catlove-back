import joi from "joi";

const checkoutSchema = joi.object({
    name: joi.string().trim().min(1).max(30).required().strict(),
    value: joi.number().required(),
    payment: joi.string().required().valid("credit", "debit"),
    products: joi.array().required(),
});

export { checkoutSchema };
