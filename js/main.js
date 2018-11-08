const minTransitionTime = 1;
let nextButton = document.querySelector('.next');
let scrollCounter = 0;

let scrollQueue = [];

let handleScroll = true;

document.body.addEventListener('click', (e) => {
    let button = e.target.closest('button');
    if(button && button.classList.contains('next'))
        moveSections('right');
});
document.body.addEventListener('wheel', onwheel);
document.body.addEventListener('transitionend', (e) => {
    if(e.target.tagName === 'SECTION'){
        handleScroll = true;
    }
});


function onwheel(e){
    if (handleScroll && (
        e.deltaY < 0 && moveSections('left') || 
        e.deltaY > 0 && moveSections('right'))) 
    {   
        handleScroll = false;
        // handleScroll is turned on again when 'transitionend' event is fired;
    };
    
};

function moveSections(directionClass) {
    let current = document.querySelector('.current');
    let oppositeClass = directionClass == 'right' ? 'left' : 'right';

    let nextSection = closestSection(current, directionClass);
    if (!nextSection) {
        return false;
    }
    let previousSection = closestSection(current, oppositeClass);

    let nextNextSection = closestSection(nextSection, directionClass);
    


    if(!previousSection){
        if (directionClass === 'right')
            document.body.classList.remove('landing');
    }

    if(!nextNextSection){
        if (directionClass === 'left')
            document.body.classList.add('landing');
    }

    
    switchClass(nextSection, directionClass, 'current');
    switchClass(nextNextSection, '', directionClass);
    switchClass(previousSection, oppositeClass, '');
    switchClass(current, 'current', oppositeClass);
    return true;
}

function closestSection(section, direction){
    let newSection = direction === 'right' 
        ? section.nextElementSibling
        : section.previousElementSibling;
    return newSection.tagName === 'SECTION' ? newSection : null;
}

function switchClass(section, oldClassName, className){

    if(section){
        //section.classList.replace(oldClassName, className);
        if (oldClassName)
            section.classList.remove(oldClassName);
        if (className)
            section.classList.add(className);
    }
}