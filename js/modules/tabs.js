function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    // Tabs
    const tabParent = document.querySelector(tabsParentSelector),
        tabContent = document.querySelectorAll(tabsContentSelector),
        tabs = document.querySelectorAll(tabsSelector);

    function hideContent() {
        tabContent.forEach(item => {
            item.classList.remove('show');
            item.classList.add('hide');
        });  

        tabs.forEach (item => {
            item.classList.remove(activeClass);
        });     
    }

    function showContent(i=0) {
        tabContent[i].classList.remove('hide');
        tabContent[i].classList.add('show');
        
        tabs[i].classList.add(activeClass);
    } 
    
    hideContent();    
    showContent();
    
    tabParent.addEventListener('click', (event)=> {
        const target = event.target;

        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach ((tab, i) => {
                if (target == tab) {
                    hideContent();    
                    showContent(i);
                }
            });
        }
    });
}

export default tabs;