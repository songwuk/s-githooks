# s-githooks
> provides a configurable git-hooks
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
Run the CLI script to update the git hooks with the commands from the config:
```sh
# [Optional] These 2 steps can be skipped for non-husky users
git config core.hooksPath .git/hooks/
rm -rf .git/hooks

# Update ./git/hooks
npx s-githooks
```
# Thanks

## License

[MIT](./LICENSE) License © 2023 [Song wuk](https://github.com/songwuk)
