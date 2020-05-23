<p align="center">
  <img src="https://simplylinked.io/images/simplylinked-logo-128.png">
</p>

-----------------------

Chainlink external adapter to retrieve Coinbase spot price.

## Prerequisites
- Coinbase API Key with view permission

## Running in Cloudflare Workers

- Copy the content of '''index.js''' to your Workers script
- Click "Save and Deploy"
- Workers script will be deployed to URL like : WorkersName.YourAccountName.workers.dev 
- You are good to go!

## Request Example (curl)

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
## Response Example (curl)
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

## JobSpec Example
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

## Contract Usage
```
// ...
Chainlink.Request memory req = buildChainlinkRequest(stringToBytes32(_jobId), this, this.fulfillEthereumPrice.selector);
req.add("pair", "ETH-USD");
sendChainlinkRequestTo(_oracle, req, ORACLE_PAYMENT);
// ...
```

## JobRun Result Example
```
{
  "id": "afb0155493024ab2838b65524b9c2c3b",
  "jobId": "16c9245322f94344aefeb87ef50c0404",
  "result": {
    "data": {
      "result": "0xc21be8e43eb0d6997e60d611d4e9211ec263375bd01647a9a27790358bd17b91",
      "ethereumReceipts": [
        {
          "logs": [
            {
              "data": "0x",
              "topics": [
                "0x7cc135e0cebb02c3480ae5d74d377283180a2601f8f644edf7987b009316c63a",
                "0xd2199788a15c60ebbe1e4f14909971fa728afbe903b5154de65143878f50293c"
              ],
              "address": "0x46ddce7c95268a373a1881195beb3e5a37952a72",
              "removed": false,
              "logIndex": "0x3",
              "blockHash": "0x7a5352715395dfe9125d99135919d964986c5ddbc75574c9d003398d5a3e4cd1",
              "blockNumber": "0x7961c0",
              "transactionHash": "0xc21be8e43eb0d6997e60d611d4e9211ec263375bd01647a9a27790358bd17b91",
              "transactionIndex": "0x3"
            },
            {
              "data": "0x",
              "topics": [
                "0x794eb9e29f6750ede99e05248d997a9ab9fa23c4a7eaff8afa729080eb7c6428",
                "0xd2199788a15c60ebbe1e4f14909971fa728afbe903b5154de65143878f50293c",
                "0x00000000000000000000000000000000000000000000000000000000000050ff"
              ],
              "address": "0x46ddce7c95268a373a1881195beb3e5a37952a72",
              "removed": false,
              "logIndex": "0x4",
              "blockHash": "0x7a5352715395dfe9125d99135919d964986c5ddbc75574c9d003398d5a3e4cd1",
              "blockNumber": "0x7961c0",
              "transactionHash": "0xc21be8e43eb0d6997e60d611d4e9211ec263375bd01647a9a27790358bd17b91",
              "transactionIndex": "0x3"
            }
          ],
          "blockHash": "0x7a5352715395dfe9125d99135919d964986c5ddbc75574c9d003398d5a3e4cd1",
          "blockNumber": "7954880",
          "transactionHash": "0xc21be8e43eb0d6997e60d611d4e9211ec263375bd01647a9a27790358bd17b91"
        }
      ],
      "latestOutgoingTxHash": "0xc21be8e43eb0d6997e60d611d4e9211ec263375bd01647a9a27790358bd17b91"
    },
    "error": null
  },
  "status": "completed",
  "taskRuns": [
    {
      "id": "888d63ff63de48818a07b40c057f8439",
      "result": {
        "data": {
          "base": "ETH",
          "pair": "ETH-USD",
          "amount": "207.35",
          "address": "0x28F8FAD286C4F40b6564C8fd8C0a30B02F39E250",
          "headers": {
            "API_SECRET": [
              "E54H5T/tlPF5ChjPbtkz0gLhPw35C5OIyT7uU+8Tzs57LvX1R9GqrUNtlzC/zjGETdLHAiHLCwpsUnyyBI/8yQ=="
            ]
          },
          "currency": "USD",
          "dataPrefix": "0xd2199788a15c60ebbe1e4f14909971fa728afbe903b5154de65143878f50293c0000000000000000000000000000000000000000000000000de0b6b3a764000000000000000000000000000046ddce7c95268a373a1881195beb3e5a37952a7292cdaaf300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005ec8ebf8",
          "functionSelector": "0x4ab0d190"
        },
        "error": null
      },
      "status": "completed",
      "task": {
        "ID": 135,
        "CreatedAt": "2020-05-23T05:45:52.301222Z",
        "UpdatedAt": "2020-05-23T05:45:52.301222Z",
        "DeletedAt": null,
        "type": "coinbase-spot-price",
        "confirmations": null,
        "params": {
          "headers": {
            "API_SECRET": [
              "E54H5T/tlPF5ChjPbtkz0gLhPw35C5OIyT7uU+8Tzs57LvX1R9GqrUNtlzC/zjGETdLHAiHLCwpsUnyyBI/8yQ=="
            ]
          }
        }
      },
      "minimumConfirmations": 3,
      "confirmations": 3
    },
    {
      "id": "b200a41e616941909ac8bc4cfbc33183",
      "result": {
        "data": {
          "result": "207.35"
        },
        "error": null
      },
      "status": "completed",
      "task": {
        "ID": 136,
        "CreatedAt": "2020-05-23T05:45:52.305465Z",
        "UpdatedAt": "2020-05-23T05:45:52.305465Z",
        "DeletedAt": null,
        "type": "copy",
        "confirmations": null,
        "params": {
          "copyPath": [
            "amount"
          ]
        }
      },
      "minimumConfirmations": 3,
      "confirmations": null
    },
    {
      "id": "45d111263eee4022bd36c90457d3f1db",
      "result": {
        "data": {
          "result": "20735"
        },
        "error": null
      },
      "status": "completed",
      "task": {
        "ID": 137,
        "CreatedAt": "2020-05-23T05:45:52.317148Z",
        "UpdatedAt": "2020-05-23T05:45:52.317148Z",
        "DeletedAt": null,
        "type": "multiply",
        "confirmations": null,
        "params": {
          "times": 100
        }
      },
      "minimumConfirmations": 3,
      "confirmations": null
    },
    {
      "id": "e3ae2654d99b4b43a944d7fb7dd34513",
      "result": {
        "data": {
          "result": "0x00000000000000000000000000000000000000000000000000000000000050ff"
        },
        "error": null
      },
      "status": "completed",
      "task": {
        "ID": 138,
        "CreatedAt": "2020-05-23T05:45:52.320837Z",
        "UpdatedAt": "2020-05-23T05:45:52.320837Z",
        "DeletedAt": null,
        "type": "ethuint256",
        "confirmations": null,
        "params": {
        }
      },
      "minimumConfirmations": 3,
      "confirmations": null
    },
    {
      "id": "42c6aa8b789d4c1c97f8ff1165110e1c",
      "result": {
        "data": {
          "result": "0xc21be8e43eb0d6997e60d611d4e9211ec263375bd01647a9a27790358bd17b91",
          "ethereumReceipts": [
            {
              "logs": [
                {
                  "data": "0x",
                  "topics": [
                    "0x7cc135e0cebb02c3480ae5d74d377283180a2601f8f644edf7987b009316c63a",
                    "0xd2199788a15c60ebbe1e4f14909971fa728afbe903b5154de65143878f50293c"
                  ],
                  "address": "0x46ddce7c95268a373a1881195beb3e5a37952a72",
                  "removed": false,
                  "logIndex": "0x3",
                  "blockHash": "0x7a5352715395dfe9125d99135919d964986c5ddbc75574c9d003398d5a3e4cd1",
                  "blockNumber": "0x7961c0",
                  "transactionHash": "0xc21be8e43eb0d6997e60d611d4e9211ec263375bd01647a9a27790358bd17b91",
                  "transactionIndex": "0x3"
                },
                {
                  "data": "0x",
                  "topics": [
                    "0x794eb9e29f6750ede99e05248d997a9ab9fa23c4a7eaff8afa729080eb7c6428",
                    "0xd2199788a15c60ebbe1e4f14909971fa728afbe903b5154de65143878f50293c",
                    "0x00000000000000000000000000000000000000000000000000000000000050ff"
                  ],
                  "address": "0x46ddce7c95268a373a1881195beb3e5a37952a72",
                  "removed": false,
                  "logIndex": "0x4",
                  "blockHash": "0x7a5352715395dfe9125d99135919d964986c5ddbc75574c9d003398d5a3e4cd1",
                  "blockNumber": "0x7961c0",
                  "transactionHash": "0xc21be8e43eb0d6997e60d611d4e9211ec263375bd01647a9a27790358bd17b91",
                  "transactionIndex": "0x3"
                }
              ],
              "blockHash": "0x7a5352715395dfe9125d99135919d964986c5ddbc75574c9d003398d5a3e4cd1",
              "blockNumber": "7954880",
              "transactionHash": "0xc21be8e43eb0d6997e60d611d4e9211ec263375bd01647a9a27790358bd17b91"
            }
          ],
          "latestOutgoingTxHash": "0xc21be8e43eb0d6997e60d611d4e9211ec263375bd01647a9a27790358bd17b91"
        },
        "error": null
      },
      "status": "completed",
      "task": {
        "ID": 139,
        "CreatedAt": "2020-05-23T05:45:52.324588Z",
        "UpdatedAt": "2020-05-23T05:45:52.324588Z",
        "DeletedAt": null,
        "type": "ethtx",
        "confirmations": null,
        "params": {
        }
      },
      "minimumConfirmations": 3,
      "confirmations": 3
    }
  ],
  "createdAt": "2020-05-23T09:20:15.929792Z",
  "finishedAt": "2020-05-23T09:22:15.203135Z",
  "updatedAt": "2020-05-23T09:22:15.220076Z",
  "creationHeight": "7954876",
  "observedHeight": "7954881",
  "payment": "1000000000000000000",
  "initiator": {
    "type": "runlog",
    "params": {
      "address": "0x28f8fad286c4f40b6564c8fd8c0a30b02f39e250"
    }
  }
}
```

### Contributing

We welcome all contributors, please raise any issues for any feature request, issue or suggestion you may have.
