import { getDomain } from '../../utils/index'
describe('Testing utils api', () => {
    it('should return the domain: getDomain', () => {
        expect(
            getDomain(
                'http://www.nytimes.com/2011/10/30/opinion/mona-simpsons-eulogy-for-steve-jobs.html?pagewanted=all'
            )
        ).toEqual('www.nytimes.com')

        expect(
            getDomain('https://news.mit.edu/2017/tim-berners-lee-wins-turing-award-0404')
        ).toEqual('news.mit.edu')

        expect(
            getDomain(
                'https://www.bloomberg.com/news/articles/2017-11-21/uber-concealed-cyberattack-that-exposed-57-million-people-s-data'
            )
        ).toEqual('www.bloomberg.com')
    })
})
