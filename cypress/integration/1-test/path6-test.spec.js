describe('Scenario 6: all yes except universal-credit-claim, no take home pay and no care home', function() {

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

    it('Take-home pay of £435 - No', function() {
        cy.get('#question-heading').contains('Did you and your partner have a combined take-home pay of £435 or less in your last Universal Credit period?')
        cy.get('.summary').click()
        cy.get('#universal-credit').should('be.visible')
        cy.get('#radio-no').click()
        cy.get('#next-button').click()
        cy.url().should('include', '/pregnant-or-given-birth')
    }),

    it('Pregnant or children in the last 12 months - Yes', function() {
        cy.get('#question-heading').contains('Are you pregnant or have you given birth in the last 12 months?')
        cy.get('#radio-yes').click()
        cy.get('#next-button').click()
        cy.url().should('include', '/war-pensioner')
    }),

    it('Injury or illness - Yes', function() {
        cy.get('#question-heading').contains('Do you have an injury or illness caused by serving in the armed forces?')
        cy.get('#radio-yes').click()
        cy.get('#next-button').click()
        cy.url().should('include', '/diabetes')
    }),

    it('Diabetes - Yes', function() {
        cy.get('#question-heading').contains('Do you have diabetes?')
        cy.get('#radio-yes').click()
        cy.get('#next-button').click()
        cy.url().should('include', '/glaucoma')
    }),

    it('Glaucoma - Yes', function() {
        cy.get('#question-heading').contains('Do you have glaucoma?')
        cy.get('#radio-yes').click()
        cy.get('#next-button').click()
        cy.url().should('include', '/care-home')
    }),

    it('Care home - No', function() {
        cy.get('#question-heading').contains('Do you or your partner live permanently in a care home?')
        cy.get('#radio-no').click()
        cy.get('#next-button').click()
        cy.url().should('include', '/savings')
    }),

    it('£16,000 in savings - Yes', function() {
        cy.get('#question-heading').contains('Do you and your partner have more than £16,000 in savings, investments or property?')
        cy.get('#radio-yes').click()
        cy.get('#next-button').click()
        cy.url().should('include', '/result')
    }),

    it('Result', function() {
        const getFree = ['NHS prescriptions', 'sight tests', 'NHS dental check-ups', 'NHS dental treatment']
        const pregnantChildren = ['£4.25 each week of your pregnancy from the 10th week', '£8.50 each week for children from birth to 1 year old', '£4.25 each week for children between 1 and 4 years old']

        cy.get('#result-heading').contains('You get help with NHS costs')
        cy.get('#content > div.grid-row > div > ul:nth-child(4)').children().each( (item, index) => {
            cy
            .wrap(item)
            .should('contain.text', getFree[index])
        })
        cy.get('#content > div.grid-row > div > ul:nth-child(8)').children().each( (item, index) => {
            cy
            .wrap(item)
            .should('contain.text', pregnantChildren[index])
        })
        /*cy.get('#content > div.grid-row > div > p:nth-child(10) > a').click()
        cy.url().should('include', '/how-to-apply')
        cy.go(-1)
        cy.get('#wales-prescription-how > a').click()
        cy.url().should('include', '/low-income-scheme-help-nhs-health-costs')
        cy.go(-1)
        cy.get('.summary').click()
        cy.get('#wales-dental-treatment > p').should('be.visible')
        cy.get('#war-pension-explanation > a').click()
        cy.url().should('include', '/veterans-uk')
        cy.go(-1)
        cy.get('#finished-survey').click()
        cy.url().should('include', 'wh1.snapsurveys')*/
    })
})