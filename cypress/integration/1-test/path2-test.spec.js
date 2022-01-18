describe('Scenario 2: all yes except universal-credit-claim', function() {

    it('Enter page, accept cookies and start form', function() {
        cy.visit('https://services.nhsbsa.nhs.uk/check-for-help-paying-nhs-costs/start')
        cy.get('#nhsuk-cookie-banner__link_accept_analytics').click()
        cy.get('#nhsuk-success-banner__message').contains('You can change your cookie settings at any time using our cookies page.').children('a')
        cy.get('#next-button').click()
        cy.url().should('include', '/where-you-live')
    }),

    beforeEach(() => {
        Cypress.Cookies.preserveOnce('nhsuk-cookie-consent', '_gid', '_ga', 'SESSION')
    }),

    it('Select country Wales', function() {
        cy.get('#question-heading').contains('Which country do you live in?')
        cy.get('#radio-wales').click()
        cy.get('#next-button').click()
        cy.url().should('include', '/gp-in-scotland-or-wales')
    }),

    it('Select GP practice in Scotland or Wales - Yes', function() {
        cy.get('#question-heading').contains('Is your GP practice in Scotland or Wales?')
        cy.get('#label-yes').click()
        cy.get('#next-button').click()
        cy.url().should('include', '/dental-practice-country')
    }),

    it('Dental practice - Wales', function() {
        cy.get('#question-heading').contains('Which country is your dental practice in?')
        cy.get('#label-wales').click()
        cy.get('#next-button').click()
        cy.url().should('include', '/date-of-birth')
    }),

    it('Date of birth', function() {
        cy.get('#question-heading').contains('What is your date of birth?')
        cy.get('.summary').click()
        cy.get('#details-content-0 > p').should('be.visible')
        cy.get('#dob-day').type('16')
        cy.get('#dob-month').type('09')
        cy.get('#dob-year').type('1994')
        cy.get('#next-button').click()
        cy.url().should('include', '/partner')
    }),

    it('Live with a partner - Yes', function() {
        cy.get('#question-heading').contains('Do you live with a partner?')
        cy.get('#radio-yes').click()
        cy.get('#next-button').click()
        cy.url().should('include', '/claim-benefits-tax-credits')
    }),

    it('Claim any benefits or tax credits? - Yes', function() {
        cy.get('#question-heading').contains('Do you or your partner claim any benefits or tax credits?')
        cy.get('#radio-yes').click()
        cy.get('#next-button').click()
        cy.url().should('include', '/paid-universal-credit')
    }),

    it('Get paid Universal Credit? - Yes', function() {
        cy.get('#question-heading').contains('Do you or your partner get paid Universal Credit?')
        cy.get('#yes-universal').click()
        cy.get('#next-button').click()
        cy.url().should('include', '/universal-credit-claim')
    }),

    it('Have any of these? - No', function() {
        cy.get('#question-heading').contains('As part of your joint Universal Credit, do you have any of these?')
        cy.get('#radio-no').click()
        cy.get('#next-button').click()
        cy.url().should('include', '/universal-credit-take-home-pay')
    }),

    it('Take-home pay of £435 - Yes', function() {
        cy.get('#question-heading').contains('Did you and your partner have a combined take-home pay of £435 or less in your last Universal Credit period?')
        cy.get('.summary').click()
        cy.get('#universal-credit').should('be.visible')
        cy.get('#radio-yes').click()
        cy.get('#next-button').click()
        cy.url().should('include', '/result-claiming-qualifying-universal-credit')
    }),

    it('Result', function() {
        const getFree = ['NHS prescriptions', 'NHS dental check-ups and treatment', 'sight tests', 'NHS wigs and fabric supports']
        const moneyOff = ['new glasses or contact lenses', 'repairing or replacing your glasses or contact lenses', 'travel for NHS treatment']
        const pregnantChildren = ['£4.25 each week of your pregnancy from the 10th week', '£8.50 each week for children from birth to 1 year old', '£4.25 each week for children between 1 and 4 years old']

        cy.get('.done-panel')
        cy.get('#content > div.grid-row > div > div.done-panel > h2').contains('You get help with NHS costs')
        cy.get('#content > div.grid-row > div > ul:nth-child(4)').children().each( (item, index) => {
            cy
            .wrap(item)
            .should('contain.text', getFree[index])
        })
        cy.get('#content > div.grid-row > div > ul:nth-child(6)').children().each( (item, index) => {
            cy
            .wrap(item)
            .should('contain.text', moneyOff[index])
        })
        cy.get('#result-explanation').contains('Your partner and any children under 20 included on your Universal Credit claim are also entitled to full help with NHS costs.')
        cy.get('#content > div.grid-row > div > ul:nth-child(11)').children().each( (item, index) => {
            cy
            .wrap(item)
            .should('contain.text', pregnantChildren[index])
        })
        cy.get('#content > div.grid-row > div > p:nth-child(13) > a').click()
        cy.url().should('include', '/how-to-apply')
        cy.go(-1)
        cy.get('.bold-small').contains('Your take-home pay changes each assessment period. To avoid any possible penalty charge, check before you claim.')
        cy.get('#finished-survey').click()
        cy.url().should('include', 'wh1.snapsurveys')
    })
})