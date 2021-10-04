import { propertyDecorator } from '../src/_propertyDecorator'

const hidden = propertyDecorator(({ get, set }) => ({
    configurable: true,
    enumerable: true,
    writable: true,
}))
