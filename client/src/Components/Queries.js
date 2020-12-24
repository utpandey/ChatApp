import { gql } from '@apollo/client';

export const REGISTER_USER = gql `
 mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      username: $username
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      username
      email
      createdAt
    }
  }
`

export const LOGIN_USER = gql `
  query login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      email
      createdAt
      token
    }
  }
`

export const GET_USER = gql `
  query getUsers{
    getUsers {
    username createdAt imageUrl 
    latestMessage{
      uuid from to content  createdAt
      }
    }
  }
`

export const GET_MESSAGES = gql `
  query getMessages($from:String!){
  getMessages(from:$from){
    uuid from to content createdAt
  }
}`

export const SEND_MESSAGE = gql `
  mutation sendMessage($to: String!, $content: String!) {
    sendMessage(to: $to, content: $content) {
      uuid
      from
      to
      content
      createdAt
    }
  }
`

export const REACT_TO_MESSAGE = gql `
mutation reactToMessage($uuid: String!, $content: String!) {
  reactToMessage(uuid: $uuid, content: $content) {
    uuid
  }
}
`