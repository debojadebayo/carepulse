//Data table component to go below stat card
//import shadcn Data Table
//change the rows use header ID and row to render a p element with the patient starting from 1 (row.index +1). p tag should be text-14-medium 
// remeber the p element would need the patient as the accessorKey 
// render the status using accessor key status
// you should render a div with min width of 115px and a status badge with the status as the child. The status badge should be a component

//columns return a dateTime column with accessorKey schedule and a header of Date & Time. Remeber to import formatDateTime from lib/utils 
//render a column with a doctor, accessorKey priomaryPhysician. Find the doc where
//return a div with the doctor image and the doctor name
// Actions with accessorKey actions and header Actions- the actions should be a schedule vs cancel 
// The actions should render an appointment modal


import React from 'react'

const DataTable = () => {
  return (
    <div>
        DataTable
    </div>
  

)
}

export default DataTable
