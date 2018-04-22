module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": ["airbnb-base", "plugin:react/recommended"],
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
};