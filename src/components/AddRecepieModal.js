import React from 'react';
import '../css/modal.css';

class AddRecepieModal extends React.Component {
	constructor(props) {
		super(props);
		this.submitName = this.submitName.bind(this);
	}

	submitName(e) {
		e.preventDefault();
		const name = this.refs._name.value;
		this.props.addNew(name);
	}
	render() {
		if (!this.props.isOpen) {
			return null;
		}
		return (
			<div className="modal-wrapper">
				<div className="modal-window">
					<h2>Recepie Name</h2>
					<form action="" onSubmit={e => this.submitName(e)}>
						<input autoFocus ref="_name" type="text" placeholder="Some awesome recepie" />
						<button type="submit" className="add-rec">
							ADD
						</button>
					</form>
					<span className="close" onClick={() => this.props.toggle()}>
						&times;
					</span>
				</div>
			</div>
		);
	}
}
export default AddRecepieModal;
