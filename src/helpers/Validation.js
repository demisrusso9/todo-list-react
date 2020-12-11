function Validation() {

   const isFieldEmpty = (value) => !value.trim() ?
      (alert('Empty field'), true) : '';

   const existsInList = (value, list) => list.some(item =>
      item.description.toLowerCase() === value.toLowerCase() ?
         (alert('Item already in the list!'), true) : '');

   const nothingToDelete = (list) => !list.length ?
      (alert('No items to delete'), true) : '';

   const existsTodosToDelete = (setList) => {
      if (window.confirm('Are you sure you want to delete all items?')) {
         setList([]);
         localStorage.removeItem('data');
      }
   }

   return { isFieldEmpty, existsInList, nothingToDelete, existsTodosToDelete }
}

export default Validation;