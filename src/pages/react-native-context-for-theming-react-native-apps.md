---
title: React 16 Context for Theming React Native Apps
date: '2018-07-04'
spoiler: I am playing around with React's Context API and using it in React-Native to dynamically theme an app.
---

 I find it interesting to use React 16's Context API.

 From the documentation it says: `Context is designed to share data that can be considered “global” for a tree of React components, such as the current authenticated user, theme, or preferred language`.

Originally, I was thinking of using Context for as a global state manager for my app and allowing it to share those states throughout the App's component tree. But not sure yet if its better than Redux and it might sound like re-inventing what has been provided by frameworks like redux, etc. So that's why i pick to experiment using context for theming apps. Also, most of the sample Context usages are for the web (ReactJS), not so much for mobile (React-Native) sample. So thats why i think using it in React Native might be interesting and maybe hopefully helpful to other noobs like me.

In my root component, I have a ThemeProvider that wraps all my children components. 

```jsx
export default class App extends Component {
  ...
  render() {
    return (
      <ThemeProvider 
        theme={this.state.theme} 
        switchTheme={this.switchTheme}>
          <Main/>
      </ThemeProvider>
    );
  }
  ...
}
```

​A sample theme object that can be pass as props to ThemeProvider is like this:

```js
export default {
    rootView: {
        flex: 1,
        backgroundColor: "#0D73E0",
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        borderRadius: 0,
        padding: 14,
        backgroundColor: "#E0C22D",
        margin: 20
    },
    buttonLabel:{
        color: "#0D73E0",
        fontStyle: "italic"
    },
    label: {
        color: "#E0C22D",
        fontSize: 20,
        fontStyle: "italic"
    },
    extras: {
        underlayColor: '#0D73E0',
    }
}
```

The holder for the context thats used by the provider and consumer is like this:

```jsx
const ThemeContext = React.createContext(null);
export default ThemeContext;
```

And the provider is like this:

```jsx
const ThemeProvider = ({ theme, switchTheme, children }) => (
  <ThemeContext.Provider
    value={{ theme, switchTheme }}
  >
    {children}
  </ThemeContext.Provider>
);

export default ThemeProvider;
```

And a HOC to allows components to become consumers of the "theme" provided by the ThemeProvider 

```jsx
const attachTheme = (WrappedComponent) => {
  const WithTheme = props => (
    <ThemeContext.Consumer>
      {
        ({ theme, switchTheme }) =>
          <WrappedComponent 
            theme={theme} 
            switchTheme={switchTheme}
            {...props}
          />
      }
    </ThemeContext.Consumer>
  );
  WithTheme.WrappedComponent = WrappedComponent;
  return WithTheme;
};

export default attachTheme;
```

Now, any component can take advantage on the props theme and can use it to style the app. For instance like this:

```jsx{11}
class Main extends Component {
  render() {
    return (
      <View style={this.props.theme.rootView}>
        <Text style={this.props.theme.label}>Hello World</Text>
        <Button onPress={this.props.switchTheme} label='Change Theme'/>
      </View>
    );
  }
}
const MainScreen = attachTheme(Main);
export default MainScreen;
```

Full sample codes can be found here at https://github.com/xtrycatchx/rn-sample-theming