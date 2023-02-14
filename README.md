# s-githooks
> provides a configurable git-hooks

- [x] Built-in lint-staged
- [x] Implement custom git-hooks

[![NPM version](https://img.shields.io/npm/v/s-githooks?color=a1b858&label=)](https://www.npmjs.com/package/s-githooks)


# Install

```
npm install s-githooks --save-dev
```

# Usage
Add `s-githooks` to your `package.json` Fill it 

For example:
```json
{
  "s-githooks": {
    "pre-commit": "npx lint-staged",
    "commit-msg": "npm run verifycommit"
  }
}
```
# Thanks
## License

[MIT](./LICENSE) License © 2023 [Song wuk](https://github.com/songwuk)
