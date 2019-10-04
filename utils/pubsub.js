var eventHub = (function () {
    let eventPool = {}

    function on(topic, handler) {
        eventPool[topic] = eventPool[topic] || []
        eventPool[topic].push({
            handler: handler
        })
    }

    function trigger(topic, ...args) {
        if (!eventPool[topic]) return new Error(`the ${topic} not define`)
        eventPool[topic].forEach((item) => {
            item.handler(args)
        })
    }

    function off(topic, handler) {
        if (!eventPool[topic]) return new Error(`the ${topic} not define`)
        eventPool[topic].forEach((item, index, arr) => {
            item.handler === handler
            arr.splice(index, 1)
        })
    }

    return {
        on: on,
        off: off,
        trigger: trigger
    }
})()