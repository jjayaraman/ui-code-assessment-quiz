import { unescape } from './utils/Utils'
//const unescape = require('recursive-unescape');

describe('Miscellaneous tests', () => {


    it('unescape string', () => {

        const escapedString = 'British actor David Morrissey stars as which role in &quot;The Walking Dead&quot;?';
        expect(unescape(escapedString)).toEqual('British actor David Morrissey stars as which role in "The Walking Dead"?')

        const escapedString2 = 'The &#039;Squaring the Circle&#039; problem is solvable.'
        expect(unescape(escapedString2)).toEqual('The \'Squaring the Circle\' problem is solvable.')
    })

})