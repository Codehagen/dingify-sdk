<!-- Start SDK Example Usage [usage] -->
```typescript
import { Dingify } from "dingify";

const dingify = new Dingify({
    apiKey: "<YOUR_API_KEY_HERE>",
});

async function run() {
    const result = await dingify.events.create({
        name: "You got a new payment",
        channel: "new-channel-name",
        userId: "user-999",
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
<!-- End SDK Example Usage [usage] -->