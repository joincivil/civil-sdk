#!/bin/bash
set -euxo pipefail

# This script sets up the latest version of the Civil monorepo locally so that it can be used for development, building, and testing.

# If we're being installed as a dependency, there is no reason to run these scripts (and indeed it causes issues because of yarn not supporting nested workspaces and other problems). Unfortunately, unlike `postinstall` vs. `prepare` scripts (where former is run by yarn/npm on all installs but the latter only on local installs and publish) or `dependencies` vs `devDependencies`, there is no way to run a `preinstall` script only on dev/local install. We can hack this by checking to see if working directory is in `node_modules/@joincivil/` - if so then we're being installed as a dependency:
parent_dir="$(dirname -- "$(readlink -f -- "$PWD")")"
parent_parent_dir="$(dirname -- "$(readlink -f -- "$parent_dir")")"
parent_parent_dir_name="${parent_parent_dir##*/}"
if [ $parent_parent_dir_name == "node_modules" ]; then
    exit 0
fi

# Need yarn because Civil monorepo build fails with npm - if yarn is not installed globally then install locally and use that in this script.
if ! command -v yarn > /dev/null; then
    npm install yarn
    alias yarn='node yarn'
fi

# Download latest civil monorepo to use bleeding edge packages from there instead of what's on npm. Note that we can't just use the git repo as the package version in package.json because of the monorepo structure with packages in repo subdirectories, so this is one of the few options that works.
if [ ! -d Civil ]; then
    git clone https://github.com/joincivil/Civil.git
fi
cd Civil
git checkout master
git pull
yarn install
yarn build
cd ..
