import React from 'react';
import Responsive from 'react-responsive';
import ShowBox from './ShowBox';
import RecipiesChange from './RecipiesChange';
import Cook from './Cook';
import Modal from './Modal';
import '../css/style.css';
import AddRecepieModal from './AddRecepieModal';

const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			recepies: [
				{
					name: 'Shiny Fish',
					desc: 'This is the most tasty fish ever! Try it with wine.',
					recepie: ['fish', 'potato', 'sugar', 'salt'],
					image:
						'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Tilapia_zillii_Kineret.jpg/1200px-Tilapia_zillii_Kineret.jpg',
					id: 1
				},
				{
					name: 'Crispy Cake',
					desc: 'It is so tasty and sweet, you can not even imagine',
					recepie: ['sugar', 'chocolate', 'marshmallow'],
					image:
						'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Download_%2853%29.jpg/220px-Download_%2853%29.jpg',
					id: 2
				}
			],
			images: {
				meat: 'http://s1.1zoom.me/big0/853/Meat_products_Mushrooms_Tomatoes_527520_1280x853.jpg',
				fish:
					'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Tilapia_zillii_Kineret.jpg/1200px-Tilapia_zillii_Kineret.jpg',
				salad: 'http://www.simplyrecipes.com/wp-content/uploads/2016/07/2016-08-12-BLT-Salad-3-600x400.jpg',
				potato:
					'https://assets.bonappetit.com/photos/59d64ceda02eaa65814f3b73/16:9/w_1200,c_limit/perfectly-roasted-potatoes.jpg',
				pasta:
					'http://cdn-image.myrecipes.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/image/lighten-up-america/pasta-vodka-cream-sauce-ck-x.jpg?itok=hNBgMYDa',
				chicken:
					'https://static01.nyt.com/images/2014/05/12/dining/Roast-Chicken-With-Cumin-Honey-And-Orange/Roast-Chicken-With-Cumin-Honey-And-Orange-superJumbo.jpg',
				beef: 'http://img.taste.com.au/cXsZWW0F/taste/2016/11/basic-roast-beef-vegetables-21318-1.jpeg',
				vegetables:
					'https://static01.nyt.com/images/2015/09/23/dining/23ROASTEDVEGETABLES/23ROASTEDVEGETABLES-videoSixteenByNineJumbo1600-v2.jpg',
				egg:
					'https://web.aw.ca/i/items/?i=classic-bacon-eggs&d=classic-bacon-eggs&cat=breakfast&lang=classic-bacon-eggs-en',
				sausage:
					'http://www.seriouseats.com/recipes/assets_c/2013/07/20130729-261058-merguez-grilled-thumb-625xauto-342799.jpg',
				fruit:
					'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREQyxVg0lKF3r12r_xlC8LeRFe9UqH2i41Nf4bnGnIo0dleLHM',
				cake:
					'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Download_%2853%29.jpg/220px-Download_%2853%29.jpg',
				dessert:
					'https://assets.marthastewart.com/styles/wmax-1500/d38/msl-kitchen-sponge-cakes-0554-md110059/msl-kitchen-sponge-cakes-0554-md110059_horiz.jpg?itok=Bu4cGnhF',
				anotherFood: 'https://oneclassblog.com/wp-content/uploads/2017/10/food.jpg',
				pizza:
					'https://vignette.wikia.nocookie.net/five-nights-at-freddys-rus/images/7/72/2700665-1366560959-pizza.jpg/revision/latest?cb=20150422141656&path-prefix=ru',
				burger: 'http://www.freepngimg.com/download/burger/6-2-burger-png-image.png'
			},
			lastId: 2,
			activeRecepie: null,
			modalIsOpen: false,
			addModalIsOpen: false,
			modalToDelete: null,
			createRecModalIsOpen: false,
			mobileActiveTab: 1,
			storageNum: 2
		};
		this.makeActive = this.makeActive.bind(this);
		this.makeChange = this.makeChange.bind(this);
		this.makeIngridientsChange = this.makeIngridientsChange.bind(this);
		this.deleteRecepie = this.deleteRecepie.bind(this);
		this.addNewRecepie = this.addNewRecepie.bind(this);
		this.addNewRecepieItem = this.addNewRecepieItem.bind(this);
		this.openModal = this.openModal.bind(this);
		this.hideModal = this.hideModal.bind(this);
		this.deleteElement = this.deleteElement.bind(this);
		this.toggleCreateModal = this.toggleCreateModal.bind(this);
	}

	componentWillMount() {
		// check if there is any order in localStorage
		const localStorageRef = localStorage.getItem('_recepies_');
		const localStorageItemNum = localStorage.getItem('_locStorageItemsNum_');

		if (localStorageRef && localStorageItemNum) {
			this.setState({
				recepies: JSON.parse(localStorageRef),
				storageNum: JSON.parse(localStorageItemNum),
				lastId: JSON.parse(localStorageItemNum)
			});
		}
	}

	componentWillUpdate(nextProps, nextState) {
		localStorage.setItem('_recepies_', JSON.stringify(nextState.recepies));
		localStorage.setItem('_locStorageItemsNum_', JSON.stringify(nextState.storageNum));
	}

	findRightImage(name) {
		const recepieName = name.toLowerCase();
		if (recepieName.indexOf('meat') !== -1) {
			return this.state.images.meat;
		} else if (recepieName.indexOf('fish') !== -1) {
			return this.state.images.fish;
		} else if (recepieName.indexOf('salad') !== -1) {
			return this.state.images.salad;
		} else if (recepieName.indexOf('potato') !== -1) {
			return this.state.images.potato;
		} else if (recepieName.indexOf('pasta') !== -1) {
			return this.state.images.pasta;
		} else if (recepieName.indexOf('chicken') !== -1) {
			return this.state.images.chicken;
		} else if (recepieName.indexOf('beef') !== -1) {
			return this.state.images.beef;
		} else if (recepieName.indexOf('vegetables') !== -1) {
			return this.state.images.vegetables;
		} else if (recepieName.indexOf('egg') !== -1) {
			return this.state.images.egg;
		} else if (recepieName.indexOf('sausage') !== -1) {
			return this.state.images.sausage;
		} else if (recepieName.indexOf('fruit') !== -1) {
			return this.state.images.fruit;
		} else if (recepieName.indexOf('cake') !== -1) {
			return this.state.images.cake;
		} else if (recepieName.indexOf('dessert') !== -1) {
			return this.state.images.dessert;
		} else if (recepieName.indexOf('pizza') !== -1) {
			return this.state.images.pizza;
		} else if (recepieName.indexOf('burger') !== -1) {
			return this.state.images.burger;
		} else {
			return this.state.images.anotherFood;
		}
	}

	toggleCreateModal() {
		this.setState({
			createRecModalIsOpen: !this.state.createRecModalIsOpen
		});
	}
	makeActive(id) {
		this.setState({
			activeRecepie: id
		});
	}

	findIndex(arr, id) {
		for (let i = 0; i < arr.length; i++) {
			if (arr[i].id === id) {
				return i;
			}
		}
	}

	openModal(id) {
		this.setState({
			modalIsOpen: true,
			modalToDelete: id
		});
		console.log(this.state);
	}

	hideModal() {
		this.setState({
			modalToDelete: null,
			modalIsOpen: false
		});
	}

	deleteElement() {
		const indexToDelete = this.findIndex(this.state.recepies, this.state.modalToDelete);
		const newRecepiesState = this.state.recepies.slice();

		newRecepiesState.splice(indexToDelete, 1);
		this.hideModal();
		this.setState({
			recepies: newRecepiesState,
			activeRecepie: null
		});

		console.log(indexToDelete);
	}

	deleteRecepie(whichList, itemInd) {
		const recepiesTarget = this.findIndex(this.state.recepies, whichList);
		const newRecepiesState = this.state.recepies.slice();
		const targetRecepie = newRecepiesState[recepiesTarget].recepie;
		targetRecepie.splice(itemInd, 1);
		this.setState({
			recepies: newRecepiesState
		});
	}

	makeChange(obj) {
		let target = this.findIndex(this.state.recepies, obj.id);
		const allRecepies = this.state.recepies;
		allRecepies[target] = obj;
		this.setState({
			recepies: allRecepies
		});
	}
	makeIngridientsChange(id, index, text) {
		console.log(text);
		const target = this.findIndex(this.state.recepies, id);
		const targetArrayState = this.state.recepies[target].recepie;
		const newArrState = targetArrayState.slice();
		newArrState[index] = text;
		const newState = this.state.recepies.slice();
		newState[target].recepie = newArrState;
		this.setState({
			recepies: newState
		});
	}

	addNewRecepie(name) {
		this.toggleCreateModal();
		const recepiesArray = this.state.recepies.slice();
		const newObj = {
			name: name,
			desc: '',
			recepie: [],
			id: this.state.lastId + 1,
			image: this.findRightImage(name)
		};
		const storageCount = this.state.storageNum + 1;
		recepiesArray.push(newObj);
		let newLastId = this.state.lastId + 1;
		this.setState({
			recepies: recepiesArray,
			lastId: newLastId,
			activeRecepie: this.state.lastId + 1,
			modalIsOpen: false,
			storageNum: storageCount
		});
	}

	addNewRecepieItem() {
		const activeRecepie = this.findIndex(this.state.recepies, this.state.activeRecepie);
		const allRecepies = this.state.recepies.slice();
		allRecepies[activeRecepie].recepie.unshift('');
		this.setState({
			recepies: allRecepies
		});
	}

	changeScreen(e) {
		const tab = Number(e.target.dataset.numb);

		this.setState({
			mobileActiveTab: tab
		});
	}

	render() {
		return (
			<div>
				<div className="head">
					<h1>Recepie App</h1>
				</div>
				<Mobile>
					<ul className="mobile-menu">
						<li
							data-numb={1}
							onClick={e => this.changeScreen(e)}
							style={
								this.state.mobileActiveTab === 1
									? { backgroundColor: '#ddce58', color: '#000' }
									: { backgroundColor: '#000', color: '#F8F2C0' }
							}
						>
							All Recepies
						</li>
						<li
							data-numb={2}
							onClick={e => this.changeScreen(e)}
							style={
								this.state.mobileActiveTab === 2
									? { backgroundColor: '#ddce58', color: '#000' }
									: { backgroundColor: '#000', color: '#F8F2C0' }
							}
						>
							Cook
						</li>
						<li
							data-numb={3}
							onClick={e => this.changeScreen(e)}
							style={
								this.state.mobileActiveTab === 3
									? { backgroundColor: '#ddce58', color: '#000' }
									: { backgroundColor: '#000', color: '#F8F2C0' }
							}
						>
							ChangeRecepie
						</li>
					</ul>
					{this.state.mobileActiveTab === 1 && (
						<div className="app">
							<div className="left one-third">
								<ShowBox
									recepies={this.state.recepies}
									addNewRecepie={this.addNewRecepie}
									checkActive={this.makeActive}
									openModal={this.openModal}
									toggleCreateModal={this.toggleCreateModal}
									activeRecepie={this.state.activeRecepie}
								/>
							</div>
						</div>
					)}
					{this.state.mobileActiveTab === 2 && (
						<div className="middle one-third">
							<div className="cook-wrapper">
								{this.state.activeRecepie && (
									<Cook
										active={
											this.state.recepies.find(recepie => recepie.id === this.state.activeRecepie)
												.recepie
										}
									/>
								)}
							</div>
						</div>
					)}
					{this.state.mobileActiveTab === 3 && (
						<div className="right one-third">
							{this.state.activeRecepie && (
								<RecipiesChange
									active={this.state.recepies.find(
										recepie => recepie.id === this.state.activeRecepie
									)}
									makeChange={this.makeChange}
									makeIngridientsChange={this.makeIngridientsChange}
									deleteRecepie={this.deleteRecepie}
									addNewRecepieItem={this.addNewRecepieItem}
								/>
							)}
						</div>
					)}
					<Modal
						hideModal={this.hideModal}
						deleteElement={this.deleteElement}
						isOpen={this.state.modalIsOpen}
					/>
					<AddRecepieModal
						isOpen={this.state.createRecModalIsOpen}
						addNew={this.addNewRecepie}
						toggle={this.toggleCreateModal}
					/>
				</Mobile>
				<Default>
					<div className="app">
						<div className="left one-third">
							<ShowBox
								recepies={this.state.recepies}
								addNewRecepie={this.addNewRecepie}
								checkActive={this.makeActive}
								openModal={this.openModal}
								toggleCreateModal={this.toggleCreateModal}
								activeRecepie={this.state.activeRecepie}
							/>
						</div>
						<div className="middle one-third">
							<div className="cook-wrapper">
								<h1>cook it!</h1>
								{this.state.activeRecepie && (
									<Cook
										active={
											this.state.recepies.find(recepie => recepie.id === this.state.activeRecepie)
												.recepie
										}
									/>
								)}
							</div>
						</div>
						<div className="right one-third">
							<h1>ChangeTheRecipie</h1>
							{this.state.activeRecepie && (
								<RecipiesChange
									active={this.state.recepies.find(
										recepie => recepie.id === this.state.activeRecepie
									)}
									makeChange={this.makeChange}
									makeIngridientsChange={this.makeIngridientsChange}
									deleteRecepie={this.deleteRecepie}
									addNewRecepieItem={this.addNewRecepieItem}
								/>
							)}
						</div>
						<Modal
							hideModal={this.hideModal}
							deleteElement={this.deleteElement}
							isOpen={this.state.modalIsOpen}
						/>
						<AddRecepieModal
							isOpen={this.state.createRecModalIsOpen}
							addNew={this.addNewRecepie}
							toggle={this.toggleCreateModal}
						/>
					</div>
				</Default>
			</div>
		);
	}
}

export default App;
