<p align="center">
  <img src="https://simplylinked.io/images/simplylinked-logo-128.png">
</p>

-----------------------

Chainlink external adapter to retrieve Coinbase spot price.

## Prerequisites
- Coinbase API Key with view permission

## Running in Cloudflare Workers

- Copy the content of index.js to your Workers
- Click "Save and Deploy"
- Script will be deployed to URL like : WorkersName.YourAccountName.workers.dev 
- You are good to go!

## Usage Example (curl)

```
curl -X POST https://WorkersName.YourAccountName.workers.dev -H 'Content-Type: application/json' \
-d @- << EOF
{
  "id": "1234",
  "data": {
    "pair": "ETH-USD",
    "headers": {
      "API_SECRET": "YOUR_COINBASE_API_KEY"
    }
  }
}
EOF
```
## REST Response Example
```
{
   "jobRunID":"1234",
   "data":{
      "base":"ETH",
      "currency":"USD",
      "amount":"206.535"
   }
}
```

## Usage Example (JobSpec)
```
{
  "initiators": [
    {
      "type": "runlog",
      "params": {
        "address": "YOUR_ORACLE_ADDRESS"
      }
    }
  ],
  "tasks": [
    {
      "type": "coinbase-spot-price",
      "confirmations": null,
      "params": {
        "headers": {
          "API_SECRET": [
            "YOUR_COINBASE_API_KEY"
          ]
        }
      }
    },
    {
      "type": "copy",
      "confirmations": null,
      "params": {
        "copyPath": [
          "amount"
        ]
      }
    },
    {
      "type": "multiply",
      "confirmations": null,
      "params": {
        "times": 100
      }
    },
    {
      "type": "ethuint256",
      "confirmations": null,
      "params": {
      }
    },
    {
      "type": "ethtx",
      "confirmations": null,
      "params": {
      }
    }
  ],
  "startAt": null,
  "endAt": null
}
```

### Contributing

We welcome all contributors, please raise any issues for any feature request, issue or suggestion you may have.
