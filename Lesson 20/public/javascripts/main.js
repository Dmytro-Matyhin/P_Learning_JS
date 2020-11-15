class User {
  constructor({name, email, password}) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

class UserApi {
  static baseUrl = 'users';

  static getUsers() {
    return fetch(UserApi.baseUrl);
  }

  static sendUser(user) {
    return fetch(UserApi.baseUrl, {
      method: "post",
      body: JSON.stringify(user),
      headers: {
          "Content-type": "application/json; charset=UTF-8"
      },
    });
  }

  static deleteUser(id) {
    return fetch(`${UserApi.baseUrl}/${id}`, {
      method: "delete",
      body: JSON.stringify({usersId: id}),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {

  let form = document.querySelector('#regForm');
  let usersContainer = document.querySelector('#users');
  let select = document.querySelector('#select');
  let controls = document.querySelector('#controls');
  let deleteBtn = document.querySelector('#delete');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let { name, email, password } = form.elements;
    let user = new User({
      name: name.value,
      email: email.value,
      password: password.value
    });
    console.log(user);

    UserApi.sendUser(user)
      .then( response => {
        console.log(response);
        form.style.display = "none";
        usersContainer.style.display = "block";
      })
  })

  controls.addEventListener('click', (e) => {
    if (e.target.id == "add") {
      form.style.display = "block";
      usersContainer.style.display = "none";
    }

    if (e.target.id == "get") {
      usersContainer.style.display = "block";
      form.style.display = "none";
      renderUserList();
      createUserList();
    }
  })

  deleteBtn.addEventListener('click', delUserById);

  function delUserById() {
    let selectedId = '';
    for (let key of select.selectedOptions) {
      if (select.value) {
        selectedId = key.id;
        UserApi.deleteUser(selectedId)
        .then(response => console.log(response))
      }
    }
    renderUserList();
    createUserList();
  }

  function renderUserList() {
    UserApi.getUsers()
      .then( res => res.json())
      .then( data => data.data)
      .then( users => {
        usersContainer.innerHTML = '';
        users.forEach( user => {
          usersContainer.innerHTML += `
            <h1 class="name">${user.name}</h1>
            <p class="email">${user.email}</p>
          `
        })
      })
  }

  function createUserList() {
    UserApi.getUsers()
    .then(response => response.json())
    .then(data => data.data)
    .then(users => {
      select.innerHTML = '';
      users.forEach(user => {
        let userId = user.usersId;
        let option = document.createElement('option');
        option.setAttribute('id', `${userId}`);
        option.append(user.name);
        select.append(option);
      })
    })
  }
})