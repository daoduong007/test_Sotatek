//sort array of oobject  
export const Sort = (arrayOfObject: any[], oderProp: string | number, option: any) => {
  switch(option) {
    case 'increase': return (arrayOfObject.sort((a,b) => (a[oderProp] > b[oderProp]) ? 1: (a[oderProp] < b[oderProp]) ? -1 : 0)) 
    case 'decrease': return (arrayOfObject.sort((a,b) => (a[oderProp] < b[oderProp]) ? 1: (a[oderProp] > b[oderProp]) ? -1 : 0)) 
    default: return arrayOfObject;
  }
}

//search
export const Search = (arrayOfObject : any[], value: string) => {
  if( value === '' ) {return arrayOfObject}

  let arrayFill = [];

  arrayFill = arrayOfObject.filter((object: any) => object.task.search(value) !== -1 );

  return arrayFill;
}