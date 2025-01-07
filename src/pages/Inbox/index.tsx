import React from 'react';
import MailList from './components/mail-list';
import SelectedMail from './components/selected-mail';
import Nav from './components/nav';

const Inbox = () => {
  return (
    <React.Fragment>
      <Nav/>
      <main className="xl:grid grid-cols-3 gap-3">
        <section className="col-span-1">
          <MailList />
        </section>
        <section className="border-l-2 border-l-secondary p-2 col-span-2">
          <SelectedMail/>
        </section>
      </main>
    </React.Fragment>
  );
};

export default Inbox;
