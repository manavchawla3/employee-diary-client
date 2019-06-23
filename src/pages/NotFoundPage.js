import React from 'react';
import { Helmet } from 'react-helmet';

import App from 'components/App';
import Section from 'components/ui/Section';

export default class NotFoundPage extends React.Component {
  render() {
    return (
      <App>
        <Helmet>
          <title>404 | Employee Diary</title>
        </Helmet>
        <Section>
          <div>Sorry! Page Not Found</div>
        </Section>
      </App>
    );
  }
}
