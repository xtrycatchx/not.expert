---
title: Creating cross-platform library for mobile using Golang
date: '2020-04-11'
spoiler: In this tutorial, we will try to create a minimal hello world is a dynamic library using golang and have it wrapped into libraries ready to be used for IOS or Android app.
---

A disclaimer for this this article is that I am a noob to Golang, and so if you find something incorrect then please let me know.

In this tutorial, we will try to create a minimal hello world is a dynamic library using golang and have it wrapped into libraries ready to be used for IOS or Android app.

## Shallow Theories

`Golang` (or `Go`) originates from Google. It's an open source, statically typed programming language that makes it easy to build simple, reliable, and efficient software.

So lets start our tutorial.

## Install Golang
Installation steps for Go programming language can be found at https://golang.org/doc/install

## Set GOPATH
Lets create our workspace for this tutorial. And at the same time lets use the workspace directory as our `$GOPATH` too.

```sh
$ mkdir -p /Users/sydney/Documents/HelloWorld
$ cd /Users/sydney/Documents/HelloWorld
$ export GOPATH=`pwd`
``` 

## Set Android related envs
Lets export the `Android SDK home` and `Android NDK home`
```sh
$ export ANDROID_NDK_HOME=/Users/sydney/Library/Android/sdk/ndk-bundle/
$ export ANDROID_HOME=/Users/sydney/Library/Android/sdk/
``` 

## Download gobind and gomobile
`gobind` is a tool that generates language bindings that make it possible to call Go functions from Java and Objective-C. It is called internally by `gomobile` which can help us build cross-platform applications. We need this two to build our mobile app library.

Optionally, one can develop an entire mobile application using `build` command of `gomobile`. But we wont be doing that. We will, however, develop a library that can be used by mobile applications. And to build this, we will use `bind` command of `gomobile`.

Download `gobind` and `gomobile`

```sh
$ go get golang.org/x/mobile/cmd/gobind
$ go get golang.org/x/mobile/cmd/gomobile
``` 

And export the bin as part of the `$PATH`
```sh
$ export PATH=$PATH:$GOPATH/bin
``` 

## The sample app

Lets create the go project structure for our sample app. Let's `src` directory which contains our Go package `not.expert` and finally our package `helloworld`

```sh
$ mkdir -p $GOPATH/src
$ mkdir -p $GOPATH/src/not.expert
$ mkdir -p $GOPATH/src/not.expert/helloworld

``` 

Create the `helloworld.go` file under `helloword` package
```sh
$ touch $GOPATH/src/not.expert/helloworld/helloworld.go
``` 

Put this as contents of the `helloworld.go` 

```go
package helloworld

import (
	"fmt"
)

func Greet(name string) string {
	message := fmt.Sprintf("Hello World, %s", name)
  return message
}
```

## Build the library
Using gomobile, we can then build the libraries respective to the traget platform, in our case ios and android.

Build framework for ios
```sh
$ gomobile bind -target=ios -o $GOPATH/build/helloworld.framework -v $GOPATH/src/not.expert/helloworld
```

And build aar for android
```sh
$ gomobile bind -target=android -o $GOPATH/build/helloworld.aar -v $GOPATH/src/not.expert/helloworld
```

When everything is okay, you should be able to see the libraries that you can integrate for your ios and android mobile apps at `$GOPATH/build/`

Thats it. I hope you guys learn something from this post.

## Short Video

A uploaded a short video describing the steps for this tutorial here:

<a href="https://www.youtube.com/watch?feature=player_embedded&v=dXgNhAG0oyY
" target="_blank"><img src="https://img.youtube.com/vi/dXgNhAG0oyY/0.jpg" 
alt="Creating cross-platform library for mobile using Golang" width="240" height="180" border="0" /></a>















