/*
 * Code generated by Speakeasy (https://speakeasyapi.dev). DO NOT EDIT.
 */

import { Event, Event$ } from "./event.js";
import * as z from "zod";

export type EventsResponse = {
    ok?: boolean | undefined;
    events?: Array<Event> | undefined;
};

/** @internal */
export namespace EventsResponse$ {
    export const inboundSchema: z.ZodType<EventsResponse, z.ZodTypeDef, unknown> = z.object({
        ok: z.boolean().optional(),
        events: z.array(Event$.inboundSchema).optional(),
    });

    export type Outbound = {
        ok?: boolean | undefined;
        events?: Array<Event$.Outbound> | undefined;
    };

    export const outboundSchema: z.ZodType<Outbound, z.ZodTypeDef, EventsResponse> = z.object({
        ok: z.boolean().optional(),
        events: z.array(Event$.outboundSchema).optional(),
    });
}
