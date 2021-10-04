export type propertyDecorator = typeof propertyDecorator
export function propertyDecorator(
    getDescriptor: (accessors: { get: () => any; set: (value: any) => void }) => PropertyDescriptor,
    prototype?: any
) {
    return function (target: any, propertyKey: string | symbol) {
        if (!Object.hasOwnProperty.call(target, '___propKeys')) {
            Object.defineProperty(target, '___propKeys', {
                configurable: false,
                enumerable: false,
                writable: false,
                value: Object.create(target.___propKeys || {}),
            })
        }
        const $$key = target.___propKeys[propertyKey]
            ? target.___propKeys[propertyKey]
            : (target.___propKeys[propertyKey] =
                  typeof propertyKey === 'symbol'
                      ? Symbol(propertyKey.toString())
                      : Symbol(propertyKey))

        Object.defineProperty(target, $$key, {
            configurable: true,
            enumerable: false,
            writable: true,
        })

        const currentDescriptor = Object.getOwnPropertyDescriptor(prototype ?? target, propertyKey)

        let get: () => any, set: (value: any) => void
        if (
            currentDescriptor == null ||
            (currentDescriptor.get == null && currentDescriptor.set == null)
        ) {
            if (currentDescriptor && currentDescriptor.value) {
                const value = currentDescriptor.value
                get = function (this: any) {
                    return this[$$key] ?? value
                }
                set = function set(this: any, value: any) {
                    this[$$key] = value
                }
            } else {
                get = function (this: any) {
                    return this[$$key]
                }
                set = function set(this: any, value: any) {
                    this[$$key] = value
                }
            }
        } else {
            if (currentDescriptor.get) {
                get = currentDescriptor.get
            } else {
                const $$key = target.___propKeys[propertyKey]
                get = function (this: any) {
                    return this[$$key]
                }
            }
            if (currentDescriptor.set) {
                set = currentDescriptor.set
            } else {
                const $$key = target.___propKeys[propertyKey]
                set = function set(this: any, value: any) {
                    this[$$key] = value
                }
            }
        }

        const resultDescriptor = { ...getDescriptor({ get, set }) }

        if (currentDescriptor == null) {
            Object.defineProperty(target, propertyKey, resultDescriptor)
            return
        }

        if (!currentDescriptor.configurable) {
            delete resultDescriptor.configurable
        }
        if (!currentDescriptor.enumerable) {
            delete resultDescriptor.enumerable
        }

        if (resultDescriptor.get || resultDescriptor.set) {
            if (currentDescriptor.get || currentDescriptor.set) {
                Object.defineProperty(target, propertyKey, resultDescriptor)
                return
            }

            if (!currentDescriptor.writable) {
                delete resultDescriptor.set
            }
            Object.defineProperty(target, propertyKey, resultDescriptor)
            return
        } else if (resultDescriptor.value != null) {
            if (currentDescriptor.get && currentDescriptor.set == null) {
                delete resultDescriptor.writable
            }
            if (
                currentDescriptor.get == null &&
                currentDescriptor.set == null &&
                !currentDescriptor.writable
            ) {
                delete resultDescriptor.writable
            }
            Object.defineProperty(target, propertyKey, resultDescriptor)
            return
        } else if (currentDescriptor.get || currentDescriptor.set) {
            resultDescriptor.get = currentDescriptor.get
            if (resultDescriptor.writable) {
                resultDescriptor.set = currentDescriptor.set
            }
            Object.defineProperty(target, propertyKey, resultDescriptor)
            return
        }

        if (resultDescriptor.value == null && currentDescriptor.value) {
            resultDescriptor.value = currentDescriptor.value
        }
        if (!currentDescriptor.writable) {
            delete resultDescriptor.writable
        }

        Object.defineProperty(target, propertyKey, resultDescriptor)
    }
}
