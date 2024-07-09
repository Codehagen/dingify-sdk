/*
 * Code generated by Speakeasy (https://speakeasyapi.dev). DO NOT EDIT.
 */

import * as z from "zod";

export type Event = {
    /**
     * The ID of the event.
     */
    id: string;
    /**
     * The name of the event.
     */
    name: string;
    /**
     * The ID of the channel associated with the event.
     */
    channelId: string;
    /**
     * The ID of the user associated with the event.
     */
    userId: string;
    /**
     * An optional icon for visual representation of the event.
     */
    icon: string;
    /**
     * Flag indicating whether users should be notified about the event.
     */
    notify: boolean;
    /**
     * Tags providing additional context or categorization for the event.
     */
    tags?: { [k: string]: string } | undefined;
    /**
     * The timestamp when the event was created.
     */
    createdAt: Date;
};

/** @internal */
export const Event$inboundSchema: z.ZodType<Event, z.ZodTypeDef, unknown> = z.object({
    id: z.string(),
    name: z.string(),
    channelId: z.string(),
    userId: z.string(),
    icon: z.string(),
    notify: z.boolean(),
    tags: z.record(z.string()).optional(),
    createdAt: z
        .string()
        .datetime({ offset: true })
        .transform((v) => new Date(v)),
});

/** @internal */
export type Event$Outbound = {
    id: string;
    name: string;
    channelId: string;
    userId: string;
    icon: string;
    notify: boolean;
    tags?: { [k: string]: string } | undefined;
    createdAt: string;
};

/** @internal */
export const Event$outboundSchema: z.ZodType<Event$Outbound, z.ZodTypeDef, Event> = z.object({
    id: z.string(),
    name: z.string(),
    channelId: z.string(),
    userId: z.string(),
    icon: z.string(),
    notify: z.boolean(),
    tags: z.record(z.string()).optional(),
    createdAt: z.date().transform((v) => v.toISOString()),
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace Event$ {
    /** @deprecated use `Event$inboundSchema` instead. */
    export const inboundSchema = Event$inboundSchema;
    /** @deprecated use `Event$outboundSchema` instead. */
    export const outboundSchema = Event$outboundSchema;
    /** @deprecated use `Event$Outbound` instead. */
    export type Outbound = Event$Outbound;
}
