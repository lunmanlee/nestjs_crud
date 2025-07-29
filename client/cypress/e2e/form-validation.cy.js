describe('Form Validation', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('prevents creating post without required title', () => {
    cy.get('[data-testid="create-post-btn"]').click()
    cy.get('[data-testid="submit-create-btn"]').click()
    
    cy.contains('Title is required').should('be.visible')
    cy.get('[data-testid="title-input"]').should('have.class', 'border-red-500')
  })

  it('creates post successfully with valid title', () => {
    cy.get('[data-testid="create-post-btn"]').click()
    cy.get('[data-testid="title-input"]').type('My Test Post')
    cy.get('[data-testid="submit-create-btn"]').click()
    
    cy.contains('My Test Post').should('be.visible')
  })
})