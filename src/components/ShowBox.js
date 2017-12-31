import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Recepie from './Recepie';
import Responsive from 'react-responsive';
import '../css/show.css';

const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;

const Fade = ({ children, ...props }) => (
	<CSSTransition {...props} timeout={500} classNames="move">
		{children}
	</CSSTransition>
);

function ShowBox(props) {
	function addRecepie() {
		props.toggleCreateModal();
	}
	return (
		<div className="show">
			<Default>
				<div className="heading">
					<h1>All Recepies</h1>
				</div>
			</Default>
			<div className="add-recepie">
				<button onClick={() => addRecepie()}>add recepie</button>
			</div>
			<div className="all-recepies">
				<TransitionGroup className="newRecepie">
					{props.recepies.map(recepie => {
						return (
							<Fade key={recepie.id}>
								<Recepie
									key={recepie.id}
									{...recepie}
									checkActive={props.checkActive}
									openModal={props.openModal}
									activeRecepie={props.activeRecepie}
								/>
							</Fade>
						);
					})}
				</TransitionGroup>
			</div>
		</div>
	);
}

export default ShowBox;
