'use struct';

const tabsContent = document.querySelector('.tabs-content');
const articles = tabsContent.children;
const tabsNav = document.querySelector('.tabs-nav');

Array.from(articles).forEach(article => {
    const tab = tabsNav.firstElementChild.cloneNode(true);
    tabsNav.appendChild(tab);
    const newTab = tabsNav.lastElementChild;

    newTab.firstElementChild.classList.add(article.dataset.tabIcon);
    newTab.firstElementChild.textContent = article.dataset.tabTitle;
});
tabsNav.removeChild(tabsNav.firstElementChild);

Array.from(tabsNav.children).forEach(tab => tab.addEventListener('click', showArticle));
showArticle.call(tabsNav.firstElementChild);

function showArticle(event) {
    const tab = event ? event.currentTarget : this;

    if ( tabsNav.querySelector('.ui-tabs-active') ) {
        tabsNav.querySelector('.ui-tabs-active').classList.remove('ui-tabs-active');
    }
    tab.classList.add('ui-tabs-active');

    Array.from(articles).forEach(article => {
        if (article.dataset.tabTitle === tab.firstElementChild.textContent) {
            article.classList.remove('hidden');
        } else {
            article.classList.add('hidden');
        }
    });
}