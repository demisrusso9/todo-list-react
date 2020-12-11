function ImportExport() {
   const Import = (jsonFile) => {
      const reader = new FileReader()
      const blob = new Blob([jsonFile], { type: "application/json" });

      reader.onload = () => {
         let todosList = JSON.parse(reader.result)

         localStorage.removeItem('data')
         localStorage.setItem('data', JSON.stringify(todosList))
      }
      
      window.location.reload()
      reader.readAsText(blob)
   }

   const Export = (list) => {
      return 'data:application/json,' + encodeURIComponent(JSON.stringify(list));
   }

   return { Import, Export }
}

export default ImportExport;