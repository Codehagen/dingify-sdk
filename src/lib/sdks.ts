/*
 * Code generated by Speakeasy (https://speakeasyapi.dev). DO NOT EDIT.
 */

import { ResponseMatcher, HTTPClient, matchStatusCode } from "./http.js";
import { SecurityState, resolveSecurity, resolveGlobalSecurity } from "./security.js";
import { pathToFunc } from "./url.js";
import { encodeForm } from "./encodings.js";
import { stringToBase64 } from "./base64.js";
import { SDK_METADATA } from "./config.js";
import { SDKHooks } from "../hooks/hooks.js";
import { HookContext } from "../hooks/types.js";

export type RequestOptions = {
    fetchOptions?: Omit<RequestInit, "method" | "body">;
};

type RequestConfig = {
    method: string;
    path: string;
    baseURL?: string | URL;
    query?: string;
    body?: RequestInit["body"];
    headers?: HeadersInit;
    security?: SecurityState | null;
    uaHeader?: string;
};

const gt: unknown = typeof globalThis === "undefined" ? null : globalThis;
const webWorkerLike =
    typeof gt === "object" &&
    gt != null &&
    "importScripts" in gt &&
    typeof gt["importScripts"] === "function";
const isBrowserLike =
    webWorkerLike ||
    (typeof navigator !== "undefined" && "serviceWorker" in navigator) ||
    (typeof window === "object" && typeof window.document !== "undefined");

export class ClientSDK {
    private readonly client: HTTPClient;
    protected readonly baseURL: URL | null;
    protected readonly hooks$: SDKHooks;

    constructor(init: { client: HTTPClient; baseURL: URL | null; hooks: SDKHooks }) {
        const url = init.baseURL;
        if (url) {
            url.pathname = url.pathname.replace(/\/+$/, "") + "/";
        }

        this.hooks$ = init.hooks;
        const { baseURL, client } = this.hooks$.sdkInit({ baseURL: url, client: init.client });
        this.baseURL = baseURL;
        this.client = client;
    }

    protected createRequest$(
        context: HookContext,
        conf: RequestConfig,
        options?: RequestOptions
    ): Request {
        const { method, path, query, headers: opHeaders, security } = conf;

        const base = conf.baseURL ?? this.baseURL;
        if (!base) {
            throw new TypeError("No base URL provided for operation");
        }
        const reqURL = new URL(base);
        const inputURL = new URL(path, reqURL);

        if (path) {
            reqURL.pathname += inputURL.pathname.replace(/^\/+/, "");
        }

        let finalQuery = query || "";

        const secQuery: string[] = [];
        for (const [k, v] of Object.entries(security?.queryParams || {})) {
            secQuery.push(encodeForm(k, v, { charEncoding: "percent" }));
        }
        if (secQuery.length) {
            finalQuery += `&${secQuery.join("&")}`;
        }

        if (finalQuery) {
            const q = finalQuery.startsWith("&") ? finalQuery.slice(1) : finalQuery;
            reqURL.search = `?${q}`;
        }

        const headers = new Headers(opHeaders);

        const username = security?.basic.username;
        const password = security?.basic.password;
        if (username != null || password != null) {
            const encoded = stringToBase64([username || "", password || ""].join(":"));
            headers.set("Authorization", `Basic ${encoded}`);
        }

        const securityHeaders = new Headers(security?.headers || {});
        for (const [k, v] of securityHeaders) {
            headers.set(k, v);
        }

        let cookie = headers.get("cookie") || "";
        for (const [k, v] of Object.entries(security?.cookies || {})) {
            cookie += `; ${k}=${v}`;
        }
        cookie = cookie.startsWith("; ") ? cookie.slice(2) : cookie;
        headers.set("cookie", cookie);

        const userHeaders = new Headers(options?.fetchOptions?.headers);
        for (const [k, v] of userHeaders) {
            headers.set(k, v);
        }

        // Only set user agent header in non-browser-like environments since CORS
        // policy disallows setting it in browsers e.g. Chrome throws an error.
        if (!isBrowserLike) {
            headers.set(conf.uaHeader ?? "user-agent", SDK_METADATA.userAgent);
        }

        const input = this.hooks$.beforeCreateRequest(context, {
            url: reqURL,
            options: {
                ...options?.fetchOptions,
                body: conf.body ?? null,
                headers,
                method,
            },
        });

        return new Request(input.url, input.options);
    }

    protected async do$(
        req: Request,
        options: {
            context: HookContext;
            errorCodes: number | string | (number | string)[];
        }
    ): Promise<Response> {
        const { context, errorCodes } = options;

        let response = await this.client.request(await this.hooks$.beforeRequest(context, req));

        if (matchStatusCode(response, errorCodes)) {
            const result = await this.hooks$.afterError(context, response, null);
            if (result.error) {
                throw result.error;
            }
            response = result.response || response;
        } else {
            response = await this.hooks$.afterSuccess(context, response);
        }

        return response;
    }

    protected matcher<Result>(): ResponseMatcher<Result> {
        return new ResponseMatcher<Result>();
    }

    protected templateURLComponent = pathToFunc;

    protected resolveSecurity = resolveSecurity;
    protected resolveGlobalSecurity = resolveGlobalSecurity;
}
