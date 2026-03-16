document.addEventListener("DOMContentLoaded", function () {

  fetch("/versions.json")
    .then(res => res.json())
    .then(data => {

      const select = document.querySelector(".version-select")
      const current = window.location.pathname.split("/")[1]

      data.forEach(v => {
        const opt = document.createElement("option")

        opt.value = "/" + v.version + "/"
        opt.text = v.title || v.version

        if (v.version === current)
          opt.selected = true

        select.appendChild(opt)
      })

      select.addEventListener("change", e => {
        window.location.href = e.target.value
      })

    })

})