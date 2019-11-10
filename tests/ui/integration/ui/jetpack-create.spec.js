/// <reference types="Cypress" />

context('Jetpack create', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('Create a jetpack Jetpacks', () => {
        

        cy.contains('Nom du jetpack :')
        cy.get('#name').type('Test Jetpack')

        cy.contains('Image du jetpack :')
        cy.get('#image').type('image.png')

        cy.contains('Ajouter').click()
        cy.get("#jetpacks").contains("Test Jetpack")
        



    })
});
