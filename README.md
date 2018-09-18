# react-native-holy-kiwi

This repository is initial development environment settings customed by Holy Kiwi Team (2018.09.19)

## Contents

1. `react-native init`

2. use `typescript`

3. use `styled-components` (ts)

4. connect with `code-push`

5. connect with `firebase`

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


## Reference

- [Facebook react-native official website](https://facebook.github.io/react-native/docs/getting-started.html)
- [TypeScript-React-Native-Starter](https://github.com/Microsoft/TypeScript-React-Native-Starter)
