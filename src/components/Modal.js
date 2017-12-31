import React from 'react';
import '../css/modal.css';

class Modal extends React.Component {
	render() {
		if (!this.props.isOpen) {
			return null;
		}
		return (
			<div className="modal-wrapper">
				<div className="modal-window">
					<h2>Are you sure you wand delete this Recepie?</h2>
					<div className="btn-cont">
						<button className="confirm del" onClick={() => this.props.deleteElement()}>
							Hell Yes
						</button>
					</div>
					<div className="btn-cont">
						<button className="confirm cancel" onClick={() => this.props.hideModal()}>
							Nope
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default Modal;
