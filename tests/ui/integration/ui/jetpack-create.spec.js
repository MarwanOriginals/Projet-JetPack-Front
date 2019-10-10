/// <reference types="Cypress" />

context('Jetpack create', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('Create a jetpack Jetpacks', () => {
        cy.contains('Ajouter').click()

        cy.contains('Ajouter un Jetpack')

        cy.get('#name').type('Test Jetpack')
        cy.get('#image').type('image.png')

        cy.contains('Sauvegarder').click()
        cy.get("#jetpacks").contains("Test Jetpack")

    })
});
