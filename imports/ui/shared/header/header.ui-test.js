const assert = require('assert')
const baseUrl = 'http://localhost:3000/'

describe('Header when user isn\'t logged in', () => {
    before(() => {
        browser.url(baseUrl)
        browser.pause(5000)
    })

    it ('should have a sign in link', () => {
        assert(browser.isExisting('a=Sign In'), true)
        assert(browser.isVisible('a=Sign In'), true)
    })

    it ('should redirect to login when sign in is clicked', () => {
        browser.click('a=Sign In')
        browser.pause(3000)
        assert.equal(browser.getUrl(), 'http://localhost:3000/login')
        browser.url(baseUrl)
    })

    it('should hide sidebar when nav-bar toggler is clicked', () => {
        browser.click('.navbar-toggler.d-lg-block')
        browser.pause(2000)
        assert(browser.isExisting('.sidebar'), false)
        assert(browser.isVisible('.sidebar'), false)
    })
})

describe('Header when user is logged in', () => {
    before(() => {
        browser.url(baseUrl)
        browser.pause(5000)

        browser.execute(() => {
            Meteor.call('generateTestUser', (err, data) => {})
            return 'ok'
        })

        browser.pause(5000)
        browser.execute(() => Meteor.loginWithPassword('derp@test.com', '1234'))

        browser.pause(5000)
    })
    
    it ('should have a sign out link', () => {
        assert(browser.isExisting('#signOut'), true)
    })

    it ('should sign out user when signOut is clicked', () => {
        browser.click('.dropdown-toggle')
        browser.pause(2000)

        browser.click('#signOut')
        browser.pause(3000)

        assert(browser.isExisting('a=Sign In'), true)
        assert(browser.isVisible('a=Sign In'), true)
    })

    it('should hide sidebar when nav-bar toggler is clicked', () => {
        browser.click('.navbar-toggler.d-lg-block')
        browser.pause(3000)
        
        assert(browser.isExisting('.sidebar'), false)
        assert(browser.isVisible('.sidebar'), false)
    })
})
