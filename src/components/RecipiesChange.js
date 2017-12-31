import React from 'react';
import '../css/recipe-change.css';

export default function RecipiesChange(props) {
	function change(e) {
		e.preventDefault();
	}

	function handleInputChange(e) {
		const recepie = props.active;
		const changedRecepie = { ...recepie, [e.target.name]: e.target.value };
		props.makeChange(changedRecepie);
	}

	function deleteListItem(e) {
		const indOfListItem = e.target.dataset.numb;
		const whichRecepie = props.active.id;
		props.deleteRecepie(whichRecepie, indOfListItem);
	}

	function handleListChange(e) {
		const id = props.active.id;
		const index = e.target.dataset.numb;
		console.log(index);
		const text = e.target.value;
		props.makeIngridientsChange(id, index, text);
	}

	return (
		<div className="change-form">
			<form action="" onSubmit={e => change(e)}>
				<input type="text" name="name" value={props.active.name} onChange={e => handleInputChange(e)} />
				<textarea
					value={props.active.desc}
					placeholder="Write something about your recepie"
					name="desc"
					cols="30"
					rows="10"
					onChange={e => handleInputChange(e)}
				/>

				<button className="addRecepieItem" onClick={() => props.addNewRecepieItem()}>
					Add Ingridient
				</button>

				{props.active.recepie.map((rec, ind) => (
					<div key={ind + 'cont'} className="listCont">
						<input
							type="text"
							className="listItem"
							placeholder="new ingridient"
							value={rec}
							key={ind}
							data-numb={ind}
							onChange={e => handleListChange(e)}
						/>
						<span key={ind + 'c'} data-numb={ind} className="closeButton" onClick={e => deleteListItem(e)}>
							&times;
						</span>
					</div>
				))}
			</form>
		</div>
	);
}
