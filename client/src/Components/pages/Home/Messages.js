import React, { Fragment, useEffect, useState } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import { Col, Form } from 'react-bootstrap'

import { useMessageDispatch, useMessageState } from '../../context/message'

import Message from './Message'

import {GET_MESSAGES,SEND_MESSAGES} from '../../Queries';

export default function Messages() {

  const [content, setContent] = useState('')

  const { users } = useMessageState()
  const dispatch = useMessageDispatch()

  const selectedUser = users?.find((u) => u.selected === true)
  const messages = selectedUser?.messages

  const [
    getMessages,
    { loading: messagesLoading, data: messagesData },
  ] = useLazyQuery(GET_MESSAGES)

  const [sendMessage] = useMutation(SEND_MESSAGES,{
    onCompleted: data => dispatch({ type: 'ADD_MESSAGE', payload: {
      username: selectedUser.username,
      message: data.sendMessage
    }}),
    onError: err => console.log(err)
  })

  useEffect(() => {
    if (selectedUser && !selectedUser.messages) {
      getMessages({ variables: { from: selectedUser.username } })
    }
  }, [selectedUser])

  useEffect(() => {
    if (messagesData) {
      dispatch({
        type: 'SET_USER_MESSAGES',
        payload: {
          username: selectedUser.username,
          messages: messagesData.getMessages,
        },
      })
    }
  }, [messagesData])

  const submitMessageHandler =(e) => {
    e.preventDefault()

    if(content.trim() === '' || !selectedUser ) return


    setContent('');
    // mutation for message 
    sendMessage({variables: {to: selectedUser.username, content}})
  }

  let selectedChatMarkup
  if (!messages && !messagesLoading) {
    selectedChatMarkup = <p className="info-text" >Select a friend</p>
  } else if (messagesLoading) {
    selectedChatMarkup = <p className="info-text" >Loading..</p>
  } else if (messages.length > 0) {
    selectedChatMarkup = messages.map((message, index) => (
      <Fragment key={message.uuid}>
        <Message message={message} />
        {index === messages.length - 1 && (
          <div className="invisible">
            <hr className="m-0" />
          </div>
        )}
      </Fragment>
    ))
  } else if (messages.length === 0) {
    selectedChatMarkup = <p>You are now connected! send your first message!</p>
  }

  return (
    <Col xs={10} md={8}>
    <div className="messages-box d-flex flex-column-reverse">
      {selectedChatMarkup}
    </div>
     <div className="">
     <Form onSubmit={submitMessageHandler}>
        <Form.Group className="d-flex align-items-center">
          <Form.Control
            type="text"
            className="p-4 mt-4 message-input rounded-pill bg-secondary border-0"
            placeholder="Type a message.."
            value={content}
            onChange={e => setContent(e.target.value)}
          />
          <i className="fas fa-paper-plane fa-2x text-primary mt-4 ml-3"
            onClick={submitMessageHandler}
            role='button'
          />
        </Form.Group>
      </Form>
     </div>
    </Col>
  )
}