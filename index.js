
const IOCContainer = class {
    #store
    #waitingForType

    constructor() {
        this.#store = {}
        this.#waitingForType = {}
    }

    /**
     * Register an object/function/constant/etc... as "type".
     * @param {*} type Type describes what is registered and allows fetching of this implementation in future 
     * @param {*} impl Implementation registerd as type
     */
    register(type, impl) {
        if (!this.#store[type]) this.#store[type] = []
        this.#store[type].push(impl)
        this.#notifyWaitingForType(type)
    }

    #notifyWaitingForType(type) {
        const waiting = this.#waitingForType[type]
        const registered = this.#store[type]
        if (!registered || registered.length == 0 || !waiting || waiting.length == 0) return

        waiting.forEach(waitingResolve => {
            waitingResolve(registered)
        })
    }

    /**
     * Get a single implementation of type currently registered. If non registered, wait for one to be registered.
     * @param type 
     * @returns A promise is returned which will resolve to the requested type.
     */
    async getImpl(type) {
        return (await this.getAllImpl(type))[0]
    }

    /**
     * Get all implementations of type currently registered. If non registered, wait for one to be registered.
     * @param type 
     * @returns A promise is returned which will resolve to an array of the requested type.
     */
    async getAllImpl(type) {
        if (this.#store[type] && this.#store[type].length > 0) {
            return this.#store[type]
        } else {
            // if desired implimentation(s) isn't currently available. Wait for it to be registered then return it.
            return new Promise((resolve) => {
                if (!this.#waitingForType[type]) this.#waitingForType[type] = []
                this.#waitingForType[type].push(resolve)
            })
        }
    }

    deregisterAll() { this.store = {} }
}


module.exports = IOCContainer


