# dingify

<div align="left">
    <a href="https://speakeasyapi.dev/"><img src="https://custom-icon-badges.demolab.com/badge/-Built%20By%20Speakeasy-212015?style=for-the-badge&logoColor=FBE331&logo=speakeasy&labelColor=545454" /></a>
    <a href="https://opensource.org/licenses/MIT">
        <img src="https://img.shields.io/badge/License-MIT-blue.svg" style="width: 100px; height: 28px;" />
    </a>
</div>

## SDK Installation

### NPM

```bash
npm add dingify
```

### Yarn

```bash
yarn add dingify
```


<!-- Start SDK Example Usage [usage] -->
## SDK Example Usage

### Example

```typescript
import { Dingify } from "dingify";

const dingify = new Dingify({
    apiKey: "<YOUR_API_KEY_HERE>",
});

async function run() {
    const result = await dingify.events.create({
        name: "You got a new payment",
        channel: "new-channel-name",
        icon: "🎉",
        notify: true,
        tags: {
            plan: "premium",
            cycle: "monthly",
        },
    });

    // Handle the result
    console.log(result);
}

run();

```

## Authentication

### Per-Client Security Schemes

This SDK supports the following security scheme globally:

| Name     | Type     | Scheme   |
| -------- | -------- | -------- |
| `apiKey` | apiKey   | API key  |

To authenticate with the API the `apiKey` parameter must be set when initializing the SDK client instance. For example:
```typescript
import { Dingify } from "dingify";

const dingify = new Dingify({
    apiKey: "<YOUR_API_KEY_HERE>",
});

async function run() {
    const result = await dingify.events.create({
        name: "You got a new payment",
        channel: "new-channel-name",
        icon: "🎉",
        notify: true,
        tags: {
            plan: "premium",
            cycle: "monthly",
        },
    });

    // Handle the result
    console.log(result);
}

run();

```
# Development

## Maturity

This SDK is in beta, and there may be breaking changes between versions without a major version update. Therefore, we recommend pinning usage
to a specific package version. This way, you can install the same version each time without breaking changes unless you are intentionally
looking for the latest version.

## Contributions

While we value open-source contributions to this SDK, this library is generated programmatically.
Feel free to open a PR or a Github issue as a proof of concept and we'll do our best to include it in a future release!

### SDK Created by [Speakeasy](https://docs.speakeasyapi.dev/docs/using-speakeasy/client-sdks)
