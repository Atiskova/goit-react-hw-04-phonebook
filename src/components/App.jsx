import React, { useState } from 'react';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Section } from './Section/Section';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Container } from './App.Stuled';

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
    setContacts((prevContacts) => [contact, ...prevContacts]);
    return true;
  };

  const deleteContact = contactId => 
    setContacts((prevContacts) => contacts.filter(contact => contact.id !== contactId));
    

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


