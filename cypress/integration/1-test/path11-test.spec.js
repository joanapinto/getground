describe('Scenario 11: not select country', function() {

    it('Enter page, accept cookies and start form', function() {
        cy.visit('https://services.nhsbsa.nhs.uk/check-for-help-paying-nhs-costs/start')
        cy.get('#next-button').click()
        cy.url().should('include', '/where-you-live')
    }),

    beforeEach(() => {
        Cypress.Cookies.preserveOnce('nhsuk-cookie-consent', '_gid', '_ga', 'SESSION')
    }),

    it('Dont select country Wales', function() {
        cy.get('#question-heading').contains('Which country do you live in?')
        cy.get('#next-button').click()
        cy.get('#next-button')
        cy.get('#error-summary-heading').should('be.visible').contains('There is a problem')
        cy.get('#error-summary > div > ul > li > a > span').should('be.visible')
    })
})