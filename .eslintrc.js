
module.exports = {
    "extends": ["google",
    "plugin:react/recommended"],
    "parser": "babel-eslint",
    
        "plugins": [
            "jsdoc",
            "react"
        ]
    ,
    
    "extends": ["eslint:recommended", "plugin:react/recommended"],
   
        "rules": {
            "jsdoc/check-examples": 1,
            "jsdoc/check-param-names": 1,
            "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
            "jsdoc/check-tag-names": 1,
            "jsdoc/check-types": 1,
            "jsdoc/newline-after-description": 1,
            "jsdoc/no-undefined-types": 1,
            "jsdoc/require-description": 1,
            "jsdoc/require-description-complete-sentence": 1,
            "jsdoc/require-example": 1,
            "jsdoc/require-hyphen-before-param-description": 1,
            "jsdoc/require-param": 1,
            "jsdoc/require-param-description": 1,
            "jsdoc/require-param-name": 1,
            "jsdoc/require-param-type": 1,
            "jsdoc/require-returns": 1,
            "jsdoc/require-returns-description": 1,
            "jsdoc/require-returns-type": 1,
            "jsdoc/valid-types": 1
        },
        "parserOptions": {
            "ecmaFeatures": {
              "jsx": true
            }
          }
    
    
};