---
title: Being New to Flutter
date: '2020-02-12'
spoiler: So I tried Google's Flutter to see it's capabilities. Following its Getting Started Documentation, I encountered some amusements and surprises that leads me to writing this post.
---

So I tried Google's [Flutter](https://flutter.dev/) to see it's capabilities. Following its [Getting Started Documentation](https://flutter.dev/docs/get-started/install), I encountered some amusements and surprises that leads me to writing this post. It was a fun experience and I was [tweeting](https://twitter.com/xtrycatchblockx/status/1227207553735516160) all along while I was doing it.

Considering my little familiarity with Facebook's [React Native](https://facebook.github.io/react-native/) for hybrid mobile development, here are my takes with Flutter:

## Creating / Bootstrapping an App is Damn Fast!

With Reac Native's `react-native init`, it would take some time for your project to be created, while with Flutter's `flutter create` it was very fast. I'm not so sure yet if it was due to running a `flutter precache` beforehand.

## Hot Reload

For refreshing or reloading the entire app after some .dart code changes, you still need to type `r` in your terminal, whereas with React Native you will see the immediate effect on the app right after saving your code changes. Both refreshes and reloadings were quite fast enough for me.

## Project Namings

Flutter doesn't allow [camelCased](https://en.wikipedia.org/wiki/Camel_case) project namings. React Native allows such project naming convention. For Flutter, it suggests using [snake_case](https://en.wikipedia.org/wiki/Snake_case). Similarly with React-Native, it also doesn't allow project names with dashes like `flutter create this-is-my-project`. It would be nice if both supports, because sometimes project names comes with dashes for some reasons like maybe conventions for repository folder namings, etc.

## Flutter Doctor

Like React-Native's `react-native doctor`, Flutter also has its `flutter doctor`. Both are awesome commands in helping you out with getting started, troubleshooting and automatically fixing errors with your development environment.

## Running in Devices

Now this for me is the super amazing feature of Flutter - it's ability to run on multiple devices or all attached devices (yes, all attached devices), for me is so cool. Right away you will be able to see in all devices, all your changes. This saves your valuable time than switching which devices to ran on to. Flutter's `flutter run -d all` is awesome!

