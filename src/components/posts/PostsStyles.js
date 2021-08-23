import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  background: #fff;
  border: 2px solid grey;
  margin: 10px;
`;

export const Paragraph = styled.div`
  width: 20%;
  margin: 10px;
`;

export const StyledLink = styled(Link)`
  width: 100%;
  display: flex;
`;
