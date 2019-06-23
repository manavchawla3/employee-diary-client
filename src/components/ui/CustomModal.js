import React from 'react';
import { Modal } from 'antd';

class CustomModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible
    };
  }

  handleOk = e => {
    const { handleOK } = this.props;
    if (handleOK) handleOK();
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    const { handleCancel } = this.props;
    if (handleCancel) handleCancel();
    this.setState({
      visible: false
    });
  };

  render() {
    const { title } = this.props;
    return (
      <Modal
        title={title}
        visible={this.state.visible}
        onOk={this.handleOk}
        footer={false}
        onCancel={this.handleCancel}
      >
        {this.props.children}
      </Modal>
    );
  }
}

export default CustomModal;
