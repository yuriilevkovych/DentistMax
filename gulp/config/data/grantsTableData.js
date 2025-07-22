const grantsTableData = (function () {
  const sizes = [60, 80, 150, 80, 'grow', 200, 'actions', 'actions'];
  const headData = [
    {
      type: 'checkbox',
      size: sizes[0],
      ops: {
        id: 'grants-checkbox',
      },
    },
    {
      text: 'Ziffer',
      size: sizes[1],
    },
    {
      text: 'Kurzel',
      size: sizes[2],
    },
    {
      text: 'ANZ',
      size: sizes[3],
    },
    {
      text: 'Text',
      size: sizes[4],
      align: 'left',
    },
    {
      text: 'Ordnun',
      size: sizes[5],
    },
    {
      type: 'action',
    },
    {
      type: 'action',
    },
  ];
  const actionsData = [
    {
      type: 'checkbox',
      size: sizes[0],
      ops: {
        id: 'grants-checkbox',
      },
    },
    {
      type: 'input',
      size: sizes[1],
      ops: {
        id: 'grants-ziffer-input',
      },
    },
    {
      type: 'input',
      size: sizes[2],
      ops: {
        id: 'grants-kurzel-input',
      },
    },
    {
      type: 'input',
      size: sizes[3],
      ops: {
        id: 'grants-anz-input',
      },
    },
    {
      type: 'input',
      size: sizes[4],
      ops: {
        id: 'grants-text-input',
      },
    },
    {
      type: 'input',
      size: sizes[5],
      ops: {
        id: 'grants-ordnum-input',
      },
    },
    {
      type: 'action',
    },
    {
      type: 'add',
      swap: 'edit/done, remove',
    },
  ];
  const mockBody = [];
  const suffixes = ['', '/d', '/h', '/v'];

  for (let i = 1; i <= 1; i++) {
    for (let j = 1; j <= 9; j++) {
      suffixes.forEach((suffix) => {
        mockBody.push([
          {
            type: 'checkbox',
            ops: { id: 'grants-checkbox' },
            size: sizes[0],
          },
          { text: `${i}.${j}${suffix}`, size: sizes[1] },
          { text: 'empty', size: sizes[2] },
          { text: 'empty', size: sizes[3] },
          { text: 'test text test text', align: 'left', size: sizes[4] },
          { text: 'FZ', align: 'left', size: sizes[5] },
          {
            type: 'edit/done',
          },
          {
            type: 'delete',
          },
        ]);
      });
    }
  }

  return {
    head: { cols: headData },
    body: { rows: mockBody },
    action: { cols: actionsData },
  };
})();

export { grantsTableData };
