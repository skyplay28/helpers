import { propertyDecorator } from '../src/_propertyDecorator'
import { hidden } from '../src/_hidden'
import { toLog } from '../src/_toLog'

const test = propertyDecorator(({ get, set }) => ({
    configurable: true,
    enumerable: true,
    get() {
        return 5
    },
    set(value: any) {
        set.call(this, value)
    },
}))

class Foo {
    @hidden x: number = 19
    @test y?: number = 42 * 2
}

const foo = new Foo()
console.log(JSON.stringify(toLog(foo)[0]))
