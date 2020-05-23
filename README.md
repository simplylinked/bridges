<p align="center">
  <img src="https://simplylinked.io/images/simplylinked-logo-128.png">
</p>

[![Build Status](https://travis-ci.org/linkpoolio/bridges.svg?branch=master)](https://travis-ci.org/linkpoolio/bridges)
[![codecov](https://codecov.io/gh/linkpoolio/bridges/branch/master/graph/badge.svg)](https://codecov.io/gh/linkpoolio/bridges)
[![Go Report Card](https://goreportcard.com/badge/github.com/linkpoolio/bridges)](https://goreportcard.com/report/github.com/linkpoolio/bridges)
-----------------------

Bridges is a Chainlink adaptor framework, lowering the barrier of entry for anyone to create their own:

- A tested hardened library that removes the need to build your own HTTP server, allowing you to just focus on 
adapter requirements.
- Simple interface to allow you to build an adapter that confides to Chainlink schema.
- Kept up to date with any changes, meaning no extra work for existing adapters to support new schema changes or 
features.
- Supports running in serverless environments such as AWS Lambda & GCP functions with minimal effort.

## Running in Cloudflare Workers

- Copy the content of index.js to your Workers
- Click "Save and Deploy"
- You are good to go!

## Example Implementations

### Basic
Bridges works by providing a simple interface to confide to. The interface contains two functions, `Run` and `Opts`. 
The `Run` function is called on each HTTP request, `Opts` is called on start-up. Below is a very basic implementation 
that returns the `value` as passed in by Chainlink, set back as `newValue` in the response:

```go
package main

import (
	"github.com/linkpoolio/bridges"
)

type MyAdapter struct{}

func (ma *MyAdapter) Run(h *bridge.Helper) (interface{}, error) {
	return map[string]string{"newValue": h.GetParam("value")}, nil
}

func (ma *MyAdapter) Opts() *bridge.Opts {
	return &bridge.Opts{
		Name:   "MyAdapter",
		Lambda: true,
	}
}

func main() {
	bridge.NewServer(&MyAdaptor{}).Start(8080)
}
```


### Contributing

We welcome all contributors, please raise any issues for any feature request, issue or suggestion you may have.
