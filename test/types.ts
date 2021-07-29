import { optional, nullable } from '../src'

class Test {
    x = optional<number>()
    y = nullable<number>()
    z = nullable<number>(3)
}
const test = new Test()
Object.keys(test).forEach(k => {
    console.log(k, test[k as keyof Test])
})
