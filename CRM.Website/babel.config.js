module.exports = {
    "presets": [
        [
            "@babel/preset-env",
            {
                "targets": {
                    "chrome": "60",
                    "firefox": "60"
                }
            }
        ],
        "@babel/preset-react"
    ],
    "plugins": [
        "@babel/plugin-proposal-object-rest-spread", "@babel/proposal-class-properties", "@babel/syntax-dynamic-import"
    ],
    "env": {
        "test": {
            "plugins": ["dynamic-import-node"]
        }
    }
}