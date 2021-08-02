import { propertyDecorator } from './_propertyDecorator'

export type hidden = typeof hidden
export const hidden = propertyDecorator(({ get, set }) => ({
    configurable: true,
    enumerable: false,
    writable: true,
}))
