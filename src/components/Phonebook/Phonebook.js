import React, { Component } from 'react';
import shortid from 'shortid';
import ContactCreator from '../ContactCreator/ContactCreator';
import ContactList from '../ContactList/ContactList';
import ContactFilter from '../ContactFilter/ContactFilter';

const filterContacts = (contacts, filter) => {
  return contacts.filter(contact =>
    contact.name.toUpperCase().includes(filter.toUpperCase()),
  );
};

export default class Phonebook extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const existedContacts = localStorage.getItem('contacts');
    if (existedContacts) {
      const contacts = JSON.parse(existedContacts);
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  addContact = contact => {
    const { contacts } = this.state;
    const existContact = contacts.find(
      contactInPhonebook => contactInPhonebook.name === contact.name,
    );
    if (existContact) {
      alert(`Contact ${contact.name} is already exists in your phonebook!`);
    } else if (contact.name === '' || contact.number === '') {
      alert('Please, fill all fields!');
    } else {
      const contactToAdd = {
        ...contact,
        id: shortid.generate(),
      };
      this.setState(prevState => ({
        contacts: [...prevState.contacts, contactToAdd],
      }));
    }
  };

  changeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = filterContacts(contacts, filter);
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactCreator onAddContact={this.addContact} />
        <h2>Contacts</h2>
        <ContactFilter value={filter} onChangeFilter={this.changeFilter} />
        <ContactList
          items={filteredContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
