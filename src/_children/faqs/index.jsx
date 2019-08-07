import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";
import classnames from "classnames";

import * as S from "./styled";
import faqsData from "./data";

const Faqs = ({ url, perPage }) => {
  const [data, setData] = React.useState({ meta: { limit: 10 }, faqs: [] });
  const [pageCount, setPageCount] = React.useState();
  const [offset, setOffset] = React.useState(0);

  React.useLayoutEffect(() => {
    loadFakeQuestions();
  });

  const loadQuestionsFromServer = () => {
    fetch(url, {
      method: "POST",
      body: { limit: perPage, offset },
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(data => {
        setData(data);
        setPageCount(Math.ceil(data.faqs.length / data.meta.limit));
      })
      .catch(err => {
        console.error(url, err.toString()); // eslint-disable-line
      });
  };

  const loadFakeQuestions = () => {
    return Promise.resolve(faqsData)
      .then(data => {
        setData(data);
        setPageCount(Math.ceil(data.faqs.length / data.meta.limit));
      })
      .catch(err => {
        console.error(url, err.toString()); // eslint-disable-line
      });
  };

  const handlePageClick = data => {
    let selected = data.selected;
    let offset = Math.ceil(selected * perPage);

    setOffset(offset);
  };

  return (
    <S.Container>
      <S.TitleContainer>
        <S.Title>Preguntas Frecuentes</S.Title>
      </S.TitleContainer>
      <FaqList faqs={data.faqs} />
      <StyledPagination
        previousLabel={"previous"}
        nextLabel={"next"}
        nextClassName={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </S.Container>
  );
};
Faqs.propTypes = {
  url: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  perPage: PropTypes.number.isRequired
};

const StyledPagination = styled(ReactPaginate).attrs(props => ({
  containerClassName: props.className
}))`
  padding: 5px;
  background-color: blue;
`;

const FaqList = ({ faqs = [], children, ...restProps }) => {
  let commentNodes = faqs.map((faq, idx) => {
    return (
      <div key={idx}>
        <b>{faq.q}</b>
        <br />
        <p>{faq.a}</p>
        <S.Separator />
      </div>
    );
  });

  return (
    <S.FaqsContainer {...restProps}>
      <S.Ul>{commentNodes}</S.Ul>
      {children}
    </S.FaqsContainer>
  );
};
FaqList.propTypes = {
  faqs: PropTypes.arrayOf(
    PropTypes.shape({
      q: PropTypes.string.isRequired,
      a: PropTypes.string.isRequired
    })
  )
};

export default Faqs;
