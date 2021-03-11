chartEvents={[
    {
      eventName: 'select',
      callback: ({ chartWrapper }) => {
        const chart = chartWrapper.getChart()
        const selection = chart.getSelection()
        console.log(chart)
        if (selection.length === 1) {
          const [selectedItem] = selection
          const dataTable = chartWrapper.getDataTable()
          const { row, column } = selectedItem
          alert(
            'You selected : ' +
              JSON.stringify({
                row,
                column,
                value: dataTable.getValue(row, 0),
              }),
            null,
            2,
          )
        }
        console.log(selection)
      },
    },
  ]}