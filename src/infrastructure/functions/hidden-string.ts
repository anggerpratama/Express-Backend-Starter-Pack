export const HiddenString = function (strNow:string) : string {
    const array = strNow.split('')
    if (array.length < 4) return ''
    for (let i = 0; i < array.length - 3; i++) {
        array[i] = '*'
    }

    return array.join('')
}