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
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
    });
  }

  static updateUser(id, user) {
    return fetch(`${UserApi.baseUrl}/${id}`, {
      method: 'put',
      body: JSON.stringify({...user, id}),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
  }

}

document.addEventListener('DOMContentLoaded', () => {

  let form = document.querySelector('#regForm');
  let formUpdate = document.querySelector('#upd-user');

  let usersContainer = document.querySelector('#users');
  let select = document.querySelector('#select');
  let updateSelect = document.querySelector('#update-select');

  let controls = document.querySelector('#controls');
  let deleteBtn = document.querySelector('#delete');
  let updateBtn = document.querySelector('#update');

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
        form.reset();
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
      createUserListWithId();
    }
  })

  deleteBtn.addEventListener('click', delUserById);

  updateBtn.addEventListener('click', updateUserInfo);

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

  function createUserListWithId() {
    UserApi.getUsers()
    .then(response => response.json())
    .then(data => data.data)
    .then(users => {
      updateSelect.innerHTML = '';
      users.forEach(user => {
        let userId = user.usersId;
        let selectOption = document.createElement('option');
        selectOption.setAttribute('id', `${userId}`);
        selectOption.append(user.name);
        updateSelect.append(selectOption);
      })
    })
  }

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

  function updateUserInfo() {
    let usersId = '';
    let updateUserForm = document.querySelector('#upd-user');
    let {userName, userEmail, userPassword} = updateUserForm.elements;
    
    let user = new User({
      name: userName.value,
      email: userEmail.value,
      password: userPassword.value,
    })
    
    for (let key of updateSelect.selectedOptions) {
      if (updateSelect.value) {
        usersId = key.id;
        UserApi.updateUser(usersId, user)
        .then(response => console.log(response))
      }
    }
    renderUserList();
    createUserList();
    formUpdate.reset();
  }

})