'use strict';

function showComments(list) {
  const commentsContainer = document.querySelector('.comments');
  const comments = document.createDocumentFragment();
  list.forEach(comment => {
    comments.appendChild(browserJSEngine(createCommentsTemplate(comment)));
  });
  commentsContainer.appendChild(comments);
}

function createCommentsTemplate(comment) {
  return {
    tag: 'div',
    cls: 'comment-wrap',
    content: [
      {
        tag: 'div', cls: 'photo', attrs: { title: comment.author.name },
        content: [ { tag: 'div', cls: 'avatar', attrs: { style: `background-image: url('${comment.author.pic}')` } } ]
      },
      {
        tag: 'div', cls: 'comment-block',
        content: [
          {
            tag: 'p', cls: 'comment-text',
            content:  comment.text.split('\n').reduce((arr, str) => {
              arr.push({
                tag: 'p',
                content: (str) ? str : {tag: 'br'}
              });

              return arr;
            }, [])
          },
          {
            tag: 'div', cls: 'bottom-comment',
            content: [
              {
                tag: 'div', cls: 'comment-date',
                content: new Date(comment.date).toLocaleString('ru-Ru')
              },
              {
                tag: 'ul', cls: 'comment-actions',
                content: [
                  { tag: 'li', cls: 'complain', content: 'Пожаловаться' },
                  { tag: 'li', cls: 'reply', content: 'Ответить' }
                ]
              }
            ]
          }
        ]
      }
    ]
  };
}

function browserJSEngine(block) { // движок из лекции
  if (block === undefined || block === null || block === false) {
    return document.createTextNode('');
  }
  if (typeof block === 'string' || typeof block === 'number' || block === true) {
      return document.createTextNode(block);
  }
  if (Array.isArray(block)) {
    return block.reduce((f, el) => {
      f.appendChild(browserJSEngine(el));
      return f;
    }, document.createDocumentFragment())
  }
  const element = document.createElement(block.tag);

  element.classList.add(...[].concat(block.cls || []));

  if (block.attrs) {
    Object.keys(block.attrs).forEach(key => {
      element.setAttribute(key, block.attrs[key]);
    });
  }

  element.appendChild(browserJSEngine(block.content));

  return element;
}

fetch('https://neto-api.herokuapp.com/comments')
  .then(res => res.json())
  .then(showComments);
