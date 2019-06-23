import React from 'react';
import CustomModal from '../ui/CustomModal';

class EmployeeModal extends React.Component {
  closeOrderModal = () => {
    const { history } = this.props;
    history.push('/employees');
  };
  render() {
    const {
      match: { params },
      title
    } = this.props;

    const childrenWithProps = React.Children.map(this.props.children, child =>
      React.cloneElement(child, { employeeId: params.employeeId })
    );

    return (
      <CustomModal title={title} handleCancel={this.closeOrderModal} visible={true}>
        {childrenWithProps}
      </CustomModal>
    );
  }
}

export default EmployeeModal;
