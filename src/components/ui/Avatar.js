import React from 'react';
import { Upload, Icon, message } from 'antd';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

export default class Avatar extends React.Component {
  state = {
    selectedFile: null,
    uploading: false
  };

  componentDidUpdate() {
    if (this.state.selectedFile) {
      this.previewFile();
    }
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false
        })
      );
    }
  };

  onRemove = file => {
    this.setState(state => {
      const index = state.fileList.indexOf(file);
      const newFileList = state.fileList.slice();
      newFileList.splice(index, 1);
      return {
        fileList: newFileList
      };
    });
  };

  beforeUpload = file => {
    const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJPG) {
      message.error('You can only upload JPG And PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }

    if (isJPG && isLt2M) {
      this.setState({
        selectedFile: file
      });
    }

    const { onImageUploadSuccess } = this.props;
    onImageUploadSuccess(file);

    return false;
  };

  previewFile() {
    var preview = document.querySelector('.imagePreviewContainer');
    var file = this.state.selectedFile;
    var reader = new FileReader();

    reader.onloadend = function() {
      preview.src = reader.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = '';
    }
  }

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const { profile_img } = this.props;
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={this.beforeUpload}
        onChange={this.handleChange}
      >
        {this.state.selectedFile ? (
          <>
            <img alt={'avatar'} style={{ maxWidth: '200px', maxHeight: '200px' }} className={'imagePreviewContainer'} />
          </>
        ) : profile_img ? (
          <img alt={'avatar'} style={{ maxWidth: '200px', maxHeight: '200px' }} src={profile_img} />
        ) : (
          uploadButton
        )}
      </Upload>
    );
  }
}
