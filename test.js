const assert = require('assert');
const IOCContainer = require('./index') 

describe('IOCContainer', function() {
    describe('Register Obj And then Retrieve by type', function() {
      it('Fetch pre-registerd obj. (Cow should say moo)', async function() {
        const iocContainer = new IOCContainer()
        iocContainer.register("cow", { sayHello: () => "moo" })
        const cow = await iocContainer.getImpl("cow")
        assert.equal(cow.sayHello(), "moo")
      });
    });
  });

  describe('IOCContainer', function() {
    describe('Retrieve Obj which is registered after', function() {
      it('Fetch yet-to-be-registerd obj. (Cow should say moo)', async function() {
        const iocContainer = new IOCContainer()

        const getCowPromise = iocContainer.getImpl("cow")
        iocContainer.register("cow", { sayHello: () => "moo" })
        const cow = await getCowPromise
        assert.equal(cow.sayHello(), "moo")
      });
    });
  });