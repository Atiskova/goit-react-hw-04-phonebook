import React, { useState } from 'react';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Section } from './Section/Section';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Container } from './App.Stuled';

// export class App extends React.Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };

//   componentDidMount() {
//     const contacts = JSON.parse(localStorage.getItem('contacts'));
//     if (contacts) {
//       this.setState({
//         contacts,
//       });
//     }
//   }

//   componentDidUpdate(_, prevState) {
//     if (prevState.contacts !== this.state.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   addContact = ({ name, number }) => {
//     const { contacts } = this.state;
//     const isContactExists = contacts.some(
//       contact => contact.name.toLowerCase() === name.toLowerCase()
//     );

//     if (isContactExists) {
//       alert(`Contact ${name} already exists!`);
//       return false;
//     }

//     const contact = {
//       id: nanoid(),
//       name,
//       number,
//     };
//     this.setState(({ contacts }) => ({
//       contacts: [contact, ...contacts],
//     }));
//     return true;
//   };

//   deleteContact = contactId => {
//     this.setState(({ contacts }) => ({
//       contacts: contacts.filter(contact => contact.id !== contactId),
//     }));
//   };

//   filterChange = event => {
//     this.setState({ filter: event.currentTarget.value });
//   };

//   getVisibleContact = () => {
//     const { contacts, filter } = this.state;
//     const normalizeFilter = filter.toLowerCase();
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizeFilter)
//     );
//   };

//   render() {
//     const { contacts, filter } = this.state;
//     const filteredContacts = this.getVisibleContact();

//     return (
//       <Container>
//         <Section title="Phonebook">
//           <ContactForm onSubmit={this.addContact}></ContactForm>
//         </Section>
//         <Section title="Contacts">
//           {contacts.length !== 0 && (
//             <Filter filter={filter} onFilterChange={this.filterChange}></Filter>
//           )}
//           {filteredContacts.length !== 0 && (
//             <ContactList
//               contacts={filteredContacts}
//               onDeleteContact={this.deleteContact}
//             ></ContactList>
//           )}
//           {contacts.length === 0 && <p>There are no contacts yet.</p>}
//           {contacts.length !== 0 && filteredContacts.length === 0 && (
//             <p>Contact wasn't found.</p>
//           )}
//         </Section>
//       </Container>
//     );
//   }
// }

export const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', [])
  const [filter, setFilter] = useState('');

  const addContact = (name, number) => {
    const isContactExists = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isContactExists) {
      alert(`Contact ${name} already exists!`);
      return false;
    }

    const contact = {
      id: nanoid(),
      name,
      number,
    };
    setContacts([contact, ...contacts]);
    return true;
  };

  const deleteContact = contactId => 
    setContacts(contacts.filter(contact => contact.id !== contactId));
    

  const filterChange = event => {
    setFilter(event.currentTarget.value);
  };

  const getVisibleContact = () => {
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };

  return (
    <Container>
      <Section title="Phonebook">
        <ContactForm onSubmit={addContact}></ContactForm>
      </Section>
      <Section title="Contacts">
        {contacts.length !== 0 && (
          <Filter filter={filter} onFilterChange={filterChange}></Filter>
        )}
        {getVisibleContact().length !== 0 && (
          <ContactList
            contacts={getVisibleContact()}
            onDeleteContact={deleteContact}
          ></ContactList>
        )}
        {contacts.length === 0 && <p>There are no contacts yet.</p>}
        {contacts.length !== 0 && getVisibleContact().length === 0 && (
          <p>Contact wasn't found.</p>
        )}
      </Section>
    </Container>
  );
};


