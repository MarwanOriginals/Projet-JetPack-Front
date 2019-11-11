/// <reference types="Cypress" />

context('Jetpack list', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('List all Jetpacks', () => {
    	cy.contains('Liste des Jetpacks').click()
    	cy.get('#button1').should('have.class', 'active')
        cy.get('#button2').should('not.have.class', 'active')

        cy.get('#jetpacks-container').should('not.have.css', 'display', 'none')

        cy.contains('Jetpack Fortnite Wiki\n')
    })
});