function quoteDeletion() {
  const deleteButton = document.querySelector('#deleteQuote')
  const title = document.querySelector('#quoteTitle')

  const handleClick = () => {
    const quoteId = title.getAttribute('data-id')

    fetch('/', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: quoteId
      })
    }).then(res => res.json())
    .then(({ redirect }) => {
      window.location = redirect
    })
  }
  deleteButton && deleteButton.addEventListener('click', handleClick)
}


function quoteAddition() {
  const form = document.querySelector('#postForm')
  form && form.addEventListener('submit', e => {
    e.preventDefault()
    const formData = new FormData(form)
    const data = {}
    for (const value of formData) {
      data[value[0]] = value[1]
    }
    fetch('/', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
    .then(({ redirect }) => {
      window.location = redirect
    })
  })
}

quoteAddition()
quoteDeletion()
