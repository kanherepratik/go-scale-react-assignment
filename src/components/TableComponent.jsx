import React, { Component } from "react";
import Axios from "axios";
import MaterialTable from "material-table";
import ModalComponent from "./ModalComponent";

class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      pageCount: 0,
      isModalOpen: false,
    };
  }

  componentDidMount(prevProps, prevState) {
    this.periodicAPIRequest();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }

  periodicAPIRequest() {
    this.timer = setInterval(() => this.getNewPost(), 10000);
  }

  getNewPost() {
    const { pageCount } = this.state;
    Axios.get(
      `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageCount}`
    )
      .then((res) => {
        const { posts: oldPosts } = this.state;
        const combinedPosts = [...oldPosts, ...res.data.hits];
        this.setState({ posts: combinedPosts, pageCount: res.data.page + 1 });
      })
      .catch((err) => {
        const { intervalId } = this.state;
        console.error(err);
        clearInterval(intervalId);
      });
  }

  handleClose = () => {
    this.setState({ isModalOpen: false });
  };

  addRowData = (e, data) => {
    this.setState({ rowData: data }, () => {
      this.setState({ isModalOpen: true });
    });
  };

  render() {
    const { posts, isModalOpen, rowData } = this.state;

    return (
      <div style={{ maxWidth: "100%" }}>
        <MaterialTable
          title="Basic React Table"
          isLoading={!posts.length > 0}
          columns={[
            { title: "Title", field: "title" },
            { title: "URL", field: "url", filtering: false },
            {
              title: "created_at",
              field: "created_at",
              type: "date",
              searchable: false,
            },
            {
              title: "Author",
              field: "author",
              filtering: false,
            },
          ]}
          data={posts}
          options={{
            filtering: true,
            search: true,
          }}
          onRowClick={(event, rowData) => this.addRowData(event, rowData)}
        />
        <ModalComponent
          rowData={rowData}
          isModalOpen={isModalOpen}
          handleClose={this.handleClose}
        />
      </div>
    );
  }
}

export default TableComponent;
