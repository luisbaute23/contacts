# contacts
This project is abour refactoring and testing
- Eslint
- Jest 


#Installs
npm install --save-dev jest  
npm install --save-dev babel-jest @babel/core @babel/preset-env
npm install --save-dev jest-environment-jsdom

#Init
node ./node_modules/jest/bin/jest --init

Create babel.config.js

#Links
https://buddy.works/tutorials/testing-with-jest-basic-to%C2%AD-do-application
https://dev.to/ms314006/use-jest-write-unit-testing-for-dom-manipulation-3n6c

#Steps
1)- Setup project
2)- Make project working with ES6 import and export
3)- Run npm init for package.json creation
4)- Install dependencies
5)- Init Jest config
6)- Create a babel.config.js with:
js module.exports = { presets: [["@babel/preset-env"]], };
7)-Create a folder for tests