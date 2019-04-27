import errorHandler from "./errorHandler";

const trelloData = {
  getBoards() {
    return new Promise((resolve, reject) => {
      Trello.get(
        "/members/me/boards/",
        boards => resolve(boards),
        error => reject(new Error(`Getting boards failed: ${error}`))
      );
    });
  },
  getLists(boardId, includeCards = false) {
    let url = `/boards/${boardId}/lists`;
    if (includeCards) url = url + "/?cards=all";

    return new Promise((resolve, reject) => {
      Trello.get(
        url,
        lists => resolve(lists),
        error => reject(new Error(`Getting lists failed: ${error}`))
      );
    });
  },
  getCards(listId) {
    return new Promise((resolve, reject) => {
      Trello.get(
        `/lists/${listId}/cards`,
        cards => resolve(cards),
        error => reject(new Error(`Getting cards failed: ${error}`))
      );
    });
  },
  async getDashboardData() {
    try {
      let boards = await trelloData.getBoards();

      boards = await Promise.all(
        boards.map(async board => {
          const lists = await trelloData.getLists(board.id, true);
          board.lists = lists;
          return board;
        })
      );
      return boards;
    } catch (error) {
      errorHandler.log(error);
      return [];
    }
  }
};

export default trelloData;
