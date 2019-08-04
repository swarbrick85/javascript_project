$(() => {
  agents()
})

const agents = () => {
  $('.agents').on('click', (e) => {
    e.preventDefault()
    console.log('hello')
    fetch(`${$(".agents").attr("href")}` + `.json`)
      .then(res => res.json())
      .then(data => {
        $('#app-container').html('hellot')
      })
  })
}
