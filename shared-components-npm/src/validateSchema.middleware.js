"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const yup_1 = require("yup");
const validateSchema = (schema, test = "b") => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const dataToValidate = getDataToValidate(req, test);
            yield schema.validate(dataToValidate, {
                abortEarly: true,
                stripUnknown: true,
            });
            next();
        }
        catch (err) {
            console.error(err);
            if (err instanceof yup_1.ValidationError) {
                res.status(400).json({ errors: err.errors });
            }
            else {
                res.status(500).json({ error: "Internal Server Error" });
            }
        }
    });
};
exports.validateSchema = validateSchema;
const getDataToValidate = (req, test) => {
    switch (test) {
        case "b":
            return req.body;
        case "p":
            return req.params;
        case "q":
            return req.query;
        default:
            throw new Error("Invalid test type");
    }
};
