let library = [
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    pages: 324,
    read: true,
  },
]

class Book {
  constructor(_title, _author, _pages, _read) {
    this.title = _title
    this.author = _author
    this.pages = _pages
    this.read = _read
  }
}

const bookDialog = document.getElementById('bookDialog')
const newBookButton = document.getElementById('newBook')
newBookButton.addEventListener('click', () => bookDialog.showModal())

const container = document.querySelector('main')

function createCard(_title, _author, _pages, _read) {
  const card = document.createElement('section')

  const header = document.createElement('div')
  header.classList.add('header')
  const title = document.createElement('h1')
  title.textContent = _title
  const author = document.createElement('h3')
  author.textContent = _author
  header.append(title, author)

  const description = document.createElement('div')
  description.classList.add('description')
  description.dataset.index = library.length - 1
  const pages = document.createElement('p')
  pages.textContent = `${_pages} pages`
  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.checked = _read ? true : false
  const status = document.createElement('p')
  status.textContent = _read ? 'Already read' : 'Not read'
  const remove = document.createElement('button')
  remove.textContent = 'Remove'
  description.append(pages, checkbox, status, remove)

  card.append(header, description)

  container.append(card)
}

for (let i = 0; i < library.length; i++) {
  createCard(
    library[i].title,
    library[i].author,
    library[i].pages,
    library[i].read
  )
}

const addButton = document.getElementById('addButton')
const form = document.getElementById('bookForm')

addButton.addEventListener('click', event => {
  event.preventDefault()

  const title = form.title.value
  const author = form.author.value
  const pages = Number(form.pages.value)
  const read = form.read.checked

  const book = {
    title: title,
    author: author,
    pages: pages,
    read: read,
  }

  library.push(book)
  createCard(title, author, pages, read)

  form.reset()
})

container.addEventListener('click', event => {
  let element = event.target
  let index = element.parentNode.dataset.index

  if (element.type === 'submit') {
    library.splice(index, 1)
    element.parentNode.parentNode.remove()
  }

  if (element.type === 'checkbox') {
    if (element.nextSibling.textContent === 'Already read') {
      element.nextSibling.textContent = 'Not read'
      library[index].read = !library[index].read
    } else {
      element.nextSibling.textContent = 'Already read'
      library[index].read = !library[index].read
      console.log(library[index].read)
    }
  }
})

