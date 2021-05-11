window.onload = function(){
	let buttons = document.querySelectorAll('.left-button'),
	 	push = document.querySelectorAll('.push-1'),
	 	arrows = document.querySelectorAll('.arrow'),
		i = 0,
		rot = ['rotate(-50deg)','rotate(-60deg)','rotate(50deg)'];

	let anim = () => new Promise( resolve => {
			buttons[i].classList.remove('btn-active');
			resolve();
		}).then(() =>{
			return new Promise( resolve => {
				arrows[i].animate([	{opacity: 0.2,transform: 'rotate(0deg)'},
									{opacity: 1, offset: 0.3},
									{opacity: 0, transform: rot[i]}],
									1000);
    			resolve(animEnd(arrows[i]));
  			});
		}).then(() =>{
			return new Promise( resolve => { 
				push[i].animate([	{opacity: 0},
									{opacity: 1, top: '35%', offset: 0.2},
									{opacity: 1, offset: 0.8},
									{opacity: 0, top: '35%'}],
									1500);
    			resolve(animEnd(push[i]));
  			});
		}).then(() =>{
			return new Promise( resolve => {
    			if(i === 2){i = -1}
				buttons[i+1].classList.add('btn-active');
				i++;
  			});
		});
		
	let animEnd = (elem) => Promise.all(
		elem.getAnimations().map(
			animation => {
				return animation.finished;
			}
		)
		).then(() => {
			return new Promise((resolve) => { 
				resolve();
			});
		});

	buttons.forEach((button) =>{
		button.addEventListener("click", anim);
	});
}
