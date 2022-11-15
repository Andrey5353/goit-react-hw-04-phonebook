import { useState, useEffect } from 'react';
import { ContactForm } from 'components/ContactForm';
import { ContactList } from 'components/ContactList';
import { Filter } from 'components/Filter';
import { nanoid } from 'nanoid';
import css from 'components/App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('myContacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('myContacts', JSON.stringify(contacts));
  }, [contacts]);

  function addContact(name, number) {
    const normalizedFilter = name.toLowerCase();
    const checkByName = contacts.find(
      contact => contact.name.toLowerCase() === normalizedFilter
    );

    if (checkByName) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const contact = {
      id: nanoid(10),
      name,
      number,
    };

    setContacts([contact, ...contacts]);
  }

  function deleteContact(contactId) {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  }

  function changeFilter(event) {
    setFilter(event.currentTarget.value);
  }

  function getFiltredContacts() {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }

  return (
    <section className={css.phonebook}>
      <div className={css.phonebookWrap}>
        <h1 className={css.phonebookTitle}>Phonebook</h1>
        <ContactForm onSubmit={addContact} />
      </div>

      <div className={css.contactsWrap}>
        <h2 className={css.phonebookTitle}>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />

        <ContactList
          contacts={getFiltredContacts()}
          onDeleteContact={deleteContact}
        />
      </div>
    </section>
  );
};
