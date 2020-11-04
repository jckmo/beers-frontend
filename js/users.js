class User {
  constructor(name, email, phone, password) {
    this.name = name
    this.email = email
    this.phone = phone
    this.password = password
  }
}

function createUserObj(user) {
  let configObject = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      name: user.name,
      email: user.email,
      phone: user.phone,
      password_digest: user.password
    })
  }

  fetch('http://localhost:3000/users', configObject)
    .then(response => response.json())
    .then(jsonResponse => console.log(jsonResponse))
    .catch(error => alert(error.message))
}

function showUser(user) {
  console.log(user)

  userSignInForm.remove()
  userSignUpForm.remove()

  mainContainer.appendChild(profileContainer)
  loginUser()
  fetchUserBeers(user)
  profileContainer.appendChild(userBeersTable)
}

function loginUser() {
  loginLink.style.visibility = 'hidden'
  profileLink.style.visibility = 'visible'
  homeLink.style.visibility = 'visible'
  aboutLink.style.visibility = 'visible'
  aboutLink.style.visibility = 'visible'
  userButtonContainer.innerHTML = '<button id="user-button">Generate New Beer</button>'
  logoutButtonContainer.innerHTML = '<button id="logout-button">Logout</button>'

  userButton = document.querySelector('#user-button')
  logoutButton = document.querySelector('#logout-button')

  userButton.addEventListener('click', () => {
// generate button
  })
  logoutButton.addEventListener('click', logoutUser)
}

function fetchUserBeers(user) {
    fetch(`http://localhost:3000/users/${user.id}/beers`)
    .then(response => response.json())
    .then(jsonResponse => {
      console.log(jsonResponse)
      if (jsonResponse.length < 1) {
        let welcome = document.createElement('p')
        welcome.id = 'welcome-message'
        welcome.innerText = `Welcome ${user.name}! It looks like you don't have any beers in your log. If you'd like to see what we have available, check out our full log with the browse all button above.`
        profileContainer.appendChild(welcome)
      } else {
        let idHeader = document.createElement('th')
        let brandHeader = document.createElement('th')
        let nameHeader = document.createElement('th')
        let styleHeader = document.createElement('th')
        let hopHeader = document.createElement('th')
        let yeastHeader = document.createElement('th')
        let maltsHeader = document.createElement('th')
        let ibuHeader = document.createElement('th')
        let abvHeader = document.createElement('th')
        let blgHeader = document.createElement('th')
        
        userBeersTable.id = 'beers-table'

        idHeader.innerText = 'Beer ID'
        brandHeader.innerText = 'Brand' 
        nameHeader.innerText = 'Name'
        styleHeader.innerText = 'Style' 
        hopHeader.innerText = 'Hop' 
        yeastHeader.innerText = 'Yeast' 
        maltsHeader.innerText = 'Malts' 
        ibuHeader.innerText = 'IBU' 
        abvHeader.innerText = 'ABV%' 
        blgHeader.innerText = 'BLG°'

        userBeersTable.appendChild(idHeader)
        userBeersTable.appendChild(brandHeader)
        userBeersTable.appendChild(nameHeader)
        userBeersTable.appendChild(styleHeader)
        userBeersTable.appendChild(hopHeader)
        userBeersTable.appendChild(yeastHeader)
        userBeersTable.appendChild(maltsHeader)
        userBeersTable.appendChild(ibuHeader)
        userBeersTable.appendChild(abvHeader)
        userBeersTable.appendChild(blgHeader)

        profileContainer.appendChild(userBeersTable)
        for (let x of jsonResponse) {
          let newRow = document.createElement('tr')
          userBeersTable.appendChild(newRow)
          
          let idCell = document.createElement('td')
          let brandCell = document.createElement('td')
          let nameCell = document.createElement('td')
          let styleCell = document.createElement('td')
          let hopCell = document.createElement('td')
          let yeastCell = document.createElement('td')
          let maltsCell = document.createElement('td')
          let ibuCell = document.createElement('td')
          let abvCell = document.createElement('td')
          let blgCell = document.createElement('td')
          
          idCell.className = 'beer-id'
          brandCell.className = 'beer-brand'
          nameCell.className = 'beer-name'
          styleCell.className = 'beer-style'
          hopCell.className = 'beer-hop'
          yeastCell.className = 'beer-yeast'
          maltsCell.className = 'beer-malts'
          ibuCell.className = 'beer-ibu'
          abvCell.className = 'beer-abv'
          blgCell.className = 'beer-blg'
          
          idCell.innerText = x.id
          brandCell.innerText = x.brand
          nameCell.innerText = x.name
          styleCell.innerText = x.style
          hopCell.innerText = x.hop
          yeastCell.innerText = x.yeast
          maltsCell.innerText = x.malts
          ibuCell.innerText = x.ibu
          abvCell.innerText = x.alcohol
          blgCell.innerText = x.blg
          
          newRow.appendChild(idCell)
          newRow.appendChild(brandCell) 
          newRow.appendChild(nameCell) 
          newRow.appendChild(styleCell) 
          newRow.appendChild(hopCell) 
          newRow.appendChild(yeastCell) 
          newRow.appendChild(maltsCell) 
          newRow.appendChild(ibuCell)
          newRow.appendChild(abvCell) 
          newRow.appendChild(blgCell)
        }
      }
    })
}

