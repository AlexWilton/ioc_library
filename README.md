# ioc_library

Simple Javascript library for supporting Inversion of Control (IoC).

### Requirements
- Node.js version 12.0.0 is a minimum (due to usage of private fields)
- NPM (run `npm install` to install testing libary mocha)

### Basic Usage

#### Create a IoC Container: 
`const iocContainer = new IOCContainer()`

#### Register a type with the ioc container:
`iocContainer.register("cow", { sayHello: () => "moo" })`

#### Get type from ioc container:
`const cow = await iocContainer.getImpl("cow")`



### Testing
Simply run `npm run test` (this will run mocha tests defined in test.js)
![Testing Screenshot](https://i.ibb.co/c6vt1Bw/Screen-Shot-2021-08-06-at-1-04-35-PM.png)
