import VueScrollTo from 'vue-scrollto';
const mainOptions = { container: 'body', easing: 'ease-in', offset: -150, cancelable: false, x: false, y: true};
export const scrollToForm = function (data){
  if(data)
    data.$vuetify.goTo('form', { "duration": 750, "offset": -150, "easing": "easeInQuad" })
  else 
    VueScrollTo.scrollTo('form', 750 , mainOptions);
};
export const scrollToElement = function (data, element, container){
  
  if(data){
    let options = { "duration": 750, "offset": -150, "easing": "easeInQuad" };
    if(container)
      options.container = container;

    console.log(element);
    console.log(options);
      VueScrollTo.scrollTo(element, 740, options);
  }
  else {
    VueScrollTo.scrollTo(element , 750 , mainOptions);
  }
};
