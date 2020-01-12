import React from 'react';
import PropTypes from 'prop-types';
import Contact from '../Contact/Contact';
import styles from './ContactList.module.css';

const ContactList = ({ items, onDeleteContact }) =>
  items.length > 0 && (
    <div>
      <ul className={styles.list}>
        {items.map(item => (
          <li key={item.id}>
            <Contact
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...item}
              onDeleteContact={() => onDeleteContact(item.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );

ContactList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;
