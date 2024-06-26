/*
 * Code generated by Speakeasy (https://speakeasyapi.dev). DO NOT EDIT.
 */

import * as z from "zod";

/**
 * API key is required
 */
export type UnauthorizedErrorData = {
    ok: boolean;
    message: string;
};

/**
 * API key is required
 */
export class UnauthorizedError extends Error {
    ok: boolean;

    /** The original data that was passed to this error instance. */
    data$: UnauthorizedErrorData;

    constructor(err: UnauthorizedErrorData) {
        super("");
        this.data$ = err;

        this.ok = err.ok;

        this.message =
            "message" in err && typeof err.message === "string"
                ? err.message
                : "API error occurred";

        this.name = "UnauthorizedError";
    }
}

/** @internal */
export namespace UnauthorizedError$ {
    export const inboundSchema: z.ZodType<UnauthorizedError, z.ZodTypeDef, unknown> = z
        .object({
            ok: z.boolean(),
            message: z.string(),
        })
        .transform((v) => {
            return new UnauthorizedError(v);
        });

    export type Outbound = {
        ok: boolean;
        message: string;
    };

    export const outboundSchema: z.ZodType<Outbound, z.ZodTypeDef, UnauthorizedError> = z
        .instanceof(UnauthorizedError)
        .transform((v) => v.data$)
        .pipe(
            z.object({
                ok: z.boolean(),
                message: z.string(),
            })
        );
}