function userSignUpPortal() {
  userSignUpForm.id = 'sign-up'
  mainContainer.appendChild(profileContainer)
  profileContainer.appendChild(userSignUpForm)
  
  let nameInput = document.createElement('input')
  let emailInput = document.createElement('input')
  let phoneInput = document.createElement('input')
  let passwordInput = document.createElement('input')
  let passwordConfirm = document.createElement('input')
  let submit = document.createElement('button')
  let signInButton = document.createElement('button')
  
  nameInput.id = 'name'
  emailInput.id = 'email'
  phoneInput.id = 'phone'
  passwordInput.id = 'password'
  passwordInput.id = 'password-confirm'
  submit.id = 'submit'
  signInButton.id = 'sign-in'

  nameInput.placeholder = 'Enter Name'
  emailInput.placeholder = 'Enter Email'
  phoneInput.placeholder = 'Enter Phone (Optional)'
  passwordInput.placeholder = 'Enter Password'
  passwordConfirm.placeholder = 'Confirm Password'
  
  passwordInput.type = 'password'
  passwordConfirm.type = 'password'
  submit.innerText = 'Submit'
  signInButton.innerText = 'Already Registered? Sign In Here.'

  signInButton.addEventListener('click', () => {
    profileContainer.remove()
    userSignInPortal()
  })
    
  userSignUpForm.appendChild(nameInput)
  userSignUpForm.appendChild(emailInput)
  userSignUpForm.appendChild(phoneInput)
  userSignUpForm.appendChild(passwordInput)
  userSignUpForm.appendChild(passwordConfirm)
  userSignUpForm.appendChild(submit)
  userSignUpForm.appendChild(signInButton)

  
  submit.addEventListener('click', (e) => {
    e.preventDefault()
    if (passwordConfirm.value !== passwordInput.value || passwordConfirm.value == '' || passwordInput.value === '' ) {
      alert('Please check your password inputs and try again.')
      passwordInput.reset()
      passwordConfirm.reset()
    } else if (nameInput.value == '' || emailInput.value == ''){
      alert('You must fill in the entire form to continue.')
    } else {
      let newUser = new User(nameInput.value, emailInput.value, phoneInput.value, passwordInput.value)
      createUserObj(newUser)
      showUser(newUser)
    }
  })
}

function userSignInPortal() { 
  let emailInput = document.createElement('input')
  let passwordInput = document.createElement('input')
  let submit = document.createElement('button')
  let signUpButton = document.createElement('button')
  emailInput.id = 'email'
  passwordInput.id = 'password'
  submit.id = 'submit'
  signUpButton.id = 'sign-up'
  
  emailInput.placeholder = 'Enter Email'
  passwordInput.placeholder = 'Enter Password'
  
  passwordInput.type = 'password'
  submit.innerText = 'Submit'
  signUpButton.innerText = "Not Registered Yet? Sign Up Here"
  signUpButton.addEventListener('click', () => {
    profileContainer.remove()
    userSignUpPortal()
  })
  
  submit.addEventListener('click', (e) => {
    e.preventDefault()
// fetch to sessions#new and get user id. set user id to session id
    if (passwordInput.value === '') {
      alert('Please check your password inputs and try again.')
      passwordInput.value = ''
    } else if (emailInput.value === ''){
      alert('You must fill in the entire form to continue.')
    } else {
      let configObject = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: emailInput.value,
        })
      }
      
      fetch('http://localhost:3000/', configObject)
        .then(response => response.json())
        .then(jsonResponse => {
          sessionStorage.setItem('user_id', jsonResponse.id)
          userSignInForm.reset()
          showUser(jsonResponse)
        })
        .catch(error => {
          console.log(error.message)
          passwordInput.reset
          emailInput.reset
          alert('The user you are looking for could not be found. Please check your inputs and try again.')
        })
    }
  })
  userSignInForm.id = 'sign-in'
  if (profileContainer.innerHTML !== '') {
    console.log('yes')
    userSignInForm.reset()
    userBeersTable.remove()
    mainContainer.appendChild(profileContainer)
    profileContainer.appendChild(userSignInForm)
  } else {
    userSignInForm.appendChild(emailInput)
    userSignInForm.appendChild(passwordInput)
    userSignInForm.appendChild(submit)
    userSignInForm.appendChild(signUpButton)
    mainContainer.appendChild(profileContainer)
    profileContainer.appendChild(userSignInForm)
  }
}

function logoutUser() {
  console.log(`sessions before: ` + sessionStorage['user_id'])
  sessionStorage.clear()
  console.log(`sessions after: ` + sessionStorage['user_id'])

  profileContainer.remove()
  logoutButton.remove()
  userButton.remove()
  allBeersTable.remove()

  fetchedBeers = 0
  loginLink.style.visibility = 'visible'
  profileLink.style.visibility = 'hidden'
  homeLink.style.visibility = 'hidden'
  aboutLink.style.visibility = 'hidden'
  aboutLink.style.visibility = 'hidden'
  location.reload()
}

function showHomePage() {
  let sliderContainer = document.createElement('div')
  sliderContainer.id = 'image-slider'  
  mainContainer.appendChild(sliderContainer)
  let delayInSeconds = 3
  let counter = 0

  function changeImage() {
    counter++
    if (counter <= 4) {
      sliderContainer.innerHTML = `<img src="./assets/images/rotating-images/beer${counter}.jpg" width="700" height="500" id="rotator"></img>`
    } else {
      counter = 0
      changeImage()
    }
  }
  changeImage()
  setInterval(changeImage, delayInSeconds * 1000);

  let homeDescriptionContainer = document.createElement('div')
  let welcomeMessage = document.createElement('h2')
  let welcomeParagraph = document.createElement('p')

  homeDescriptionContainer.id = 'home-description-container'
  welcomeMessage.id = 'welcome-message'
  welcomeParagraph.id = 'welcome-paragraph'
}

