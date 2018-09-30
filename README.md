# react-native-awesome-starter

This repository is initial development environment settings customed by Holy Kiwi Team (2018.09.19)

## Contents

1. `react-native init`

2. use `typescript`

3. use `styled-components` (ts)

4. use `mobx` and `mobx-react`

5. connect with `code-push`

6. connect with `firebase`

## Version

- `react`: 16.5.0
- `react-native`: 0.57

## How to set up

1. init your project with `react-native-cli`

```bash
$ npm install -g react-native-cli
$ react-native init MyProject
$ cd MyProject
```

2. use `typescript`

```bash
$ yarn add --dev typescript
$ yarn add --dev react-native-typescript-transformer
$ yarn tsc --init --pretty --jsx react
$ touch rn-cli.config.js
$ yarn add --dev @types/react @types/react-native
```

write this code in `rn-cli.config.js`

```javascript
module.exports = {
  getTransformModulePath() {
    return require.resolve("react-native-typescript-transformer");
  },
  getSourceExts() {
    return ["ts", "tsx"];
  }
};
```

in order to migrate to typescript, rename `App.js` to `App.tsx`

add typescript test infra
```bash
yarn add --dev ts-jest
```

write this in `package.json`
```json
"jest": {
  "preset": "react-native",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js"
  ],
  "transform": {
    "^.+\\.(js)$": "<rootDir>/node_modules/babel-jest",
    "\\.(ts|tsx)$": "<rootDir>/node_modules/ts-jest/preprocessor.js"
  },
  "testRegex": "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  "testPathIgnorePatterns": [
    "\\.snap$",
    "<rootDir>/node_modules/"
  ],
  "cacheDirectory": ".jest/cache"
}
```

3. use `styled-components` (ts)

```bash
yarn add --dev styled-components
```

make `index.ts` file in theme directory
```typescript
import * as styledComponents from "styled-components";

const {
  default: styled,
  css,
  injectGlobal,
  keyframes,
  ThemeProvider
} = styledComponents as styledComponents.ThemedStyledComponentsModule<
  IThemeInterface
>;

export interface IThemeInterface {
  primaryColor: string;
}

export const theme = {
  primaryColor: "#e9e9eb"
};

export default styled;
export { css, injectGlobal, keyframes, ThemeProvider };
```

migrate `css` to `styled-components`
```tsx
// in App.tsx
const ContainerView = styled(View)`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #F5FCFF;
`;

class App extends Component {
  render() {
    return (
      <ContainerView>
        // ...
      </ContainerView>
    );
  }
}
```

4. use `mobx` and `mobx-react`

```bash
npm install --save mobx mobx-react
```

add babel-preset plugin `transform-decorators-legacy` in `.babelrc` to use decorator syntax
```json
{
  "presets": [
    "react-native"
  ],
  "plugins": [
    "transform-decorators-legacy"
  ]
}
```

5. connect with `code-push`

install `code-push-cli`
```bash
npm install -g code-push-cli
code-push register
```

register your app in `code-push`
```bash
code-push app add <AppName-Android>
code-push app add <AppName-iOS>
```

you can check apps that you registered by this command.
```bash
code-push app list
```

```bash
npm install --save react-native-code-push@latest
react-native link react-native-code-push
```

### iOS

write Staging Deployment Key in `info.plist`
```
<key>CodePushDeploymentKey</key>
<string><Staging Deployment Key></string>
```

### Android

write Staging Deployment Key in `MainApplication.java`
```java
@Override
protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
        new CodePush("<Staging Deployment Key>", getApplicationContext(), BuildConfig.DEBUG)
    );
}
```

6. connect with `firebase`

### Analytics

#### iOS

#### Android

### Admob

#### iOS

##### Android


## Reference

- [Facebook react-native official website](https://facebook.github.io/react-native/docs/getting-started.html)
- [TypeScript-React-Native-Starter](https://github.com/Microsoft/TypeScript-React-Native-Starter)
- [Styled-Components-Typescript-Example](https://github.com/patrick91/Styled-Components-Typescript-Example/blob/master/src/theme/index.ts)
- [CodePush 적용하기](https://github.com/kjk7034/ReactNativeStudy/blob/master/docs/CodePush.md)
- [react-native-firebase](https://github.com/invertase/react-native-firebase)
