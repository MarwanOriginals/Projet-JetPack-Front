/// <reference types="Cypress" />

context('Jetpack create', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('Create a jetpack Jetpacks', () => {
        cy.contains('Liste des Jetpacks').click()
        cy.get('#button1').should('have.class', 'active')
        cy.get('#button2').should('not.have.class', 'active')
        cy.get('#jetpacks-container').should('not.have.css', 'display', 'none')

        cy.contains('Nom du jetpack :')
        cy.get('#name').type('Test Jetpack')

        cy.contains('Image du jetpack :')
        cy.get('#image').type('image.png')

        cy.contains('Ajouter').click()
        cy.get("#jetpacks").contains("Test Jetpack")

    })
});
