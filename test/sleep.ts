import { sleep } from '../src'

;(async () => {
    console.log('log')
    await sleep(2)
    console.log('log')
})()
