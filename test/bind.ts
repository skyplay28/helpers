import { bind } from '../src'

class Test {
    x = 19
    @bind some() {
        console.log(this.x)
    }
}

const test = new Test()
const some = test.some
some()
