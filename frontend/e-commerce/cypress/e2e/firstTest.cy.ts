describe('template spec', () => {
  it('renders welcome message', () => {
    cy.visit('http://localhost');

    cy.get('[data-test-id="e-commerce-title"]').should('exist').should('have.text', 'E-Commerce');
  })
})