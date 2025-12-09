import { body } from "express-validator"

const allowedStates = ["privada", "publica"];

export const updateCollectionValidator = [
    body('nombre')
        .notEmpty().withMessage("El nombre de la coleccion es requerido"),

    body('descripcion')
        .optional({ nullable: true, checkFalsy: true })
        .isLength({ min: 8 }).withMessage("La longitud minima de la descripcion es 8 letras"),

    body("visibilidad")
        .notEmpty()
        .withMessage("Indique la visibilidad")
        .isIn(allowedStates)
        .withMessage(`Escoja una visibilidad predefinido: ${allowedStates.join(", ")}`),
]