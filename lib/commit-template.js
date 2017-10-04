'use strict';

const fs = require('fs');
const path = require('path');

const file = process.argv[2] || '.commit-msg';

const params = (process.env.GIT_PARAMS || '').split(' ');

const msg = async () => {
  try {
    const mod = require(path.resolve(process.cwd(), file));
    if (typeof mod === 'string') {
      return mod;
    } else if (typeof mod === 'function') {
      return await mod();
    }
  } catch (e) {}

  try {
    return fs.readFileSync(path.resolve(process.cwd(), file)).toString();
  } catch (e) {
    console.error(`Could not find commit template file at ${file}`);
    process.exit();
  }
}

// only apply custom messages when run as a standalone `git commit`
// i.e. ignore `--amend` commits, merges, or commits with `-m`
if (params.length > 1) {
  process.exit();
}

module.exports = async () => {

  // if no params are present then the npm script is being run
  // directly, and not via a hook.
  if (!params[0]) {
    return console.log(await msg());
  }

  // write the content to the COMMIT_MSG file
  const TARGET = path.resolve(process.cwd(), params[0]);
  const existing = fs.readFileSync(TARGET).toString();
  fs.writeFileSync(TARGET, `${await msg()}\n\n${existing}`);

};
