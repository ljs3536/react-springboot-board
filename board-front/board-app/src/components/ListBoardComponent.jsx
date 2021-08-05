import React, { Component } from 'react';
import BoardService from '../service/BoardService';
import Pagination from "@material-ui/lab/Pagination";

class ListBoardComponent extends Component {
    constructor(props) {
        super(props)

        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveBoards = this.retrieveBoards.bind(this);
        // this.refreshList = this.refreshList.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
        
        this.state = { 
            boards: [],
            currentBoard: null,
            currentIndex: -1,
            searchTitle: "",

            page: 1,
            count: 0,
            pageSize: 3,
        };
		this.pageSizes=[3, 6, 9];

		this.createBoard = this.createBoard.bind(this);
    }

    componentDidMount() {
        this.retrieveBoards();
    }
    
    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;
    
        this.setState({
          searchTitle: searchTitle,
        });
    }

    getRequestParams(searchTitle, page, pageSize) {
        let params = {};
    
        if (searchTitle) {
          params["title"] = searchTitle;
        }
    
        if (page) {
          params["page"] = page - 1;
        }
    
        if (pageSize) {
          params["size"] = pageSize;
        }
    
        return params;
    }
    
    retrieveBoards() {
    const { searchTitle, page, pageSize } = this.state;
    const params = this.getRequestParams(searchTitle, page, pageSize);
        BoardService.getBoards(params).then((res) => {
            const {content, totalPages } = res.data;
            this.setState({ 
                boards: content,
                count : totalPages,
            });

        });
    }

    handlePageChange(event, value) {
        this.setState(
          {
            page: value,
          },
          () => {
            this.retrieveBoards();
          }
        );
    }
    
    handlePageSizeChange(event) {
        this.setState(
            {
            pageSize: event.target.value,
            page: 1
            },
            () => {
            this.retrieveBoards();
            }
        );
    }
	createBoard() {
        this.props.history.push('/create-board/_create');
    }
	
	readBoard(no) {
        this.props.history.push(`/read-board/${no}`);
    }

    render() {
        const {
            searchTitle,
            page,
            count,
            pageSize,
          } = this.state;
        return (
            <div>
                <h2 className="text-center">Boards List</h2>
                <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by title"
                    value={searchTitle}
                    onChange={this.onChangeSearchTitle}
                />
                </div>
                <div className="input-group-append">
                <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={this.retrieveTutorials}
                >
                Search
                </button>
                </div>
                <div className="col-md-6">

                    <div className="mt-3">
                        {"Items per Page: "}
                        <select onChange={this.handlePageSizeChange} value={pageSize}>
                        {this.pageSizes.map((size) => (
                            <option key={size} value={size}>
                            {size}
                            </option>
                        ))}
                        </select>

                        <Pagination
                        className="my-3"
                        count={count}
                        page={page}
                        siblingCount={1}
                        boundaryCount={1}
                        variant="outlined"
                        shape="rounded"
                        onChange={this.handlePageChange}
                        />
                    </div>
                </div>
				<div className = "row">
                    <button className="btn btn-primary" onClick={this.createBoard}> 글 작성</button>
                </div>
                <div className ="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>글 번호</th>
                                <th>타이틀 </th>
                                <th>작성자 </th>
                                <th>작성일 </th>
                                <th>갱신일 </th>
                                <th>좋아요수</th>
                                <th>조회수</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.boards.map(
                                    board => 
                                    <tr key = {board.no}>
                                        <td> {board.no} </td>
                                        <td> <a onClick = {() => this.readBoard(board.no)}>{board.title} </a></td>
                                        <td> {board.memberNo} </td>
                                        <td> {board.createdTime} </td>
                                        <td> {board.updatedTime} </td>
                                        <td> {board.likes} </td>
                                        <td> {board.counts} </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListBoardComponent;