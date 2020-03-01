/**
 * Helper utils to unscape escaped special characters
 * 
 * @author Jayakumar Jayaraman
 * @param input 
 */
export const unescape = (input: any) => {

    if (input instanceof Array) {
        let output: string[] = []
        input.forEach(s => {
            Object.values(s).forEach(v => _unescape(String(v)))
            output.push(s)
        })
        return output;
    }
    else if (typeof input == 'string') {
        return _unescape(input)
    }
    else {
        return input
    }
}

const _unescape = (input: string) => {
    console.log(typeof input);

    return input
        .replace(/&quot;/g, '\"')
        .replace(/&#039;/g, '\'')

}

