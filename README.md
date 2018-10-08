# react-native-awesome-starter

This repository is initial development environment settings customed by Holy Kiwi Team (2018.09.19)

UPDATE 2018.10.06

## Contents

1. `react-native init`

2. use `typescript`

3. use `styled-components` (ts)

4. use `mobx` and `mobx-react`

5. connect with `code-push`

6. connect with `firebase`

(TODO)
- add assets/font
- use `react-native-splash-screen`

## Version

- `react`: 16.5.0
- `react-native`: 0.57

## How to set up

### 1. init your project with `react-native-cli`

```bash
$ npm install -g react-native-cli
$ react-native init MyProject
$ cd MyProject
```

### 2. use `typescript`

```bash
$ yarn add --dev typescript
$ yarn add --dev react-native-typescript-transformer
$ yarn tsc --init --pretty --jsx react
$ touch rn-cli.config.js
$ yarn add --dev @types/react @types/react-native
```

#### write this code in `rn-cli.config.js`

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

#### in order to migrate to typescript, rename `App.js` to `App.tsx`

#### add typescript test infra
```bash
yarn add --dev ts-jest
```

#### write this in `package.json`
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

### 3. use `styled-components` (ts)

```bash
yarn add --dev styled-components
```

#### make `index.ts` file in theme directory
```typescript
import * as styledComponents from "styled-components";

const {
  default: styled,
  css,
  injectGlobal,
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
export { css, injectGlobal, ThemeProvider };
```

> In `react-native`, you cannot use keyframes. You should use [`Animated`](https://facebook.github.io/react-native/docs/animated) API supported by `react-native`.

#### migrate `css` to `styled-components`
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

### 4. use `mobx` and `mobx-react`

```bash
npm install --save mobx mobx-react
```

#### add babel-preset plugin `transform-decorators-legacy` in `.babelrc` to use decorator syntax
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

#### Trouble Shooting
if you have error like this
```
error: bundling failed: Error: The 'decorators' plugin requires a 'decoratorsBeforeExport' option, whose value must be a boolean. If you are migrating from Babylon/Babel 6 or want to use the old decorators proposal, you should use the 'decorators-legacy' plugin instead of 'decorators'.
```

```
npm install --save-dev @babel/plugin-proposal-decorators
```

```
{
  ...
  "plugins": [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
  ]
}
```




#### let `experimentalDecorators` be true in `tsconfig.json`
```
{
  "compilerOptions": {
    ...
    "experimentalDecorators": true
    ...
  }
}
```

### 5. connect with `code-push`

#### install `code-push-cli`
```bash
npm install -g code-push-cli
code-push register
```

#### register your app in `code-push`
```bash
code-push app add <AppName-Android>
code-push app add <AppName-iOS>
```

#### you can check apps that you registered by this command.
```bash
code-push app list
```

```bash
npm install --save react-native-code-push@latest
react-native link react-native-code-push
```

### iOS

#### write Staging Deployment Key in `info.plist`
```
<key>CodePushDeploymentKey</key>
<string><Staging Deployment Key></string>
```

### Android

#### write Staging Deployment Key in `MainApplication.java`
```java
@Override
protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
        new CodePush("<Staging Deployment Key>", getApplicationContext(), BuildConfig.DEBUG)
    );
}
```

### 6. connect with `firebase`

```bash
npm install --save react-native-firebase
react-native link react-native-firebase
```
create your project in Firebase

### Analytics

#### iOS

##### Setup `GoogleService-Info.plist`

install `GoogleService-Info.plist` and move to `ios/[YOUR APP NAME]` directory

##### Initialize Firebase

in AppDelegate.m

```
#import <Firebase.h>

[FIRApp configure];
```

##### Install Firebase Library

in PodFile
```
# Required by RNFirebase
pod 'Firebase/Core', '~> 5.9.0'
```

```
pod install
```

#### Android

##### Setup `google-services.json`

install `google-services.json` and move to `android/app` directory

write this code in `app.gradle` (*project* level)
```gradle
buildscript {
  // ...
  dependencies {
    // ...
    classpath 'com.google.gms:google-services:4.0.1'
  }
}
```

write this code very bottom in `app.gradle` (*app* level)
```gradle
apply plugin: 'com.google.gms.google-services'
```

##### Initialize Firebase

```gradle
dependencies {
  // This should be here already
  implementation project(':react-native-firebase')

  // Firebase dependencies
  implementation "com.google.android.gms:play-services-base:15.0.1"
  implementation "com.google.firebase:firebase-core:16.0.3"

  ...
```

#### Analytics `logEvent`

##### You can track event with `logEvent` function

```javascript
firebase.analytics().logEvent(eventName, params);
// eventName: string, params: object
```

### Admob

#### iOS

##### Android



## Trouble Shooting

### Problem
When you build react-native application in Xcode
```
Xcode 10: Build input file double-conversion cannot be found
```
### Solution
```bash
$ cd node_modules/react-native/scripts && ./ios-install-third-party.sh && cd ../../../
$ cd node_modules/react-native/third-party/glog-0.3.5/ && ../../scripts/ios-configure-glog.sh && cd ../../../../
```
reference: https://github.com/facebook/react-native/issues/21168

### Problem
error (when `pod install`)
```
In Podfile:
    React/CxxBridge (from `../node_modules/react-native`) was resolved to 0.57.2, which depends on
      Folly (= 2016.10.31.00)
```

### Solution
write this code in `Podfile`
```
  pod 'DoubleConversion', :podspec => '../node_modules/react-native/third-party-podspecs/DoubleConversion.podspec'
  pod 'glog', :podspec => '../node_modules/react-native/third-party-podspecs/glog.podspec'
  pod 'Folly', :podspec => '../node_modules/react-native/third-party-podspecs/Folly.podspec'
  pod 'yoga', :path => '../node_modules/react-native/ReactCommon/yoga'
```
reference: https://facebook.github.io/react-native/docs/integration-with-existing-apps.html


## Reference

- [Facebook react-native official website](https://facebook.github.io/react-native/docs/getting-started.html)
- [TypeScript-React-Native-Starter](https://github.com/Microsoft/TypeScript-React-Native-Starter)
- [Styled-Components-Typescript-Example](https://github.com/patrick91/Styled-Components-Typescript-Example/blob/master/src/theme/index.ts)
- [CodePush 적용하기](https://github.com/kjk7034/ReactNativeStudy/blob/master/docs/CodePush.md)
- [react-native-firebase](https://github.com/invertase/react-native-firebase)
- [integration with existing apps](https://facebook.github.io/react-native/docs/integration-with-existing-apps#docsNav)
