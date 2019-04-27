import React, { Component } from "react";
import Select from "react-select";
import { createMuiTheme } from "@material-ui/core/styles";
import trelloData from "../utils/trelloData";
import BoardSearchResults from "../components/BoardSearchResults";

const filterCards = (boards, filter) =>
  boards.reduce((result, board) => {
    const cardsResult = board.lists.reduce((cards, list) => {
      if (
        board.closed === false &&
        list.closed === false &&
        (filter.length === 0 ||
          list.name.toLowerCase() === filter.toLowerCase())
      ) {
        return cards.concat(list.cards.filter(card => card.closed === false));
      }
      return cards;
    }, []);

    if (cardsResult.length > 0) {
      result.push({ board: board, cards: cardsResult });
    }
    return result;
  }, []);

const getListOptions = boards =>
  boards
    .reduce((result, board) => {
      const listNames = board.lists
        .map(list => list.name)
        .filter(name => result.includes(name) === false);
      return result.concat(listNames);
    }, [])
    .sort()
    .map(name => {
      return { value: name, label: name };
    });

const theme = createMuiTheme();

const styles = {
  control: base => ({
    ...base,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.fontSize
  }),
  menu: base => ({
    ...base,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.fontSize
  })
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: [],
      filter: null
    };

    this.handleChange = this.handleChange.bind(this);
  }

  async componentWillMount() {
    const boards = await trelloData.getDashboardData();
    this.setState({ boards: boards });
  }

  handleChange(selectedOption) {
    this.setState({ filter: selectedOption });
  }

  render() {
    const { boards, filter } = this.state;
    const listOptions = getListOptions(boards);
    const filteredCards = filterCards(boards, filter ? filter.value : "");

    return (
      <React.Fragment>
        <Select
          styles={styles}
          value={filter}
          onChange={this.handleChange}
          options={listOptions}
          placeholder={"Choose a list name to filter..."}
        />
        <BoardSearchResults rowData={filteredCards} />
      </React.Fragment>
    );
  }
}

export default Dashboard;
