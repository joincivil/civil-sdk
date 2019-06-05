#!/bin/bash
set -euxo pipefail

if ! command -v yarn > /dev/null; then
    # If no globally installed yarn then we installed locally in `preinstall.sh` and can alias it for use in this script.
    alias yarn='node yarn'
fi

# Use yarn-linked civil deps if already set up, otherwise link to the ones we just downloaded from monorepo master in `preinstall.sh`.
if ! yarn link @joincivil/components; then
    echo "Setting up yarn link for @joincivil/components"
    cd Civil/packages/components
    yarn link
    cd -
    yarn link @joincivil/components
fi
if ! yarn link @joincivil/utils; then
    echo "Setting up yarn link for @joincivil/utils"
    cd Civil/packages/utils
    yarn link
    cd -
    yarn link @joincivil/utils
fi
