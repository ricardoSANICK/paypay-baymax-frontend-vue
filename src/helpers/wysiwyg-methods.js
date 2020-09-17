import * as imagesMethods from '@/helpers/images-methods';
import Chance from 'chance';

const getOriginalSize = base64Data=>new Promise((resolve,reject)=>{
  try{    
    const temporalImage = document.createElement('img');
    temporalImage.src = base64Data;
    //Gettin original size from image html element after it is loaded
    temporalImage.onload=function(){
      resolve({original:{width:this.width, height:this.height}})
    }
  }catch(error){
    reject(error);
  }
});

const resizeModifiedImages = imageList =>new Promise((resolve,reject)=>{
  const allImagePromises=[];
  
  let cleanImageList = [];
  imageList.forEach(image=>{
    if(image.getAttribute('id') !== 'imagenProcesada'){
      if(image.getAttribute('imagenprocesada') == null || image.getAttribute('imagenprocesada') == undefined){
        cleanImageList.push(image);
      }
    }
  });

  cleanImageList.forEach(image=>{
    //Add a promise for each Image HTMLElement
    allImagePromises.push(new Promise((resolveIt,rejectIt)=>{
      const imagePromises = [];
      //Keeping the original reference
      imagePromises.push(Promise.resolve({img:image}));
      //Get the original Size
      imagePromises.push(getOriginalSize(image.src));
      //Get the modified Size
      imagePromises.push(Promise.resolve({modified:{width:image.width, height:image.height}}));
      //Resolving all promises by each image element        
      Promise.all(imagePromises)
      .then(result=>{
        //Destructing all promises results [image instance, originalSize, modifiedSize]
        let [{img},{original},{modified}] = result;
        //Validate if the width has been modified
        if(modified.width!=0){
          //Calculating the new height keeping aspect ratio
          const height = Math.ceil((modified.width*original.height)/original.width)*1.20;
          modified.width = modified.width*1.20;
          //Resize the image
          imagesMethods.resizeBase64Image( img.src , modified.width , height )
          .then(result=>{
            //Setting the new src and resolving the promises for this image node element
            img.src = result;
            resolveIt();
          })
          .catch(resolveIt)
        }else{
          //Resolving the promises for this image node element for unmodified size images
          resolveIt();
        }
      })
      .catch(rejectIt)
    }))
  });
  //Catching all promises of each image element
  Promise.all(allImagePromises)
  .then(result=>{
    resolve(cleanImageList)
  })
  .catch(console.error)

})

export const replaceImageSourceById = async (content)=>{
  try{
    //Transforming string into HTMLElement 
    const doc = new DOMParser().parseFromString(content,'text/html');
    //Getting all images within the wysiwyg content
    const imageElements=doc.querySelectorAll('img');
    const response = await resizeModifiedImages(imageElements);
    const chance = new Chance();
    const arrayDataImages = [];
    response.forEach(image=>{
      //Generates the Identifier for the image iterated
      image.id = chance.word({length:15}); 
      const temporalSource = image.src;
      image.src=image.id;
      arrayDataImages.push({id:image.id,base64:temporalSource})
    });
    return {content:doc.body.innerHTML, images:arrayDataImages}
  }catch(error){
    throw error;
  }

}


