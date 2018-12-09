---
title: Using XCode to check React Native Components
date: '2018-06-26'
spoiler: Using xcode's View hierarchy in debug mode to take a peek of the React-Native component hierarchy.
---

Similar with developing native ios apps, in React-Native, we must consider and take care of the components and views that we have stacked-up to build our UI. Each component that we add and piled up into our application requires initialisation, state preparations and rendering. The deeper hierarchy of the components in our app, the higher the chances of running into performance issues.

To help us understand what are the rendered components in our app, we can take advance of xcode's Debug navigator to display the actual rendered components of our app.

Go to `Show Debug navigator` menu, and click on `View process in different ways` and pick `View UI Hierarchy` which will results in the hierarchy of views starting from the root `UIViewController` up to your topmost component. Whats cool is it will also display the layers in graphical view.
