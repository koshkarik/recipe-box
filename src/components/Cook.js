import React from 'react';

import '../css/cook.css';

class Cook extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: props.active,
			passive: []
		};
	}

	componentWillReceiveProps(newProps) {
		this.setState({
			active: newProps.active,
			passive: []
		});
	}

	moveToPassive(ind) {
		this.setState({
			passive: this.state.passive.concat(this.state.active[ind]),
			active: this.state.active
				.slice(0, ind)
				.concat(this.state.active.slice(ind + 1, this.state.active.length + 1))
		});
	}

	removeFromPassive(ind) {
		this.setState({
			passive: this.state.passive
				.slice(0, ind)
				.concat(this.state.passive.slice(ind + 1, this.state.passive.length + 1))
		});
	}

	render() {
		const liPassiveStyle = {
			backgroundColor: '#c4c0c0',
			color: '#000'
		};
		return (
			<div className="cook-box">
				<ul>
					{this.state.active.map((recepie, ind) => (
						<li
							key={ind}
							style={recepie.length < 1 ? { display: 'none' } : { display: 'block' }}
							onClick={() => this.moveToPassive(ind)}
						>
							{recepie}
						</li>
					))}

					{this.state.passive &&
						this.state.passive.map((recepie, ind) => (
							<li
								key={ind}
								style={liPassiveStyle}
								onClick={() => this.removeFromPassive(ind)}
								className="removed"
							>
								{recepie}
							</li>
						))}
				</ul>
			</div>
		);
	}
}

export default Cook;
