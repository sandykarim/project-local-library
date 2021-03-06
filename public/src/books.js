function findAuthorById(authors, id) {
  return authors.find(author => author.id === id);
}

function findBookById(books, id) {
  return books.find(book => book.id === id );
}


function partitionBooksByBorrowedStatus(books) {
//  It returns an array with two arrays inside of it. All of the inputted books are present 
//  in either the first or second array.

// The first array contains books _that have been loaned out,  
// and are not yet returned_ while 
// the second array contains books _that have been returned._
//  You can check for the return status by looking at the first transaction in the `borrows` array.

// const array = []
// return books.filter((book) => book.borrows.some((transaction) => !transaction.returned));
// return books.filter((book) => book.borrows.every((transaction) => transaction.returned));

return books.reduce((acc, book) => {
  const [borrowed, returned] = acc;
  const transaction = book.borrows[0];
  
  if(transaction.returned){
    returned.push(book)
  } else {
    borrowed.push(book)
  }  
  return acc
  },
  [[], []]
  )
}

function getBorrowersForBook(book, accounts) {
// - A book object.
// - An array of all accounts.

// It should return an array of all the transactions from the book's `borrows` key. 
// However, each transaction should include the related account information and the `returned` key.
// look at account ID-- if it returned their book 
// need to do a transactions [ account info , returned key ]

// map creates a new array by transforming every element in an array, individually
// filter creates a new array by removing elements that don't belong
// reduce on the other hand, takes all of the elements in an array and reduces them into a single value.
// Rest Parameter is collecting all remaining elements into an array.
// Spread Operator is unpacking collected elements such as arrays into single elements.
const accountsId = accounts.reduce((acc, account) => {
  acc[account.id] = account
  return acc;
}, {});
  return book.borrows.map(({ id, returned }) => ({
    ...accountsId[id],
    returned
  }))
  .slice(0, 10)
}


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
