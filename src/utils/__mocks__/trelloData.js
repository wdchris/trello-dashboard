const trelloData = {
  async getDashboardData() {
    return [
      {
        id: "1",
        name: "board test",
        closed: false,
        lists: [
          {
            id: "1",
            name: "list test",
            closed: false,
            cards: [{ id: "1", name: "card test", closed: false }]
          },
          {
            id: "2",
            name: "list test 2",
            closed: false,
            cards: [{ id: "2", name: "card test 2", closed: false }]
          }
        ]
      },
      {
        id: "2",
        name: "board test 2",
        closed: false,
        lists: [
          {
            id: "4",
            name: "list test 3",
            closed: false,
            cards: [{ id: "3", name: "card test 3", closed: true }]
          }
        ]
      },
      {
        id: "3",
        name: "board test 3",
        closed: false,
        lists: [
          {
            id: "5",
            name: "list test",
            closed: false,
            cards: [
              { id: "4", name: "card test 4", closed: false },
              { id: "5", name: "card test 5", closed: false }
            ]
          },
          {
            id: "6",
            name: "list test 3",
            closed: false,
            cards: [{ id: "6", name: "card test 6", closed: false }]
          }
        ]
      }
    ];
  }
};

export default trelloData;
