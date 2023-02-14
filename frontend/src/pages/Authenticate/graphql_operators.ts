export const LOGIN_MUTATION = `mutation ObtainJSONWebToken ($login: String!, $password: String!) {
    tokenAuth (username: $login, password: $password) {
      token
    }
  }`