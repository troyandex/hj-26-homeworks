const addClass = ( className, context ) => context.classList.add( className ),
  removeClass = ( className, context ) => context.classList.remove( className ),
  hasClass = ( className, context ) => context.classList.contains( className );
class iLayout {
  constructor( container ) {
    this.container = container;
    this.positionsContainer = container.querySelector( '.layout__positions' );
    this.actionButton = container.querySelector( '.layout__button' );
    this.result = container.querySelector( '.layout__result' );
    this.layout = {
      left: null,
      top: null,
      bottom: null
    };
    this.registerEvents();
  }
  
  registerEvents() {
    this.positionsContainer.addEventListener('dragover', event => this.showOutline(event));
    this.positionsContainer.addEventListener('dragleave', event => this.hideOutline(event));
    this.positionsContainer.addEventListener('drop', event => this.upload(event));
    this.actionButton.addEventListener('click', () => this.crtСollage());
  }
  
  isOnLayout( e ) {
    if (e.target.classList.contains('layout__item') || e.target.parentElement.classList.contains('layout__item')) {
      return e.target.classList.contains('layout__item') ? e.target : e.target.parentElement;
    }
    return null;
  }
   
  showOutline( e ) {
    e.preventDefault();
    if ( this.isOnLayout(e) ) {
      const layout = this.isOnLayout(e);
      layout.classList.add('layout__item_active');
      layout.textContent = 'Переместите файл';
    } 
  }
  
  hideOutline( e ) {
    if ( this.isOnLayout(e) && (e.type === 'dragleave') && ((e.relatedTarget === this.container) || (e.relatedTarget !== e.target)) ) { 
      const layout = this.isOnLayout(e);  
      layout.classList.remove('layout__item_active');
      layout.textContent = '';
    }
  }
  
  upload( e ) {
    e.preventDefault();
    if ( this.isOnLayout(e) ) {
      const [file] = Array.from(e.dataTransfer.files),
            layout = this.isOnLayout(e);

      if (/^image\/*/.test(file.type)) {
        this.crtImage(file)
        .then(img => {
          const pos = Object.keys(this.layout).find(pos => layout.classList.contains(`layout__item_${pos}`));
          this.layout[pos] = img;

          URL.revokeObjectURL(img.src);
          return { layout: layout, img: img };
        })
        .then(this.drawImg)
        .catch(err => console.error(`${err}`));
        layout.classList.remove('layout__item_active');
      } else {
        layout.classList.add('layout__item_active');
        layout.textContent = 'Формат данного файла не поддерживается';
      }
    }
  } 
  
  crtImage( file ) {
    return new Promise((done, fail) => {
      const img = document.createElement('img');
      img.src = URL.createObjectURL(file);
      img.addEventListener('load', event => done(event.currentTarget));
      img.addEventListener('error', error => fail(error.message)); 
    });
  }

  drawImg( {layout, img} ) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = layout.offsetWidth;
    canvas.height = layout.offsetHeight;
    
    const sWidth = img.width > canvas.width ? canvas.width : img.width, 
          sHeight = img.height > canvas.height ? canvas.height : img.height;
    
    ctx.drawImage(img, 0, 0, sWidth, sHeight, 0, 0, canvas.width, canvas.height);
    img.src = canvas.toDataURL();
    
    if (layout.hasChildNodes()) { layout.removeChild(layout.lastChild); }
    layout.appendChild(img);
  }

  crtСollage() {
    const canvas = document.createElement('canvas'),
          ctx = canvas.getContext('2d');
    canvas.width = this.positionsContainer.offsetWidth;
    canvas.height = this.positionsContainer.offsetHeight;
    
    const collage = document.createElement('img');
    Object.keys(this.layout).forEach( key => {
      const img = this.layout[key],
            imgContainer = this.positionsContainer.querySelector(`.layout__item_${key}`),
            sWidth = img.width > imgContainer.offsetWidth ? imgContainer.offsetWidth : img.width, 
            sHeight = img.height > imgContainer.offsetHeight ? imgContainer.offsetHeight : img.height,
            [dx, dy] = key === 'left' ? [0, 0] : 
                       key === 'top' ? [this.layout.left.width , 0] : [this.layout.left.width, this.layout.top.height];

      ctx.drawImage( img, 0, 0, sWidth, sHeight, dx, dy, canvas.width, canvas.height );
    });
    
    collage.src = canvas.toDataURL('image/jpeg', 0.8);
    this.result.value = collage.outerHTML;
  }
}

new iLayout( document.getElementById( 'layout' ));