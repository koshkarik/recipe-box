import React from 'react';
import '../css/recepie.css';

class Recepie extends React.Component {
	constructor(props) {
		super(props);
		this.giveBack = this.giveBack.bind(this);
		this.state = {
			id: props.id
		};
		this.openModalAndSendId = this.openModalAndSendId.bind(this);
	}

	giveBack() {
		let id = this.state.id;
		this.props.checkActive(id);
	}

	openModalAndSendId() {
		this.props.openModal(this.state.id);
	}

	render() {
		return (
			<div
				className="recepie"
				style={
					this.props.activeRecepie === this.state.id
						? { backgroundColor: '#f9f2b3' }
						: { backgroundColor: '#fff' }
				}
			>
				<div className="recepie-content" onClick={this.giveBack}>
					<img src={this.props.image} alt={this.props.name} />
					<h2>{this.props.name}</h2>
				</div>
				<div className="recepie-desc">
					<p>{this.props.desc}</p>
				</div>
				<span className="delete-recepie" onClick={() => this.openModalAndSendId()}>
					&times;
				</span>
			</div>
		);
	}
}

export default Recepie;
