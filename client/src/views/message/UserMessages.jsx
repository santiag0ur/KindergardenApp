import React, { Component } from 'react';
import { getMessages } from '../../services/messageapi';
import SingleUserMessage from './SingleUserMessage';
import Moment from 'react-moment';
export class UserMessages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }
  componentDidMount() {
    console.log(this.props.match.params.id);
    setInterval(() => {
      getMessages(this.props.match.params.id)
        .then((messages) => {
          this.setState({ messages });
        })
        .catch((error) => {
          console.log(error);
        });
    }, 5 * 1000);
  }

  componentWillUnmount() {
    this.intervalId = setInterval();
    clearInterval(this.intervalId);
  }

  render() {
    return (
      <div>
        <h1>hi</h1>

        <ul>
          {this.state.messages.map((message) => {
            if (
              this.props.match.params.id === message.receiver._id &&
              message.sender._id === this.props.user._id
            ) {
              return (
                <li key={message.id}>
                  {message.textBody}
                  <p>{message.sender.name}</p>
                  <Moment format="YYYY-MM-DD HH:mm">
                    {message.creationDate}
                  </Moment>
                </li>
              );
            } else if (
              this.props.match.params.id === message.sender._id &&
              message.receiver._id === this.props.user._id
            ) {
              return (
                <li key={message.id}>
                  {message.textBody}
                  <p>{message.sender.name}</p>
                  <Moment format="YYYY-MM-DD HH:mm">
                    {message.creationDate}
                  </Moment>
                </li>
              );
            }
          })}
        </ul>
        <SingleUserMessage receiver={this.props.match} />
      </div>
    );
  }
}

export default UserMessages;
