ejemṕlo = [{
  name: "alberto",
  age: 30,
  email: "al@gmail.com",
}, {
  ame: "segunda",
  age: 10,
  email: "asda@gmail.com",
  }, {
  ame: "tercera",
  age: 20,
  email: "al@dasdasdasdasd.com",
  }]


btn = document.querySelector("#prueba")

box = document.querySelector(".contenedor")

btn.addEventListener("click", () => {
  box.innerHTML = "PRUEBA"

  ejemṕlo.forEach(element => {

    keysObj = Object.keys(element)

    keysObj.forEach((llave) => {
      box.innerHTML += `<h2> ${llave}: ${element[llave]} </h2>`
    })
  });
})

