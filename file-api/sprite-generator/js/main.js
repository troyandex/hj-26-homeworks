const prop = ( data, name ) => data.map( item => item[ name ] ),
      summ = data => data.reduce(( total, value ) => total + value, 0 );
class SpriteGenerator {
  constructor( container ) {
    this.uploadButton = container.querySelector( '.sprite-generator__upload' );
    
    this.submitButton = container.querySelector( '.sprite-generator__generate' );
    this.imagesCountContainer = container.querySelector( '.images__added-count-value' );
    this.codeContainer = container.querySelector( '.sprite-generator__code' ); 
    this.imageElement = container.querySelector( '.sprite-generator__result-image' ); 
    this.images = [];
    
    this.imagesCount = 0;
    
    this.registerEvents();
  }
  
  registerEvents() {
    this.uploadButton.addEventListener('change', event => this.upload(event));
    this.submitButton.addEventListener('click', () => this.genSprite( {margin: {top: 12, right: 0, bot: 0, left: 0} } ));
  }
  
  upload( e ) {
    const files = Array.from(e.currentTarget.files).filter(
      file => /^image\//.test(file.type)
    );

    Promise.all(files.map(this.crtImage))
    .then(images => { 
      images.forEach(image => URL.revokeObjectURL(image.el.src));
      this.images = this.images.concat(images);
    })
    .catch(err => console.error(`${err}`));
  }
  
  crtImage( file ) {
    return new Promise((done, fail) => {
      const img = document.createElement('img');
      img.src = URL.createObjectURL(file);
      img.addEventListener('load', event => done({ name: file.name.replace(/\.\w*$/, ''), el: event.currentTarget, width: event.currentTarget.width, height: event.currentTarget.height }));
      img.addEventListener('error', error => fail(error.message)); 
    });
  }
  
  genSprite( {margin} ) {
    const canvas = document.createElement('canvas'),
          ctx = canvas.getContext('2d');     
    canvas.width = Math.max( ...prop(this.images, 'width') ) + margin.left;
    canvas.height = summ( prop(this.images, 'height') ) + (this.images.length - 1) * margin.top;
    
    let sumHeight = 0;
    this.images.forEach((img, n) => {
      const marginTop = n ? margin.top : 0;
      sumHeight = n ? (sumHeight += img.height + marginTop) : sumHeight;
      img.bgPos = { left: margin.left, top: sumHeight };
      
      ctx.drawImage(img.el, img.bgPos.left, img.bgPos.top, img.el.width, img.el.height);
    });
    this.codeContainer.textContent = this.genCSS();
    
    this.imageElement.src = canvas.toDataURL();
    this.imagesCountContainer.textContent = this.imagesCount = this.images.length;
  }
  
  /*genSprite( {margin} ) {
    const canvas = document.createElement('canvas'),
          ctx = canvas.getContext('2d'); 
    canvas.width = Math.max( ...this.images.map(img => img.el.width) ) + margin.left;
    canvas.height = this.images.reduce(( height, img, n ) => {
      const marginTop = n ? margin.top : 0; 
      img.bgPos = { left: margin.left, top: height + marginTop };
      return height + img.el.height + marginTop;
    }, 0);      
    
    this.images.forEach(img => ctx.drawImage(img.el, img.bgPos.left, img.bgPos.top, img.el.width, img.el.height));
    this.codeContainer.textContent = this.genCSS();
    
    this.imageElement.src = canvas.toDataURL();
    this.imagesCountContainer.textContent = this.imagesCount = this.images.length;
  }*/
  
  genCSS () {
    return this.images.reduce(( iconCls, { name, bgPos, el } ) => {
      const CSS = `.icon_${name} {\n  background-position: ${bgPos.left}px ${bgPos.top}px; \n  width: ${el.width}px; \n  height: ${el.height}px;\n}\n`;
      return iconCls + CSS;
    }, '.icon {\n  display: inline-block; \n  background-image: url(img/sprite.png);\n}\n');                    
  }
}

new SpriteGenerator( document.getElementById( 'generator' ));