import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Sidebar from 'components/ui/Sidebar';

class App extends React.Component {
  componentDidMount() {}

  render() {
    const { children, compact } = this.props;

    return (
      <div className="d-flex h-100">
        <div className="position-relative" style={{ minWidth: compact ? '80px' : '300px' }}>
          <Sidebar />
        </div>
        <div className="flex-grow-1">{children}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default withRouter(connect(mapStateToProps)(App));
