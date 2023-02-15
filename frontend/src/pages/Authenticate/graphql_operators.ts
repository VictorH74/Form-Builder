export const LOGIN_MUTATION = `mutation ObtainJSONWebToken ($login: String!, $password: String!) {
    tokenAuth (username: $login, password: $password) {
      token
    }
  }`

export const SIGNUP_MUTATION = `mutation CreateUser (
  $name: String!, $username: String!, $email: String!, $phone: String, $password: String! 
  ) {
  createUser (
    name: $name, username: $username, email: $email, phone: $phone, password: $password
    ) {
      created
    }
  }`