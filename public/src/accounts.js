
function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id );
}

function sortAccountsByLastName(accounts) {
  return  accounts.sort((accountA, accountB) =>  {
    //accountA.name.last < accountB.name.last ? -1 : 1)

    let lastA = accountA.name.last.toLowerCase();
    let lastB = accountB.name.last.toLowerCase();
    return lastA < lastB ? -1 : 1;
  });
}

function getTotalNumberOfBorrows(account, books) {
//   const {id} = account;
//   let total = 0; 
//   for (let book in books){
//     const {borrows} = books[book]
//     borrows.forEach((item) => { 
//       if(item.id === id) { 
//         total++ 
//     }
//   }); 
// } 
// return total
  return books.reduce((acc, book) => {
    const count = book.borrows.reduce((borrowAcc, borrow) => {
      return borrow.id === account.id ? borrowAcc + 1 : borrowAcc;
    }, 0);
    return acc + count
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) { 
//   - An account object.
// - An array of all books objects.
// - An array of all author objects.

// // It returns an array of books and authors that represents all books _currently checked out_ by the given account. 
// _Look carefully at the object below,_ as it's not just the book object; 
// // the author object is embedded inside of it.

  return books // filter down to compare returned && compare book id with account id  // 
    .filter((book) => {
      const currently = book.borrows[0];
      return !currently.returned && currently.id === account.id;
    })
    .map((book) => {
      const author = authors.find((author) => author.id === book.authorId);
      return { ...book, author };
    });
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
