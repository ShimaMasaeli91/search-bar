const bookCardTemplate = document.querySelector("[data-book-template]");
const bookCardContainer = document.querySelector("[data-book-cards-container]");
const searchInput = document.querySelector("[data-search]");

let books = [];

searchInput.addEventListener("input", function (e) {
  const value = e.target.value.toLowerCase();
  books.forEach((book) => {
    const isVisible =
      book.title.toLowerCase().includes(value) ||
      book.author.toLowerCase().includes(value);

    book.element.classList.toggle("hide", !isVisible);
  });
});

fetch("http://localhost:3000/books")
  .then((res) => res.json())
  .then((data) => {
    books = data.map((book) => {
      const card = bookCardTemplate.content.cloneNode(true).children[0];
      const header = card.querySelector("[data-header]");
      const body = card.querySelector("[data-body]");
      header.textContent = book.book_name;
      body.textContent = book.author_name;
      bookCardContainer.append(card);
      return {
        title: book.book_name,
        author: book.author_name,
        element: card,
      };
    });
  });
