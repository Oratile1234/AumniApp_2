Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

describe('register', () => {
    it('validation', () => {
        cy.register(".", ".", ".", ".", "Miss K Sibanyoni", ".", "sibanyoni@aeiou", ".");
    });

    it('register fail', () => {
        cy.register("K2022068323207", "The A's E's I's O's U's", "info@aeiou.co.za", "013 712 4583",
            "Miss K Sibanyoni", "werewr", "sibanyoni@aeiou", "admi");
    });
    it('register success ', () => {
        cy.register("K2022068323207", "The A's E's I's O's U's", "info@aeiou.co.za", "013 712 4583",
            "Miss K Sibanyoni", "3743", "sibanyoni@aeiou", "admin@123");
    });




});
