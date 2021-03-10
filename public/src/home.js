function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) { 
  let total = 0;
  books.forEach((book) => {
    if (!book.borrows[0].returned) {
      total++;
    }
  });
  return total;
}

function _sortObj(obj) {
  // returns an array of keys 
  // turns object into an array , and sorts it 
  const keys = Object.keys(obj)
  return keys.sort((keyA, keyB) => {
    if(obj[keyA] > obj[keyB]) {
      return -1;
    } else if(obj[keyB] > obj[keyA]){
      return 1
    } else {
      return 0;
    }
  })
}

function getMostCommonGenres(books) {
  const count = books.reduce((acc, { genre }) => {
    if(acc[genre]) {
      acc[genre] += 1
    } else {
      acc[genre] = 1
    }
    return acc;
  }, {});

  const sortCount = _sortObj(count)
  return sortCount.map((name) => ({
    name,
    count: count[name]
  })).slice(0, 5)
}

function getMostPopularBooks(books) { 
  const result = books.map((book) => {
    const popularity = {
      name: book.title,
      count: book.borrows.length,
    };
    return popularity;
  });
  return result.sort((titleA, titleB) => titleB.count - titleA.count).slice(0, 5)
}

function getMostPopularAuthors(books, authors) {
  // It returns an array containing five objects or fewer that represents the most popular authors whose books 
  // have been checked out the most.
  //  Popularity is represented by finding all of the books written by the author and then adding up the number 
  //  of times those books have been borrowed.
  // Each object in the returned array has two keys:
  
  // - The `name` key which represents the first and last name of the author.
  // - The `count` key which represents the number of times the author's books have been borrowed.
  
  // If more than five authors are present, only the top five should be returned.

  // const popularity = {
  //    name: author.first.last,
  //    count: books.borrows
  // }
  const count = books.reduce((acc, { authorId, borrows }) => { 
    // acc + books.borrows + books.authorID
    // console.log(acc + books.borrows + books.authorID, "")
    if(acc[authorId]){
      acc[authorId].push(borrows.length)
    } else {
      acc[authorId] = [borrows.length]
    }
    return acc;
  }, {});
  console.log('count', count)

  for( let id in count){
    const sum = count[id].reduce((countA,countB) => countA + countB)
    count[id] = sum;
    // console.log('sum', sum)
  }
  const sortCount = _sortObj(count)
  console.log('sortCount', sortCount)

  return sortCount.map((authorId) => {
    console.log('authorId', typeof authorId)
    const {
      name: { first, last },
    } = authors.find(({ id }) => id === Number(authorId))
    const name = `${first} ${last}`;
    console.log('name', name)
    
    return { name, count: count[authorId]}
  })
  .slice(0, 5)
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
