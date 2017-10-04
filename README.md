# commit-template
Allows projects to define commit template files

## The problem

Tools like `commitlint`, which examine commit messages and validate them as part of pre-commit hooks are great for ensuring quality messages from contributors, but can often be the cause of developer frustration when their use is not apparent to the author of the message.

A contributor may often not be aware of the use of such tools until after attempting to commit, by which time their message is lost, and needs to be completely re-written.

## The solution

By allowing a project to define a template for a commit message it can be made clear to any contributors that their message must comply certain formats or standards before they write it.

## Usage

Since `commitlint` uses `husky` to install hooks, it is expected that `husky` also installed.

```
npm install --save-dev husky commit-template
```

Then add the following to your package.json scripts:

```
"preparecommitmsg": "commit-template"
```

And add a file in the root of your project named `.commit-msg`. The contents of this file will then be used as your template commit message.

## Customisation

If you want to use a different file name for your template file, this can be passed as an argument to the npm script:

```
"preparecommitmsg": "commit-template .my-template-file"
```

## Advanced usage

If you want more complex behaviour for your commit templates - such as reading git branch names - then you can set the template to a local js module.

If the module exports a function then it will be executed, and the return value used as the commit template. Otherwise if the module exports a string then that will be used as the template.

### Example

```js
// .commit-msg
const branch = require('git-branch');
module.exports = () => `[${branch.sync()}]`;
```

Note: functions are called with `await` so may be async if needed.

## Testing

Running `npm run preparecommitmsg` will output the resolved message without needing to make a commit.
