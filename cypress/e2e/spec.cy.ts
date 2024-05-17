import { BURGER_API_URL } from '../../src/utils/burger-api';

describe('service is available', function () {
  beforeEach(() => {
    cy.intercept("GET", `${BURGER_API_URL}/ingredients`, {
      fixture: "ingredients",
    }).as("ingredients");

    cy.visit('/')
  });

  it("create order", () => {
    cy.log("Check ingredient-details modal");

    cy.get('[class^=burger-ingredients_card__]')
      .first()
      .as("testIngredient");

    cy.get("@testIngredient").click();

    cy.get("[class^=modal_header_modal_text__]").contains("Детали ингредиента");
    cy.get("[class^=ingredient-details_container_details__] p").contains(
      "Краторная булка N-200i"
    );
    cy.get(
      "[class^=ingredient-details_details__]"
    ).as("details");

    cy.get("@details").eq(0).should("contain.text", "Калории,ккал420Белки, г80Жиры, г24Углеводы, г53",);
    cy.get("[class^=modal_close__]").click();

    cy.log("Add bun ingredient");

    cy.get('[data-type="bun"] [class^=burger-ingredients_card__]').as(
      "buns"
    );
    cy.get("@buns").first().as("bun").trigger("dragstart");

    cy.get("[class^=burger-constructor_emptyBlock__]")
      .first()
      .as("bunEmpty");

    cy.get("@bunEmpty").trigger("drop");

    cy.get("[class^=burger-constructor_ingredient__]").first().as("bunCart");

    cy.get("@bunCart")
      .contains("Краторная булка N-200i (верх)")
      .should("exist");

    cy.log("Replace bun ingredient");

    cy.get("@buns").eq(1).as("bun").trigger("dragstart");

    cy.get("@bunCart").trigger("drop");

    cy.get("@bunCart")
      .contains("Флюоресцентная булка R2-D3 (верх)")
      .should("exist");

    cy.log("Add main ingredient");

    cy.get('[data-type="main"] [class^=burger-ingredients_card__]').first().as(
      "main"
    );

    cy.get("@main").trigger("dragstart");

    cy.get("[class^=burger-constructor_emptyBlock__]")
      .first()
      .as("ingredientEmpty");

    cy.get("@ingredientEmpty").trigger("drop");

    cy.get("[class^=burger-constructor_all_ingredients__]").first().as("ingredientCart");

    cy.get("@ingredientCart")
      .contains("Биокотлета из марсианской Магнолии")
      .should("exist");

    cy.log("Check price");

    cy.get("[class^=burger-constructor_finalSum__] p").contains("2400");

    cy.log("Create order");

    cy.get("[class^=burger-constructor_finalSum__] .button").click();

    cy.log("Fill login form");

    cy.get("[class^=login-page_form__] .input_type_email").type(
      "test@test.ru"
    );
    cy.get("[class^=login-page_form__] .input_type_password").type(
      "testPassword"
    );
    cy.get("[class^=login-page_form__] button[type=submit]").click();

    cy.intercept("POST", `${BURGER_API_URL}/auth/login`, {
      fixture: "login",
    }).as("login");

    cy.get("[class^=burger-constructor_all_ingredients__]")
      .eq(0)
      .contains("Биокотлета из марсианской Магнолии");

    cy.log("Create order");

    cy.fixture("create-order").then((createOrderData) => {
      cy.intercept("POST", `${BURGER_API_URL}/orders`, {
        delay: 1000,
        statusCode: 200,
        body: createOrderData,
      }).as("createOrder");
    });

    cy.get("[class^=burger-constructor_finalSum__] .button").click();

    cy.log("Check modal order number");

    cy.get(
      "[class^=order-details_container_order__] [class^=order-details_order_number__]"
    ).contains("9789");

  });
}); 