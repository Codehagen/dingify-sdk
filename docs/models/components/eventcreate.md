# EventCreate


## Fields

| Field                                            | Type                                             | Required                                         | Description                                      | Example                                          |
| ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ |
| `name`                                           | *string*                                         | :heavy_check_mark:                               | The name of the event.                           | You got a new payment                            |
| `channel`                                        | *string*                                         | :heavy_check_mark:                               | The channel name where the event is registered.  | new-channel-name                                 |
| `icon`                                           | *string*                                         | :heavy_minus_sign:                               | An optional icon representing the event.         | 🎉                                               |
| `notify`                                         | *boolean*                                        | :heavy_check_mark:                               | Whether to notify users about the event.         | true                                             |
| `tags`                                           | Record<string, *string*>                         | :heavy_minus_sign:                               | Additional tags providing context for the event. | {<br/>"plan": "premium",<br/>"cycle": "monthly"<br/>} |