import React from 'react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.min.css';
import './ImageCropper.scss';

class ImageCropper extends React.Component {
  state = {
    imageDestination: '',
  };

  imageElement = React.createRef();

  componentDidMount() {
    const cropper = new Cropper(this.imageElement.current, {
      zoomable: false,
      scalable: false,
      aspectRatio: 1,
      background: false,
      crop: () => {
        const canvas = cropper.getCroppedCanvas();
        this.setState({ imageDestination: canvas.toDataURL('image/png') });
        const { setCroppedImg } = this.props;
        setCroppedImg(this.state.imageDestination);
      },
    });
  }

  render() {
    return (
            <div>
                <div className="img-container">
                    <img ref={this.imageElement} src={this.props.src} alt="Source" crossOrigin />
                </div>
                <img src={this.state.imageDestination} className="img-preview" alt="Destination" />
            </div>
    );
  }
}

export default ImageCropper;
