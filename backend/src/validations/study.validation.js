import z from "zod";

export const studySchema=z.object({
    question:z.string().trim().min(1,"Question is required").max(500,"Question must be less than 500 characters")
})