describe('Scenario 8: dont have yet universal credit and tax credit benefit', function() {

    it('Enter page, accept cookies and start form', function() {
        cy.visit('https://services.nhsbsa.nhs.uk/check-for-help-paying-nhs-costs/start')
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

    it('Select GP practice in Scotland or Wales - yes', function() {
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

    it('Get paid Universal Credit? - Not yet', function() {
        cy.get('#question-heading').contains('Do you or your partner get paid Universal Credit?')
        cy.get('#not-yet').click()
        cy.get('#next-button').click()
        cy.url().should('include', '/awaiting-universal-credit')
    }),

    it('Waiting for decision', function() {
        cy.get('#question-heading').contains('While you and your partner are waiting on a Universal Credit decision')
        cy.get('#next-button').click()
        cy.url().should('include', '/benefits')
    }),

    it('Benefits - Tax credit', function() {
        cy.get('#question-heading').contains('Do you or your partner get any of these benefits?')
        cy.get('#taxCredit').click()
        cy.get('#content > div.grid-row > div > form > div:nth-child(3) > details > summary > span').click()
        cy.get('#benefits').should('be.visible')
        /*cy.get('#existing-benefit-link').should($a => {
            expect($a.attr('href'), 'href')
            expect($a.attr('target'), 'target').to.equal('_blank')
            $a.attr('target', '_self')
        }).click()
        cy.url().should('include', '/existing-benefit-claims')
        cy.go(-1)*/
        cy.get('#next-button').click()
        cy.url().should('include', '/tax-credit-type')
    }),

    it('Type of tax credits - Working tax credit and child tax credit together', function() {
        cy.get('#question-heading').contains('Which type of tax credits do you or your partner get?')
        cy.get('#workingChildTaxCredit').click()
        cy.get('#content > div.grid-row > div > form > details > summary > span').click()
        cy.get('#content > div.grid-row > div > form > details > p:nth-child(2)').should('be.visible')
        /*cy.get('#check-credit-link').should($a => {
            expect($a.attr('href'), 'href')
            expect($a.attr('target'), 'target').to.equal('_blank')
            $a.attr('target', '_self')
        }).click()
        cy.url().should('include', '/tax-credits-enquiries')
        cy.go(-1)*/
        cy.get('#next-button').click()
        cy.url().should('include', '/tax-credit-income')
    }),

    it('household income £15,276 or less - Yes', function() {
        cy.get('#question-heading').contains('Is your household income £15,276 or less?')
        /*cy.get('#tax-credit-link').should($a => {
            expect($a.attr('href'), 'href')
            expect($a.attr('target'), 'target').to.equal('_blank')
            $a.attr('target', '_self')
        }).click()
        cy.url().should('include', '/tax-credits-enquiries')
        cy.go(-1)*/
        cy.get('#radio-yes').click()
        cy.get('#next-button').click()
        cy.url().should('include', '/result-claiming-qualifying-tax-credit')
    }),

    it('Result', function() {
        const getFree = ['NHS prescriptions', 'NHS dental check-ups and treatment', 'sight tests', 'NHS wigs and fabric supports']
        const moneyOff = ['new glasses or contact lenses', 'repairing or replacing your glasses or contact lenses', 'travel for NHS treatment']
        const pregnantChildren = ['£4.25 each week of your pregnancy from the 10th week', '£8.50 each week for children from birth to 1 year old', '£4.25 each week for children between 1 and 4 years old']

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
        cy.get('#content > div.grid-row > div > ul:nth-child(11)').children().each( (item, index) => {
            cy
            .wrap(item)
            .should('contain.text', pregnantChildren[index])
        })
        /*cy.get('#content > div.grid-row > div > p:nth-child(13) > a').click()
        cy.url().should('include', '/how-to-apply')
        cy.go(-1)
        cy.get('#finished-survey').click()
        cy.url().should('include', 'wh1.snapsurveys')*/
    })
})