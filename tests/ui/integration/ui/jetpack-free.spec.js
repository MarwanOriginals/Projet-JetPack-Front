/// <reference types="Cypress" />

context('Jetpack search', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('Search for Jetpacks', () => {
    	cy.contains('Réserver un Jetpack').click()
        cy.get('#button1').should('not.have.class', 'active')
        cy.get('#button2').should('have.class', 'active')
        cy.get('#bookings-container').should('have.css', 'display', 'none')

        cy.contains('Date de debut :')
        cy.get('#startDate').type('2019-09-10')

        cy.contains('Date de fin :')
        cy.get('#endDate').type('2019-09-15')

        cy.contains('Rechercher').click()
        cy.get('#bookings-container').should('not.have.css', 'display', 'none')
        cy.get("#bookings").contains("Jetpack JackTalior\n")
    })

    it('Search all Jetpacks', () => {
    	cy.contains('Réserver un Jetpack').click()
        cy.get('#bookings-container').should('have.css', 'display', 'none')

        cy.contains('Date de debut :')
        cy.get('#startDate').type('2019-12-10')

        cy.contains('Date de fin :')
        cy.get('#endDate').type('2019-12-25')

        cy.contains('Rechercher').click()
        cy.get('#bookings-container').should('not.have.css', 'display', 'none')
    	cy.get("#bookings").children().should('have.length', 2)
    })

    it('Create a Jetpack and search all Jetpacks', () => {
    	cy.contains('Liste des Jetpacks').click()
        cy.get('#jetpacks-container').should('not.have.css', 'display', 'none')
        
        cy.contains('Nom du jetpack :')
        cy.get('#name').type('Test Jetpack')
        cy.contains('Image du jetpack :')
        cy.get('#image').type('image.png')
        cy.contains('Ajouter').click()
        cy.get("#jetpacks").contains("Test Jetpack")

    	cy.contains('Réserver un Jetpack').click()
    	cy.get('#search-form').should('not.have.css', 'display', 'none')

        cy.contains('Date de debut :')
        cy.get('#startDate').type('2019-12-10')
        cy.contains('Date de fin :')
        cy.get('#endDate').type('2019-12-25')
        cy.contains('Rechercher').click()
        cy.get('#bookings-container').should('not.have.css', 'display', 'none')
    	cy.get("#bookings").children().should('have.length', 3)
    })
});