describe("theBlog", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("check localhost", () => {
    cy.visit("http://localhost:5173/");
  });

  it("check display app", () => {
    cy.get("h1[cy-data=app-title]").should("be.visible");
    cy.get("h2[cy-data=recent-posts]").should("be.visible");
    cy.get("h2[cy-data=all-posts]").should("be.visible");
    cy.get("nav[cy-data=navbar]").should("be.visible");
    cy.get("footer[cy-data=footer]").should("be.visible");
  });

  it("should wait for the API to load and click on a post", () => {
    cy.intercept(
      "GET",
      "https://lumoshive-academy-media-api.vercel.app/api/games?page=1"
    ).as("getRecentPosts");
    cy.intercept(
      "GET",
      "https://lumoshive-academy-media-api.vercel.app/api/games/news?page=1"
    ).as("getPosts");
    cy.wait("@getRecentPosts");
    cy.wait("@getPosts");
    cy.get("div[cy-data=recent-posts-container]").should(
      "have.length.greaterThan",
      0
    );
    cy.get("div[cy-data=posts-1]").click();
    cy.url().should("include", "/detail/2024/11/28/steam-autumn-sale-28112024");
  });
});
