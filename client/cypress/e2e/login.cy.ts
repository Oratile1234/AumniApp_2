Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

describe('login', () => {
    it('validation', () => {
        cy.login('.', '.');
    });
    it('login success ', () => {
        cy.login(6600, 'Password1');
    });
    it('login fail', () => {
        cy.login('6600', 'swdefrgthyjyhtgrfed');
    });
   

});